"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/weather";
import FileViewer from "../../components/file-viewer";
import { getCryptoPrices } from '../../utils/crypto'; // Ensure this is the correct import path

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState({});
  const [cryptoPrices, setcryptoPrices] = useState("");

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

  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
