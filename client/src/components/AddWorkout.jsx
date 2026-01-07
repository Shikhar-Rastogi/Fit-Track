import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Sparkles, Bot } from "lucide-react";
import TextInput from "./TextInput";
import Button from "./Button";

/* ---------- Styles ---------- */

const Card = styled.div`
  flex: 1;
  min-width: 320px;
  padding: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.card};
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const AIHint = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

/* ---------- Component ---------- */

const AddWorkout = ({
  addNewWorkout,
  buttonLoading,
  aiSuggestion,
  onAskAI,
}) => {
  const [formData, setFormData] = useState({
    category: "",
    workoutName: "",
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    caloriesBurned: "",
  });

  /* ---------- AI AUTO-FILL ---------- */
  useEffect(() => {
    if (aiSuggestion) {
      setFormData((prev) => ({
        ...prev,
        ...aiSuggestion,
      }));
    }
  }, [aiSuggestion]);

  /* ---------- Handlers ---------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (buttonLoading) return;

    if (!formData.category || !formData.workoutName) {
      alert("Category and Workout Name are required");
      return;
    }

    const payload = {
      category: formData.category,
      workoutName: formData.workoutName,
      sets: Number(formData.sets) || 0,
      reps: Number(formData.reps) || 0,
      weight: Number(formData.weight) || 0,
      duration: Number(formData.duration) || 0,
      caloriesBurned: Number(formData.caloriesBurned) || 0,
    };

    addNewWorkout(payload);

    setFormData({
      category: "",
      workoutName: "",
      sets: "",
      reps: "",
      weight: "",
      duration: "",
      caloriesBurned: "",
    });
  };

  /* ---------- UI ---------- */

  return (
    <Card>
      <Title>
        <Sparkles size={18} />
        Add New Workout
      </Title>

      {/* AI Suggestion Trigger */}
      <AIHint onClick={onAskAI}>
        <Bot size={14} />
        Need help? Ask AI to suggest a workout
      </AIHint>

      <FormGrid>
        <TextInput name="category" label="Category" value={formData.category} handleChange={handleChange} />
        <TextInput name="workoutName" label="Workout Name" value={formData.workoutName} handleChange={handleChange} />
        <TextInput name="sets" label="Sets" value={formData.sets} handleChange={handleChange} />
        <TextInput name="reps" label="Reps" value={formData.reps} handleChange={handleChange} />
        <TextInput name="weight" label="Weight (kg)" value={formData.weight} handleChange={handleChange} />
        <TextInput name="duration" label="Duration (min)" value={formData.duration} handleChange={handleChange} />
        <TextInput name="caloriesBurned" label="Calories Burned" value={formData.caloriesBurned} handleChange={handleChange} />
      </FormGrid>

      <Button
        text={buttonLoading ? "Adding..." : "Add Workout"}
        onClick={handleSubmit}
        isloading={buttonLoading}
        isdisabled={buttonLoading}
        full
      />
    </Card>
  );
};

export default AddWorkout;
