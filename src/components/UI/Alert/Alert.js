import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Alert.scss";

const Alert = ({ messageAlert }) => {
  return (
    <div className="message-alert-popup">
      <div className="alert-header">
        <FontAwesomeIcon
          className="icon"
          style={{
            color: messageAlert.error
              ? messageAlert.errorColor
              : messageAlert.errorColor,
          }}
          icon={messageAlert.error ? faExclamationCircle : faCheck}
        />
        <p
          className="alert-msg"
          style={{
            color: messageAlert.error
              ? messageAlert.errorColor
              : messageAlert.errorColor,
          }}
        >
          {messageAlert.msg}
        </p>
      </div>
    </div>
  );
};

export default Alert;
