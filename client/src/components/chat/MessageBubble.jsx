import React from "react";
import styled from "styled-components";

const Bubble = styled.div`
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-line;

  align-self: ${({ sender }) =>
    sender === "user" ? "flex-end" : "flex-start"};

  background: ${({ sender, theme }) =>
    sender === "user" ? theme.primary : theme.card};

  color: ${({ sender, theme }) =>
    sender === "user" ? "white" : theme.text_primary};
`;

const MessageBubble = ({ sender, text }) => {
  return <Bubble sender={sender}>{text}</Bubble>;
};

export default MessageBubble;
