import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { FaUsers } from "react-icons/fa";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {}
  };

  return (
    <div className="navbar min-h-[75px] bg-slate-950 shadow-slate-950 shadow-xl pb-2 border-2 border-zinc-700 z-100 mb-5 text-white">
      <div className="flex-1">
        <Link
          to="/"
          className="btn text-white text-2xl font-serif bg-gradient-to-r from-amber-300 via-green-900 to-gray-700 scale-y-110 rounded-xl"
        >
          👩‍💻 DevTinder
        </Link>
        {!user && (
          <Link
            to="/login"
            className="btn absolute right-[30px] bg-stone-700 text-white btn-ghost text-xl"
          >
            Login
          </Link>
        )}
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  <Link to="/profile" className="justify-between">
                    {" "}
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </a>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>

          <Link to="/feed">
            <FaUsers className=" text-lime-600 text-4xl opacity-100 animate-pulse mx-2" />
          </Link>
        </div>
      )}
    </div>
  );
};
export default NavBar;
