import React from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts/BarChart";

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border-radius: 14px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;

const Subtitle = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ChartWrapper = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const WeeklyStatCard = ({ data }) => {
  if (!data) return null;

  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calories = [120, 180, 150, 200, 220, 300, 260];

  return (
    <Card>
      <Header>
        <Title>Weekly Calories Burned</Title>
        <Subtitle>Calories burned each day</Subtitle>
      </Header>

      <ChartWrapper>
        <BarChart
          xAxis={[{ scaleType: "band", data: weeks }]}
          series={[{ data: calories }]}
          height={260}
        />
      </ChartWrapper>
    </Card>
  );
};

export default WeeklyStatCard;
