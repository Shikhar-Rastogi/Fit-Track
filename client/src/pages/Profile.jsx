import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

/* ---------- Layout ---------- */

const Container = styled.div`
  flex: 1;
  background: #f7f9fc;
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 0 20px;
`;

/* ---------- Card ---------- */

const Card = styled.div`
  background: ${({ theme }) => theme.bg};
  border-radius: 16px;
  padding: 28px;
  border: 1px solid ${({ theme }) => theme.text_primary + "15"};
  box-shadow: 0 10px 30px ${({ theme }) => theme.primary + "12"};
`;

/* ---------- Header ---------- */

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

/* ---------- Rows ---------- */

const Row = styled.div`
  display: flex;
  gap: 8px;
  font-size: 15px;
  margin-bottom: 14px;
`;

const Label = styled.span`
  font-weight: 600;
  min-width: 80px;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.text_primary};
`;

/* ---------- Component ---------- */

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) return null;

  return (
    <Container>
      <Wrapper>
        <Card>
          <Header>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: "primary.main",
                fontSize: 22,
              }}
              src={currentUser.img}
            >
              {currentUser.name?.[0]}
            </Avatar>

            <div>
              <Title>My Profile</Title>
              <Subtitle>Your account details</Subtitle>
            </div>
          </Header>

          <Row>
            <Label>Name:</Label>
            <Value>{currentUser.name}</Value>
          </Row>

          <Row>
            <Label>Email:</Label>
            <Value>{currentUser.email}</Value>
          </Row>

          <Row>
            <Label>Joined:</Label>
            <Value>
              {currentUser.createdAt
                ? new Date(currentUser.createdAt).toDateString()
                : "—"}
            </Value>
          </Row>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Profile;
