import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Chat = ({ connection, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { text: message, sender: "You" }]);
    setMessage("");
  };

  return (
    <div className="fixed bottom-20 right-5 bg-lime-900 text-white px-4 py-2 w-80 min-h-8 rounded-lg shadow-xl shadow-black">
      <div className="flex justify-between items-center border-b pb-1 mb-2">
        <h2 className="text-lg font-bold">{connection.firstName}</h2>
        <FaTimes className="cursor-pointer" onClick={onClose} />
      </div>
      <div className="min-h-40 overflow-y-auto overflow-x-auto p-2 bg-white rounded">
        {messages.length === 0 ? (
          <p className="text-gray-400">Start a conversation...</p>
        ) : (
          messages.map((msg, index) => (
            <p key={index} className="p-1 my-1 rounded bg-blue-600 w-fit">
              <strong>{msg.sender}: </strong> {msg.text}
            </p>
          ))
        )}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 pl-2 p-1 text-black rounded-l "
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-3 py-1 rounded-r "
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
