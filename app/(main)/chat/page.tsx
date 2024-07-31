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
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState(() => {
    // Initialize chat from localStorage
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem("chatSessions");
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  const [activeSessionIndex, setActiveSessionIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
  }, [sessions]);



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
      default:
        return JSON.stringify({ error: "Function not supported" });
    }
  };
  useEffect(() => {
    // Update localStorage when messages change
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
  }, [sessions]);

  // This function is triggered when starting a new chat
  const handleNewChat = () => {
    const newSession = {
      messages: [], // Initialize with no messages
      id: `session-${Date.now()}` // Unique identifier for the session
    };
    setSessions(prevSessions => [...prevSessions, newSession]); // Add new session to the list
    setActiveSessionIndex(sessions.length); // Set the new session as active
  };

  // This function is triggered when selecting a chat from the sidebar
  const handleSelectChat = (index) => {
    setActiveSessionIndex(index); // Update the active session index
    setMessages(sessions[index].messages); // Load the messages from the selected session
  };

  useEffect(() => {
    // This effect updates the local storage when sessions change
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
  }, [sessions]);



  useEffect(() => {
    // Update the active session's messages when `messages` changes
    if (activeSessionIndex !== null) {
      const updatedSessions = [...sessions];
      updatedSessions[activeSessionIndex].messages = messages;
      setSessions(updatedSessions);
    }
  }, [messages]);
  const handleClearAllChats = () => {
    setSessions([]); // Clear all sessions
    localStorage.removeItem("chatSessions"); // Remove sessions from local storage
    setSelectedChat(null); // Clear selected chat
    setMessages([]); // Clear messages
  };


  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <SideBar onNewChat={handleNewChat} onSelectChat={handleSelectChat} />


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