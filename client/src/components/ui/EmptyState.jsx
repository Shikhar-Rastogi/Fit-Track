import styled from "styled-components";

const Wrapper = styled.div`
  padding: 40px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const Icon = styled.div`
  font-size: 42px;
  margin-bottom: 12px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 6px;
`;

const Message = styled.div`
  font-size: 14px;
`;

const EmptyState = ({ icon, title, message }) => {
  return (
    <Wrapper>
      {icon && <Icon>{icon}</Icon>}
      <Title>{title}</Title>
      <Message>{message}</Message>
    </Wrapper>
  );
};

export default EmptyState;
