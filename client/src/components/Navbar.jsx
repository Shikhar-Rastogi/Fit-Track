import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { Link as LinkR, NavLink, useNavigate } from "react-router-dom";
import { MenuRounded, SmartToyOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";

/* ---------- Layout ---------- */

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000; /* IMPORTANT */
  background-color: ${({ theme }) => theme.bg};
  height: 72px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + "20"};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
`;

const Logo = styled.img`
  height: 36px;
`;

/* ---------- Nav Links ---------- */

const NavItems = styled.ul`
  display: flex;
  gap: 26px;
  list-style: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-weight: 500;
  padding-bottom: 4px;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

/* ---------- Right Section ---------- */

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
`;

const ChatButton = styled(IconButton)`
  background: ${({ theme }) => theme.primary} !important;
  color: white !important;
  width: 40px;
  height: 40px;

  &:hover {
    background: ${({ theme }) => theme.primary + "cc"} !important;
  }
`;

/* ---------- Dropdown ---------- */

const Dropdown = styled.div`
  position: absolute;
  top: 56px;
  right: 0;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.18);
  padding: 12px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 10px;
  border-radius: 8px;
  color: ${({ theme }) => theme.text_primary};

  &:hover {
    background: ${({ theme }) => theme.primary + "15"};
    color: ${({ theme }) => theme.primary};
  }
`;

/* ---------- Mobile ---------- */

const MobileIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const MobileMenu = styled.ul`
  position: absolute;
  top: 72px;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  list-style: none;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);

  transform: ${({ open }) =>
    open ? "translateY(0)" : "translateY(-20px)"};
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "all" : "none")};
  transition: all 0.3s ease;
`;

/* ---------- Component ---------- */

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const openAIChat = () => {
    window.dispatchEvent(new Event("open-ai-chat"));
  };

  const handleProfile = () => {
    setUserMenu(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserMenu(false);
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <Nav>
      <NavContainer>
        <Left>
          <MobileIcon onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuRounded />
          </MobileIcon>

          <NavLogo to="/" onClick={closeMobileMenu}>
            <Logo src={LogoImg} alt="Fittrack Logo" />
            Fittrack
          </NavLogo>

          <NavItems>
            <Navlink to="/">Dashboard</Navlink>
            <Navlink to="/workouts">Workouts</Navlink>
            <Navlink to="/tutorials">Tutorials</Navlink>
            <Navlink to="/blogs">Blogs</Navlink>
            <Navlink to="/contact">Contact</Navlink>
          </NavItems>
        </Left>

        <RightSection>
          <ChatButton onClick={openAIChat}>
            <SmartToyOutlined fontSize="small" />
          </ChatButton>

          <Avatar
            src={currentUser?.img}
            onClick={() => setUserMenu(!userMenu)}
            sx={{ cursor: "pointer", width: 36, height: 36 }}
          >
            {currentUser?.name?.[0]}
          </Avatar>

          {userMenu && (
            <Dropdown>
              <DropdownItem onClick={handleProfile}>
                Profile
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>
                Logout
              </DropdownItem>
            </Dropdown>
          )}
        </RightSection>

        <MobileMenu open={mobileOpen}>
          <Navlink to="/" onClick={closeMobileMenu}>Dashboard</Navlink>
          <Navlink to="/workouts" onClick={closeMobileMenu}>Workouts</Navlink>
          <Navlink to="/tutorials" onClick={closeMobileMenu}>Tutorials</Navlink>
          <Navlink to="/blogs" onClick={closeMobileMenu}>Blogs</Navlink>
          <Navlink to="/contact" onClick={closeMobileMenu}>Contact</Navlink>
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
