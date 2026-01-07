import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  max-width: 600px;
  margin: auto;
  padding: 40px;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
`;

const Contact = () => {
  return (
    <Container>
      <Title>Contact Us</Title>
      <Text>
        📧 Email: support@fittrack.ai <br />
        📞 Phone: +91-XXXXXXXXXX <br />
        📍 India
      </Text>
    </Container>
  );
};

export default Contact;
