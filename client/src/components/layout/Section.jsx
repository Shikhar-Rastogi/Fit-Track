import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  /* Top | Left-Right | Bottom */
  padding: 32px 24px 20px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 24px 16px 16px;
    gap: 20px;
  }
`;

export default Section;
