import { useEffect, useState } from "react";
import { FaCode, FaLaptopCode, FaUsers, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const Banner=() => {
  const [text, setText] = useState("");
  const quote = "Great ideas deserve great connections - find your tech match.";
  
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
    <div className="min-h-[500px] bg-white">
      <div className="text-3xl text-zinc-950 font-bold h-[90px] w-full flex items-center justify-center font-serif scale-y-150 bg-white ">
        Swipe. Connect. Innovate.
      </div>
      <div className="relative flex items-center justify-center h-[370px] text-slate-950 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl text-center max-w-2xl z-10 font-extrabold pb-14 scale-y-110 px-1.5 italic"
        >
          {text}
        </motion.h1>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <FaLaptopCode className="absolute text-emerald-500 text-6xl opacity-80 animate-bounce left-[150px] top-[30px]" />
          <FaUsers className="absolute text-yellow-500 text-6xl opacity-80 animate-pulse right-1/4 bottom-[50px]" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
