"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/weather";

import FileViewer from "../../components/file-viewer";
import { getCryptoPrices } from '../../utils/crypto';
import SideBar from "@/app/components/SideBar";

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState({});
  const [cryptoPrices, setcryptoPrices] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [downloadedPDF, setDownloadedPDF] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem("chatSessions");
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  const [activeSessionIndex, setActiveSessionIndex] = useState(null);

  useEffect(() => {
    console.log('Local Storage Contents:', JSON.parse(JSON.stringify(localStorage)));
  }, []);



  const functionCallHandler = async (call: any) => {
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
      case "downloadPDF":
        const downloadArgs = JSON.parse(call.function.arguments);

        return JSON.stringify({ message: "PDF downloaded successfully" });
      default:
        return JSON.stringify({ error: "Function not supported" });
    }
  };

  useEffect(() => {
    if (activeSessionIndex !== null) {
      const updatedSessions = [...sessions];
      updatedSessions[activeSessionIndex].messages = messages;
      setSessions(updatedSessions);
      localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
    }
  }, [messages, activeSessionIndex]);

  const handleNewChat = () => {
    const newSession = {
      messages: [],
      id: `session-${Date.now()}`
    };
    setSessions(prevSessions => [...prevSessions, newSession]);
    setActiveSessionIndex(sessions.length);
    setMessages([]);
  };

  const handleSelectChat = (index: any) => {
    setActiveSessionIndex(index);
    setMessages(sessions[index].messages);
  };

  const handleClearAllChats = () => {
    setSessions([]);
    localStorage.removeItem("chatSessions");
    setActiveSessionIndex(null);
    setMessages([]);
  };





  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SideBar
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onClearAllChats={handleClearAllChats}
          sessions={sessions}
          activeSessionIndex={activeSessionIndex}
        />
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat
              functionCallHandler={functionCallHandler}
              messages={messages}
              setMessages={setMessages}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;