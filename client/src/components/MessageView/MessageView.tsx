import styles from "./MessageView.module.scss";

type MessageViewTypes = { message: string };

const MessageView = ({ message }: MessageViewTypes) => {
  return (
    <div className={styles.MessageView}>
      <p>{message}</p>
    </div>
  );
};

export default MessageView;
