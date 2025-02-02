import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Modal from "./Modal";

const Requests = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleModalOpen = (connection) => {
    setSelectedConnection(connection);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedConnection(null);
  };
  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="text-bold text-center py-56 text-white text-3xl scale-y-110 min-h-[500px]">
        {" "}
        No Requests Found
      </h1>
    );
  return (
    <div className="text-center my-4 pb-2 min-h-[500px]">
      <h1 className="text-white text-shadow shadow-black italic text-3xl scale-y-110">
        Handshake Queue
      </h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className=" flex my-5 p-4 md:w-3/6 w-5/6 justify-between rounded-xl shadow-[rgba(0,0,0,0.5)_0px_0px_10px_10px] bg-red-200 mx-auto text-black"
          >
            <div>
              <img
                alt="photo"
                className="w-16 h-16 rounded-full object-cover cursor-pointer"
                src={photoUrl}
                onClick={() => handleModalOpen(request.fromUserId)} // Open modal on click
              />
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
            <div className="flex">
              <button
                className="btn h-[35px] mb-1.5 bg-rose-900 rounded-xl md:scale-y-105 font-normal md:text-lg shadow-[rgba(0,0,0,0.4)_6px_6px_3px_3px] mr-3 scale-y-90 tracking-widest md:text-white text-white border-none"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Deny
              </button>
              <button
                className="btn border-none bg-lime-900 rounded-xl shadow-[rgba(0,0,0,0.4)_6px_6px_3px_3px] md:scale-y-105 font-normal scale-y-90 tracking-widest md:text-lg md:text-white text-white"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Merge
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
export default Requests;
