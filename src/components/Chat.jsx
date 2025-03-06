import { useState, useEffect } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../utils/socket";

const Chat = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const connection = location.state?.connection;

  const receiverId = connection ? connection._id : params.connectionId;
  const name = connection
    ? `${connection.firstName} ${connection.lastName}`
    : "Unknown User";

  const user = useSelector((store) => store.user);
  const senderId = user?._id;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();  // Prevent the default "Enter" key behavior (like form submission)
      handleSendMessage(); // Call send message function
    }};

  useEffect(() => {
    const fetchMessages = () => {
      if (senderId && receiverId) {
        socket.emit("fetchMessages", { senderId, receiverId });
      }
    };

    fetchMessages();

    socket.on("loadMessages", (fetchedMessages) => {
      if (fetchedMessages) {
        setMessages(fetchedMessages);
      } else {
        console.error("Error loading messages");
      }
    });

    return () => {
      socket.off("loadMessages");
    };
  }, [senderId, receiverId]);

  useEffect(() => {
    if (senderId) {
      socket.emit("user-online", senderId);
    }

    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [senderId]);

  const handleSendMessage = () => {
    if (message.trim() && senderId && receiverId) {
      const newMessage = {
        senderId,
        receiverId,
        content: message.trim(),
        timestamp: new Date(),
      };

      socket.emit("sendMessage", newMessage, (acknowledgment) => {
        if (acknowledgment.success) {
          setMessages((prev) => [...prev, acknowledgment.message]);
          setMessage("");
        } else {
          console.error("Failed to send message:", acknowledgment.error);
        }
      });
    }
  };

  return (
    <div className="flex border-2 shadow-xl -mt-6 mb-1 shadow-black border-gray-700 flex-col min-h-[500px] bg-neutral-200 ">
      <div className="p-3 bg-lime-700 bg-opacity-70 flex items-center text-white">
        <FaArrowLeft
          className="cursor-pointer text-lg"
          onClick={() => navigate(-1)}
        />
        <h2 className="ml-3 font-semibold scale-y-110">{name}</h2>
      </div>
      <div id="message-container" className="flex flex-col p-2 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`py-[2px] px-[8px] my-[1.5px] rounded-lg w-fit ${
              name === msg.senderName ? "bg-gray-500" : "bg-emerald-700 ml-auto"
            }`}
          >
            <div
              className={`text-sm scale-y-110 font-serif flex justify-end ${
                name === msg.senderName ? "text-white" : "text-black"
              }`}
            >
              {msg.senderName}
            </div>
            <div
              className={`flex justify-start font-semibold text-base ${
                name === msg.senderName ? "text-black" : "text-white"
              }`}
            >
              {msg.content}
            </div>
            <div className="text-[10px] text-gray-950 flex justify-end">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 flex items-center border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="flex-1 bg-gray-900 p-2 text-white rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="ml-1 font-bold text-2xl text-emerald-700"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;
 
