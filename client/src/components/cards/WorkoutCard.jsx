import React from "react";
import styled from "styled-components";
import {
  FitnessCenterRounded,
  TimelapseRounded,
} from "@mui/icons-material";

/* ---------- Styles ---------- */

const Card = styled.div`
  width: 100%;
  max-width: 380px;
  padding: 18px 20px;
  border-radius: 16px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text_primary + "15"};
  box-shadow: 0px 8px 24px ${({ theme }) => theme.primary + "12"};
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 600px) {
    padding: 14px 16px;
  }
`;

const Category = styled.div`
  width: fit-content;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + "20"};
  padding: 4px 10px;
  border-radius: 8px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const Sets = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 6px;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

/* ---------- Component ---------- */

const WorkoutCard = ({ workout }) => {
  if (!workout) return null;

  return (
    <Card>
      <Category>#{workout.category}</Category>

      <Name>{workout.workoutName}</Name>

      <Sets>
        {workout.sets} sets × {workout.reps} reps
      </Sets>

      <MetaRow>
        <Detail>
          <FitnessCenterRounded sx={{ fontSize: 18 }} />
          {workout.weight} kg
        </Detail>

        <Detail>
          <TimelapseRounded sx={{ fontSize: 18 }} />
          {workout.duration} min
        </Detail>
      </MetaRow>
    </Card>
  );
};

export default WorkoutCard;
