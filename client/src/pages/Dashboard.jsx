import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Hand,
  Dumbbell,
  Bot,
  Sparkles,
} from "lucide-react";

import { counts } from "../utils/data";
import CountsCard from "../components/cards/CountsCard";
import WeeklyStatCard from "../components/cards/WeeklyStatCard";
import CategoryChart from "../components/cards/CategoryChart";
import AddWorkout from "../components/AddWorkout";
import WorkoutCard from "../components/cards/WorkoutCard";
import AIInsightCard from "../components/cards/AIInsightCard";

import { addWorkout, getDashboardDetails, getWorkouts } from "../api";

/* ---------- Layout ---------- */

const Container = styled.div`
  flex: 1;
  background: #f7f9fc;
  display: flex;
  justify-content: center;
  padding: 24px 0;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

/* ---------- Header ---------- */

const HeaderBlock = styled.div`
  padding: 0 20px;
`;

const PageTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PageSubtitle = styled.p`
  margin: 6px 0 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* ---------- Sections ---------- */

const Section = styled.section`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SectionHeading = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const WorkoutsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Loading = styled.div`
  padding: 80px;
  text-align: center;
  font-size: 16px;
  color: gray;
`;

/* ---------- Component ---------- */

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [data, setData] = useState(null);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aiSuggestion, setAiSuggestion] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = localStorage.getItem("fittrack-app-token");

  /* ---------- API Calls ---------- */

  const fetchDashboardData = async () => {
    const res = await getDashboardDetails(token);
    setData(res.data);
  };

  const fetchTodaysWorkouts = async () => {
    const res = await getWorkouts(token);
    setTodaysWorkouts(res?.data?.todaysWorkouts || []);
  };

  /* ---------- Add Workout ---------- */

  const addNewWorkout = async (formData) => {
    setButtonLoading(true);
    try {
      await addWorkout(token, formData);

      setToast({
        open: true,
        message: "Workout added successfully",
        severity: "success",
      });

      setAiSuggestion(null);
      await fetchDashboardData();
      await fetchTodaysWorkouts();
    } catch {
      setToast({
        open: true,
        message: "Failed to add workout",
        severity: "error",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  /* ---------- AI Suggestion ---------- */

  const handleAskAI = () => {
    const suggestions = [
      { category: "Cardio", workoutName: "Jump Rope", duration: 20, caloriesBurned: 300 },
      { category: "Chest", workoutName: "Bench Press", sets: 4, reps: 10, weight: 80, caloriesBurned: 250 },
      { category: "Legs", workoutName: "Squats", sets: 4, reps: 12, weight: 100, caloriesBurned: 280 },
      { category: "Arms", workoutName: "Bicep Curls", sets: 3, reps: 15, weight: 20, caloriesBurned: 150 },
      { category: "Core", workoutName: "Plank", duration: 10, caloriesBurned: 100 },
    ];

    const randomWorkout = suggestions[Math.floor(Math.random() * suggestions.length)];
    setAiSuggestion({ ...randomWorkout });

    setToast({
      open: true,
      message: `AI suggested a ${randomWorkout.category} workout`,
      severity: "info",
    });
  };

  const openAIChat = () => {
    window.dispatchEvent(new Event("open-ai-chat"));
  };

  /* ---------- Effects ---------- */

  useEffect(() => {
    const loadData = async () => {
      await fetchDashboardData();
      await fetchTodaysWorkouts();
      setLoading(false);
    };
    loadData();
  }, []);

  /* ---------- Loading ---------- */

  if (loading) {
    return (
      <Container>
        <Loading>Loading dashboard...</Loading>
      </Container>
    );
  }

  /* ---------- UI ---------- */

  return (
    <Container>
      <Wrapper>
        {/* Header */}
        <HeaderBlock>
          <PageTitle>
            Welcome back, {currentUser?.name || "Athlete"}
            <Hand size={22} />
          </PageTitle>
          <PageSubtitle>
            Consistency beats intensity. Let’s make today count
            <Dumbbell size={16} />
          </PageSubtitle>
        </HeaderBlock>

        {/* KPI Cards */}
        {data && (
          <Section>
            <Row>
              {counts.map((item) => (
                <CountsCard key={item.key} item={item} data={data} />
              ))}
            </Row>
          </Section>
        )}

        {/* AI Insight */}
        {data && (
          <Section>
            <AIInsightCard data={data} onOpenChat={openAIChat} />
          </Section>
        )}

        {/* Charts */}
        {data && (
          <Section>
            <Grid2>
              <WeeklyStatCard data={data} />
              <CategoryChart data={data} />
            </Grid2>
          </Section>
        )}

        {/* Add Workout */}
        <Section>
          <SectionHeading>
            <Dumbbell size={18} />
            Workout Builder
          </SectionHeading>

          <AddWorkout
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
            onAskAI={handleAskAI}
            aiSuggestion={aiSuggestion}
          />
        </Section>

        {/* Today's Workouts */}
        <Section>
          <SectionHeading>
            <Sparkles size={18} />
            Today’s Workouts
          </SectionHeading>

          <WorkoutsGrid>
            {todaysWorkouts.length === 0 ? (
              <p style={{ margin: 0 }}>
                No workouts yet. Add one or ask AI
              </p>
            ) : (
              todaysWorkouts.map((w) => (
                <WorkoutCard key={w._id} workout={w} />
              ))
            )}
          </WorkoutsGrid>
        </Section>
      </Wrapper>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          iconMapping={{
            success: <Dumbbell size={18} />,
            info: <Bot size={18} />,
            error: <Sparkles size={18} />,
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
