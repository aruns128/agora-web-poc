import React, { useState } from "react";
import "./HomePage.scss";
import { useAgora } from "../../utils/AgoraConfig";

import AgoraRTC from "agora-rtc-sdk-ng";
import { CallPage } from "../CallPage/CallPage";
import Alert from "../UI/Alert/Alert";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });

export const HomePage = () => {
  const [appid, setAppid] = useState("");
  const [token, setToken] = useState("");
  const [channel, setChannel] = useState("");
  const [messageAlert, setMessageAlert] = useState(null);
  const [isLoggedIn, setCallStarted] = useState(true);
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
  } = useAgora(client);

  const joinMeeting = (e, appid, channel, token) => {
    e.preventDefault();
    if (appid !== "" && channel !== "" && token !== "") {
      join(appid, channel, token)
        .then((response) => {
          let error = messageAlert;
          let updateError = {
            ...error,
            msg: "Welcome",
            error: false,
            errorColor: "green",
          };
          setCallStarted(false);
          setMessageAlert(updateError);
          setTimeout(() => {
            setMessageAlert(null);
          }, 1000);
        })
        .catch((e) => {
          let error = messageAlert;
          let updateError = {
            ...error,
            msg: "Please check the Credentials",
            error: true,
            errorColor: "red",
          };
          setCallStarted(true);
          setMessageAlert(updateError);
          setTimeout(() => {
            setMessageAlert(null);
          }, 1000);
        });
    } else {
      let error = messageAlert;
      let updateError = {
        ...error,
        msg: "Please fill the all fields",
        error: true,
        errorColor: "orange",
      };
      setMessageAlert(updateError);
      setTimeout(() => {
        setMessageAlert(null);
      }, 1000);
    }
  };
  console.log(remoteUsers, "remoteUsers");
  return (
    <>
      <div className="home-page-container">
        {isLoggedIn ? (
          <div className="home-page">
            <form className="content">
              <h1>POC</h1>
              <input
                type="text"
                name="appid"
                placeholder="App ID"
                onChange={(event) => {
                  setAppid(event.target.value);
                }}
              />
              <input
                type="text"
                name="token"
                placeholder="Token"
                onChange={(event) => {
                  setToken(event.target.value);
                }}
              />

              <input
                type="text"
                name="channel"
                placeholder="Channel"
                onChange={(event) => {
                  setChannel(event.target.value);
                }}
              />
              <div className="button-group">
                <button
                  id="join"
                  type="button"
                  className="join-button"
                  onClick={(e) => {
                    joinMeeting(e, appid, channel, token);
                  }}
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div>
              <p>{joinState && localVideoTrack ? `You(${client.uid})` : ""}</p>
              <CallPage
                videoTrack={localVideoTrack}
                audioTrack={localAudioTrack}
                leave={leave}
              ></CallPage>
            </div>
            {remoteUsers.map((user) => (
              <div key={user.uid}>
                <p>{`Remote User(${user.uid})`}</p>
                <CallPage
                  videoTrack={user.videoTrack}
                  audioTrack={user.audioTrack}
                  leave={leave}
                ></CallPage>
              </div>
            ))}
          </>
        )}
        {messageAlert && <Alert messageAlert={messageAlert} />}
      </div>
    </>
  );
};
