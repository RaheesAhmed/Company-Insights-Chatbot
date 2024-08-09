"use client";

import { ArrowUpIcon, PencilIcon } from '@heroicons/react/solid';
import { useUser } from '@clerk/nextjs';
import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import { AssistantStream } from "openai/lib/AssistantStream";
import Markdown from "react-markdown";
import CircularProgress from '@mui/material/CircularProgress';
import { FaUser, FaRobot } from 'react-icons/fa';
import AssistantFunctionsCard from './AssistantFunctionsCard';
type MessageProps = {
  role: "user" | "assistant" | "code";
  text: string;
};

const UserMessage = ({ text }: { text: string }) => {
  return <div className={styles.userMessage}>{text}</div>;
};

const AssistantMessage = ({ text }: { text: string }) => {
  return <div className={styles.assistantMessage}><Markdown>{text}</Markdown></div>;
};

const CodeMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.codeMessage}>
      {text.split("\n").map((line, index) => <div key={index}><span>{`${index + 1}. `}</span>{line}</div>)}
    </div>
  );
};

const Message = ({ role, text }: MessageProps) => {
  switch (role) {
    case "user": return <UserMessage text={text} />;
    case "assistant": return <AssistantMessage text={text} />;
    case "code": return <CodeMessage text={text} />;
    default: return null;
  }
};

const Chat = ({ messages, setMessages }) => {
  const [userInput, setUserInput] = useState("");
  const [fileInfo, setFileInfo] = useState("");
  const messagesEndRef = useRef(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showAssistantCards, setShowAssistantCards] = useState(true);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, { method: "POST" });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);  // Start uploading indicator
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch('/api/assistants/files/code-interpreter', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        setFileInfo(`${file.name} (ID: ${result.fileId})`);
        setUserInput(`${file.name}`);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
      setIsUploading(false);  // Stop uploading indicator
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUploading) return;  // Prevent form submission while uploading
    if (!userInput.trim() && !fileInfo) return;

    sendMessage(`${userInput} ${fileInfo}`);  // Send combined message and file info
    setMessages(prev => [...prev, { role: 'user', text: `${userInput} ${fileInfo}` }]);
    setUserInput('');
    setFileInfo('');
    setShowAssistantCards(false);
  };

  const sendMessage = async (text) => {
    if (!threadId) return;
    // Create a new message object
    setMessages(prev => [...prev, text]);
    const response = await fetch(`/api/assistants/threads/${threadId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content: text })
    });
    const stream = AssistantStream.fromReadableStream(response.body);
    handleReadableStream(stream);
  };

  const handleReadableStream = (stream) => {
    stream.on("textCreated", () => appendMessage("assistant", ""));
    stream.on("textDelta", (delta) => {
      if (delta.value != null) appendToLastMessage(delta.value);
    });
  };

  const appendToLastMessage = (text) => {
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      return [...prev.slice(0, -1), { ...lastMessage, text: lastMessage.text + text }];
    });
  };

  const appendMessage = (role, text) => {
    setMessages(prev => [...prev, { role, text }]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleCardClick = (cardTitle) => {
    setUserInput(cardTitle);
    setShowAssistantCards(false);
  };


  return (
    <div className={styles.chatContainer}>
      <div className={styles.sidebar}></div>
      <div className={styles.messages}>
        {messages.map((msg, index) => <Message key={index} role={msg.role} text={msg.text} />)}
        <div ref={messagesEndRef} />
      </div>
      {showAssistantCards && <AssistantFunctionsCard onCardClick={handleCardClick} />}
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <label htmlFor="file-upload" className={styles.uploadButton}>


          {isUploading ? <CircularProgress size={24} /> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="size-8">
            <path fillRule="evenodd" d="M13.75 7h-3V3.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 4.74a.75.75 0 0 0 1.1 1.02l1.95-2.1V7h-3A2.25 2.25 0 0 0 4 9.25v7.5A2.25 2.25 0 0 0 6.25 19h7.5A2.25 2.25 0 0 0 16 16.75v-7.5A2.25 2.25 0 0 0 13.75 7Zm-3 0h-1.5v5.25a.75.75 0 0 0 1.5 0V7Z" clipRule="evenodd" />
          </svg>}
          <input
            id="file-upload"
            type="file"
            className={styles.fileInput}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
        <input
          type="text"
          className={styles.input}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your message here..."
        />
        <button type="submit" disabled={inputDisabled}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="size-8">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.75-4.75a.75.75 0 0 0 1.5 0V8.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L6.2 9.74a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z" clipRule="evenodd" />
          </svg>

        </button>
      </form>
    </div>
  );
};

export default Chat;
