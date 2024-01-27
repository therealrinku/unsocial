type MessageViewTypes = { message: string };

const MessageView = ({ message }: MessageViewTypes) => {
  return (
    <div className="fixed bottom-5 left-5 bg-green-500 z-50 text-white text-sm py-2 px-10">
      <p>{message}</p>
    </div>
  );
};

export default MessageView;
