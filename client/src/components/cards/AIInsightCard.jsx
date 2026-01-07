import React from "react";
import styled from "styled-components";
import {
  Sparkles,
  Flame,
  Activity,
  Rocket,
  Brain,
} from "lucide-react";

/* ---------- Styled Components ---------- */

const Card = styled.div`
  padding: 18px 20px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}14,
    ${({ theme }) => theme.primary}06
  );
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.primary}22;
`;

const IconButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: none;
  cursor: pointer;

  background: ${({ theme }) => theme.primary};
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${({ theme }) => theme.primary}40;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

/* ---------- Component ---------- */

const AIInsightCard = ({ data, onOpenChat }) => {
  if (!data) return null;

  const calories = data.totalCaloriesBurnt || 0;
  const workouts = data.totalWorkouts || 0;

  let insightText;
  let InsightIcon;

  if (workouts >= 2 && calories > 400) {
    insightText =
      "You trained hard today. Consider recovery, stretching, or yoga.";
    InsightIcon = Flame;
  } else if (workouts === 1) {
    insightText =
      "Good consistency. A light cardio or core session can balance today.";
    InsightIcon = Activity;
  } else {
    insightText =
      "You haven’t trained today. A 30-minute workout can boost energy.";
    InsightIcon = Rocket;
  }

  return (
    <Card>
      <IconButton
        aria-label="Open AI Coach"
        onClick={onOpenChat}
        title="Ask AI Coach"
      >
        <Sparkles size={20} />
      </IconButton>

      <Content>
        <Title>
          <Brain size={16} />
          AI Coach Insight
        </Title>

        <Text>
          <InsightIcon size={18} />
          {insightText}
        </Text>
      </Content>
    </Card>
  );
};

export default AIInsightCard;
