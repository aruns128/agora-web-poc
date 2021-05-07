import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faMicrophone,
  faPhone,
  faMicrophoneSlash,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./CallPage.scss";

export const CallPage = (props) => {
  const container = useRef(null);
  const [isMute, setMute] = useState(false);
  const [isVideoOn, setisVideoOn] = useState(true);

  useEffect(() => {
    if (!container.current) return;
    props.videoTrack?.play(container.current);
    return () => {
      props.videoTrack?.stop();
      setisVideoOn(true);
    };
  }, [container, props.videoTrack]);
  useEffect(() => {
    props.audioTrack?.play();
    return () => {
      props.audioTrack?.stop();
      setMute(false);
    };
  }, [props.audioTrack]);

  const unmuteAudio = () => {
    props.audioTrack?.play();
    setMute(false);
  };
  const muteAudio = () => {
    props.audioTrack?.stop();
    setMute(true);
  };

  const stopVideo = () => {
    props.videoTrack?.stop();
    setisVideoOn(false);
  };
  const startVideo = () => {
    props.videoTrack?.play(container.current);
    setisVideoOn(true);
  };

  const leaveFromCall = () => {
    props.leave();
    window.location.reload();
  };
  return (
    <>
      <div
        ref={container}
        className="video-player"
        style={{ width: "320px", height: "240px" }}
      >
        <div className="footer-item">
          <div className="center-item">
            {isMute ? (
              <div className={`icon-block red-bg`} onClick={unmuteAudio}>
                <FontAwesomeIcon className="icon" icon={faMicrophoneSlash} />
              </div>
            ) : (
              <div className={`icon-block `} onClick={muteAudio}>
                <FontAwesomeIcon className="icon" icon={faMicrophone} />
              </div>
            )}

            <div className="icon-block" onClick={leaveFromCall}>
              <FontAwesomeIcon className="icon red" icon={faPhone} />
            </div>

            {isVideoOn ? (
              <div className={`icon-block`} onClick={stopVideo}>
                <FontAwesomeIcon className="icon" icon={faVideo} />
              </div>
            ) : (
              <div className={`icon-block red-bg`} onClick={startVideo}>
                <FontAwesomeIcon className="icon" icon={faVideoSlash} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
