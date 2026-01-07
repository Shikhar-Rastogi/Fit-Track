import React from "react";
import styled from "styled-components";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

/* ---------- Styles ---------- */

const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.3);
  z-index: 999;

  &:hover {
    transform: scale(1.05);
    background: ${({ theme }) => theme.primary + "cc"};
  }
`;

/* ---------- Component ---------- */

const ChatButton = ({ onClick }) => {
  return (
    <FloatingButton onClick={onClick}>
      <SmartToyOutlinedIcon />
    </FloatingButton>
  );
};

export default ChatButton;
