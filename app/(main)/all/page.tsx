"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/weather";
import FileViewer from "../../components/file-viewer";
import { getCryptoPrices } from '../../utils/crypto'; // Ensure this is the correct import path
import SideBar from "@/app/components/SideBar";

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState({});
  const [cryptoPrices, setcryptoPrices] = useState("");
  const [messages, setMessages] = useState(() => {
    // Initialize chat from localStorage
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const functionCallHandler = async (call) => {
    switch (call.function.name) {
      case "get_weather":
        const weatherArgs = JSON.parse(call.function.arguments);
        const weather = await getWeather(weatherArgs.location);
        setWeatherData(weather);
        return JSON.stringify(weather);
      case "getCryptoPrices":
        const symbolArgs = JSON.parse(call.function.arguments);
        const symbol = await getCryptoPrices(symbolArgs.symbol);
        setcryptoPrices(symbol);
        return JSON.stringify(symbol);
      default:
        return JSON.stringify({ error: "Function not supported" });
    }
  };
  useEffect(() => {
    // Update localStorage when messages change
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);


  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SideBar onNewChat={handleNewChat} />
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} messages={messages} setMessages={setMessages} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
