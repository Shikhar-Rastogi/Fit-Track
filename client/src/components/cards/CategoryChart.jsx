import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

/* ---------- Styles ---------- */

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
  margin-bottom: 12px;
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

const EmptyState = styled.div`
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

/* ---------- Component ---------- */

const CategoryChart = ({ data }) => {
  const chartData = (data?.pieChartData || []).filter(
    (item) => Number(item.value) > 0
  );


  return (
    <Card>
      <Header>
        <Title>Workout Categories</Title>
        <Subtitle>Distribution of your workouts</Subtitle>
      </Header>

      {chartData.length === 0 ? (
        <EmptyState>No workout data available</EmptyState>
      ) : (
        <ChartWrapper>
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: 55,
                outerRadius: 110,
                paddingAngle: 4,
                cornerRadius: 8,
              },
            ]}
            height={260}
          />
        </ChartWrapper>
      )}
    </Card>
  );
};

export default CategoryChart;
