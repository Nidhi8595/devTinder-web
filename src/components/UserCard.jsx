import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, isEditing, removeSkill }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="card bg-transparent md:w-96 w-4/5 shadow-[rgba(0,0,0,0.7)_0px_0px_10px_10px] text-black ml-1 mb-4">
      <figure className="rounded-full overflow-hidden h-64 w-64 mx-auto mt-2">
        <img className="rounded-full h-full w-full" src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title scale-y-110 text-shadow shadow-slate-700 font-mono text-2xl font-bold tracking-tighter ml-1">
          {firstName + " " + lastName}
        </h2>
        {age && gender && <p className="scale-y-105 font-medium ml-1">{age + ", " + gender}</p>}

        {skills && skills.length > 0 && (
          <div className="skills flex flex-col text-left mt-1">
            <p className="font-semibold font-serif scale-y-110 text-lime-900">Skills:</p>
            <div className="flex flex-col">
              {skills.map((skill, index) => (
                <li key={index} className="text-red-900 font-semibold italic flex justify-between">
                  {skill}
                  {isEditing && (
                    <button
                      className="ml-2 text-sm mb-1 text-white bg-red-800 px-2 py-1 rounded-xl"
                      onClick={() => removeSkill(skill)}
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </div>
          </div>
        )}

        <p className="text-lg/[25px] italic">{about}</p>
        <div className="card-actions justify-center my-3">
          <button
            className="btn bg-rose-900 rounded-xl font-normal text-lg shadow-[rgba(0,0,0,0.4)_6px_6px_3px_3px] mr-3 scale-y-105 text-white border-none"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Skip
          </button>
          <button
            className="btn border-none bg-lime-900 rounded-xl shadow-[rgba(0,0,0,0.4)_6px_6px_3px_3px] font-normal text-lg scale-y-105 text-white"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

