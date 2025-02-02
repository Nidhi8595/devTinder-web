import { useEffect, useState } from "react";
import { FaUsers, FaComments, FaRegLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Banner = () => {
  const [text, setText] = useState("");
  const quote = "Great ideas deserve great connections - find your tech match.";

  const user = useSelector((store) => store.user);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(quote.slice(0, i));
      i++;
      if (i > quote.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[600px] relative ">
      <div className="h-[120px] pt-4 w-full flex items-center justify-center">
        <div className="text-3xl text-white font-bold font-serif italic scale-y-150 text-shadow-lg shadow-black md:text-5xl">
          Swipe. Connect. Innovate.
        </div>
      </div>
      <div className="relative flex items-center h-[350px] justify-center text-black overflow-hidden mb-[50px]">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl text-center max-w-2xl z-10 text-shadow-lg shadow-slate-800 italic font-bold pb-[80px] px-1.5"
        >
          {text}
        </motion.h1>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          
          {!user && (
            <Link to="/login">
              <FaUsers className="absolute text-lime-800 text-6xl opacity-90 animate-pulse right-1/4 bottom-[30px]" />
            </Link>
          )}

          {user && (
            <Link to="/feed">
              <FaUsers className="absolute text-lime-800 text-6xl opacity-90 animate-pulse right-1/4 bottom-[30px]" />
            </Link>
          )}
        </div>
      </div>
      <div className="relative -bottom-[30px] md:px-0 md:min-h-[300px] px-[25px] min-h-[380px] w-full bg-amber-100 -mb-[17px]  shadow-[rgba(0,0,0,0.7)_0px_0px_10px_10px] pt-10">
        <div className="container mx-auto text-center text-black">
          <p className="text-lg text-shadow shadow-slate-500 text-wrap scale-y-105 md:text-xl max-w-5xl mx-auto leading-relaxed">
            devTinder is more than just a platform to connect with like-minded
            developers; it's a dynamic community where you can collaborate,
            share ideas, and innovate together.
            <br />
            <span className="inline-flex items-center space-x-3">
              <FaComments className="text-lime-600 mt-1" />
            </span>{" "}
            Join our interactive chatrooms to engage in real-time conversations,
            ask questions, and build lasting professional relationships.
            <br />
            <span className="inline-flex items-center space-x-3">
              <FaRegLightbulb className="text-yellow-800 mt-1" />
            </span>{" "}
            Discover new opportunities and be part of a growing network of tech
            enthusiasts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
