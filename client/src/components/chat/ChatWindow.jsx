import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Bot, X, Send, AlertTriangle } from "lucide-react";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

/* ================== STYLES ================== */

const Overlay = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 360px;
  height: 520px;
  background: ${({ theme }) => theme.bg};
  border-radius: 18px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  z-index: 1000;

  @media (max-width: 600px) {
    width: 95%;
    height: 90%;
    right: 2.5%;
    bottom: 5%;
  }
`;

const Header = styled.div`
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + "20"};
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Messages = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  padding: 12px;
  display: flex;
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + "20"};
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "40"};
  outline: none;
  font-size: 14px;
`;

const SendButton = styled.button`
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 12px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ================== COMPONENT ================== */

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setTyping(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        message: userText,
        user: { _id: user?._id },
      });

      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (error) {
      console.error("AI error:", error);
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
