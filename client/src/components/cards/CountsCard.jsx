import React from "react";
import styled from "styled-components";

/* ---------- Styles ---------- */

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  display: flex;
  gap: 12px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;

const Value = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: flex-end;
  gap: 6px;
  color: ${({ theme }) => theme.text_primary};
`;

const Unit = styled.span`
  font-size: 14px;
  margin-bottom: 6px;
`;

const Change = styled.span`
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ positive, theme }) =>
    positive ? theme.green : theme.red};
`;

const Icon = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
`;

const Desc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

/* ---------- Component ---------- */

const CountsCard = ({ item, data }) => {
  // Main KPI value
  const value = Number(data?.[item.key] ?? 0).toFixed(2);

  // Percentage change (from backend)
  const changeRaw = Number(data?.[item.changeKey] ?? 0);
  const isPositive = changeRaw >= 0;

  return (
    <Card>
      <Left>
        <Title>{item.name}</Title>

        <Value>
          {value}
          <Unit>{item.unit}</Unit>

          <Change positive={isPositive}>
            {isPositive ? "+" : ""}
            {changeRaw.toFixed(1)}%
          </Change>
        </Value>

        <Desc>{item.desc}</Desc>
      </Left>

      <Icon color={item.color} bg={item.lightColor}>
        {item.icon}
      </Icon>
    </Card>
  );
};

export default CountsCard;
