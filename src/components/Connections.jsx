import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import Chat from "./Chat"; // Import Chat Component

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState(null); // To track selected chat

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
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <h1 className="my-14 py-56 text-center text-bold text-white text-3xl scale-y-110 min-h-[500px]">
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center min-h-[500px] my-4 pb-2">
      <h1 className="text-bold text-white text-3xl scale-y-110">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex my-4 p-4 rounded-xl bg-red-200 w-3/5 mx-auto justify-between text-black shadow-slate-900 shadow-2xl"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-slate-700">{age + ", " + gender}</p>
              )}
              <p>{about}</p>
            </div>
            <button
              className="btn btn-primary mt-2 m-1 bg-blue-500 text-white hover:bg-blue-700"
              onClick={() => setSelectedChat(connection)}
            >
              Chat
            </button>
          </div>
        );
      })}
      {selectedChat && (
        <Chat connection={selectedChat} onClose={() => setSelectedChat(null)} />
      )}
    </div>
  );
};

export default Connections;
