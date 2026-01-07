import styled from "styled-components";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import Footer from "./Footer";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <LayoutWrapper>
      <Navbar currentUser={currentUser} />
      <Main>{children}</Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
