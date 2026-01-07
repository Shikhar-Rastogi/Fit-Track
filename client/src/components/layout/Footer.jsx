import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 16px;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Footer = () => {
  return (
    <FooterWrapper>
      © {new Date().getFullYear()} Fit Track. All rights reserved.
    </FooterWrapper>
  );
};

export default Footer;
