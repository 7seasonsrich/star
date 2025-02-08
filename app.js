import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import { FaInstagram, FaSpotify } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const affirmations = [
  "She is beautiful.",
  "She is strong.",
  "She is everything.",
  "She is a beautiful star."
];

const StargirlWebsite = () => {
  const [weather, setWeather] = useState(null);
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Los%20Angeles&units=metric&appid=YOUR_API_KEY")
      .then((res) => res.json())
      .then((data) => setWeather(data.main.temp));

    const interval = setInterval(() => {
      setAffirmationIndex((prev) => (prev + 1) % affirmations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCalculate = () => {
    try {
      setResult(eval(input).toString());
    } catch {
      setResult("Error");
    }
  };

  return (
    <div className="relative h-screen w-full bg-pink-200 flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <motion.h1
        className="text-6xl font-bold text-pink-500 drop-shadow-lg"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Hey Stargirl
      </motion.h1>
      
      {/* Weather */}
      <div className="mt-4 flex items-center text-xl font-semibold text-gray-700">
        <WiDaySunny size={40} className="text-yellow-500" />
        <span className="ml-2">{weather ? `${weather}°C` : "Loading..."}</span>
      </div>
      
      {/* Calculator */}
      <div className="mt-4 flex flex-col items-center bg-white p-4 rounded-xl shadow-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded w-48 text-center"
          placeholder="Enter equation"
        />
        <button onClick={handleCalculate} className="mt-2 bg-pink-500 text-white px-4 py-2 rounded">
          Calculate
        </button>
        <div className="mt-2 text-lg font-semibold">{result}</div>
      </div>
      
      {/* Social Links */}
      <div className="mt-4 flex gap-4">
        <a href="https://instagram.com" target="_blank" className="text-pink-600 text-3xl">
          <FaInstagram />
        </a>
        <a href="https://spotify.com" target="_blank" className="text-green-600 text-3xl">
          <FaSpotify />
        </a>
      </div>
      
      {/* Affirmation Slideshow */}
      <motion.div
        key={affirmationIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="mt-6 text-2xl font-semibold text-gray-800"
      >
        {affirmations[affirmationIndex]}
      </motion.div>
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 text-pink-400 text-6xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-yellow-400 text-6xl"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        ♥
      </motion.div>
    </div>
  );
};

export default StargirlWebsite;
