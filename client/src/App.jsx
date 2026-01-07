import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Authentication from "./pages/Authentication";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Tutorials from "./pages/Tutorials";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

import ChatWindow from "./components/chat/ChatWindow";

/* ---------- Root Container ---------- */

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.2s ease;
`;

function App() {
  console.log("VITE_API_URL (from build):", import.meta.env.VITE_API_URL);
  const { currentUser } = useSelector((state) => state.user);
  const [chatOpen, setChatOpen] = useState(false);

  /* ---------- Listen for Global AI Chat Event ---------- */
  useEffect(() => {
    const openChat = () => setChatOpen(true);

    window.addEventListener("open-ai-chat", openChat);

    return () => {
      window.removeEventListener("open-ai-chat", openChat);
    };
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          {currentUser ? (
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>

              {/* Global AI Chat Window */}
              {chatOpen && (
                <ChatWindow
                  user={currentUser}
                  onClose={() => setChatOpen(false)}
                />
              )}
            </Layout>
          ) : (
            <Authentication />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
