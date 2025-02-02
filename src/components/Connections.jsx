import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
// import Chat from "./Chat";
import socket from "../utils/socket";
import UserCard from "./UserCard";
import Modal from "./Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

const Connections = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unreadMessages, setUnreadMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [dispatch]);

  const handleModalOpen = (connection) => {
    setSelectedConnection(connection);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedConnection(null);
  };

  useEffect(() => {
    if (userId) {
      socket.emit("user-online", userId);
    }

    socket.on("update-user-status", (users) => {
      setOnlineUsers(users);
    });

    socket.on("receiveMessage", ({ message, senderId, receiverId }) => {
      if (receiverId === userId && senderId) {
        setUnreadMessages((prev) => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1,
        }));
      }
    });

    return () => {
      socket.off("update-user-status");
      socket.off("receiveMessage");
    };
  }, [userId]);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <h1 className="my-14 py-56 text-center text-white text-3xl scale-y-110 min-h-[500px]">
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center min-h-[500px] my-4 pb-2">
      <h1 className="text-white text-shadow shadow-black italic text-3xl scale-y-110">
        Connected Nodes
      </h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        const unreadCount = unreadMessages[_id] || 0;

        return (
          <div
            key={_id}
            className=" flex my-5 p-4 w-4/5 justify-between rounded-xl shadow-[rgba(0,0,0,0.5)_0px_0px_10px_10px] bg-red-200 mx-auto text-black"
          >
            <div className="relative">
              <img
                alt="photo"
                className="w-16 h-16 rounded-full object-cover cursor-pointer"
                src={photoUrl}
                onClick={() => handleModalOpen(connection)} // Open modal on click
              />
              {onlineUsers.includes(_id) && (
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
                  .
                </span>
              )}
            </div>

            <div className="text-left">
              <h2 className="font-semibold text-shadow shadow-gray-500 text-xl mb-[1px]">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-purple-900 font-semibold italic">
                  {age + ", " + gender}
                </p>
              )}
              {/* <p className="text-purple-900">{about}</p> */}
            </div>

            <div className="flex flex-col justify-between items-center">
              {unreadCount > 0 && (
                <div className="relative">
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                </div>
              )}

              {/* <button
                className="h-8 scale-110 w-14 rounded-lg shadow-[rgba(0,0,0,0.4)_3px_3px_3px_3px] mt-[2px] m-[2px] bg-blue-600 text-white hover:bg-blue-900"
                onClick={() => {
                  navigate(`/chat/${_id}`, {
                    state: { connection },
                  });

                  setUnreadMessages((prev) => ({
                    ...prev,
                    [_id]: 0,
                  }));
                }}
              >
                Talk
              </button> */}

              <button
                className="h-8 scale-110 w-14 rounded-xl shadow-[rgba(0,0,0,0.4)_3px_3px_3px_3px] mt-[2px] m-[2px] bg-blue-700 text-white hover:bg-blue-900 flex items-center border-none justify-center"
                onClick={() => {
                  navigate(`/chat/${_id}`, {
                    state: { connection },
                  });

                  setUnreadMessages((prev) => ({
                    ...prev,
                    [_id]: 0,
                  }));
                }}
              >
                <FontAwesomeIcon icon={faCommentDots} size="lg" />
              </button>
            </div>
          </div>
        );
      })}

      <Modal show={showModal} onClose={handleModalClose}>
        {selectedConnection && <UserCard user={selectedConnection} />}
      </Modal>
    </div>
  );
};

export default Connections;
