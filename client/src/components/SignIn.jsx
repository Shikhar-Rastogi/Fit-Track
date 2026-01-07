import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* ---------- Styles ---------- */

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

/* ---------- Component ---------- */

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const validateInputs = () => {
    if (!email || !password) {
      setToast({
        open: true,
        message: "Please fill in all fields",
        severity: "warning",
      });
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setButtonDisabled(true);

    try {
      const res = await UserSignIn({ email, password });

      // Persist token
      localStorage.setItem("fittrack-app-token", res.data.token);

      // Redux state
      dispatch(loginSuccess(res.data));

      setToast({
        open: true,
        message: "Login successful 🎉",
        severity: "success",
      });

      // Redirect to dashboard
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setToast({
        open: true,
        message:
          err?.response?.data?.message ||
          "Something went wrong. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome to Fittrack 👋</Title>
        <Span>Please login with your details here</Span>
      </div>

      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />

        <Button
          text={loading ? "Signing In..." : "Sign In"}
          onClick={handleSignIn}
          isloading={loading}
          isdisabled={buttonDisabled}
        />
      </div>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default SignIn;
