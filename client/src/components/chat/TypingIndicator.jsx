import React from "react";
import styled from "styled-components";

const DotContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px 12px;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: blink 1.4s infinite both;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0% {
      opacity: 0.2;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`;

const TypingIndicator = () => (
  <DotContainer>
    <Dot />
    <Dot />
    <Dot />
  </DotContainer>
);

export default TypingIndicator;
