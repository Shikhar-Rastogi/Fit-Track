import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  Bot,
  X,
  Send,
  AlertTriangle,
} from "lucide-react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

/* ---------- Component ---------- */

const ChatWindow = ({ user, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hi ${user?.name || ""}.
I’m your FitTrack AI Coach.
Ask me about workouts, calories, or recovery.`,
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, typing]);

  /* ---------- Send Message ---------- */

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setTyping(true);

    try {
      // ✅ USE ENV BASED URL (WORKS LOCALLY + PRODUCTION)
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          message: userText,
          user: { _id: user?._id },
        }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "AI is unavailable right now. Please try again later.",
          icon: AlertTriangle,
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <Overlay>
      <Header>
        <HeaderTitle>
          <Bot size={20} />
          FitTrack AI
        </HeaderTitle>

        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
      </Header>

      <Messages>
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            sender={msg.sender}
            text={msg.text}
            Icon={msg.icon}
          />
        ))}

        {typing && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </Messages>

      <InputContainer>
        <Input
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <SendButton onClick={handleSend} disabled={!input.trim()}>
          <Send size={18} />
        </SendButton>
      </InputContainer>
    </Overlay>
  );
};

export default ChatWindow;
