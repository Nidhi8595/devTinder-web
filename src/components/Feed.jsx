import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      
      if (res?.data?.data) {
        dispatch(addFeed(res.data.data));
      } else {
        setError("No data found.");
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
      setError("An error occurred while fetching the feed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, [dispatch]);

  // Handling loading state
  if (isLoading) {
    return (
      <h1 className="flex justify-center text-3xl text-white py-40 min-h-[490px]">
        Loading feed...
      </h1>
    );
  }

  // Handling error state
  if (error) {
    return (
      <h1 className="flex justify-center text-3xl text-red-500 py-40 min-h-[490px]">
        {error}
      </h1>
    );
  }

  // If feed is empty
  if (!feed || feed.length <= 0) {
    return (
      <h1 className="flex justify-center text-3xl text-white py-40 min-h-[490px]">
        No new users found!
      </h1>
    );
  }

  // Rendering the feed
  return (
    <div className="flex justify-center min-h-[500px] my-2 pb-5">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
