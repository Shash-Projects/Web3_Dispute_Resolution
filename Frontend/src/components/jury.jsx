import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { styled } from "@mui/system";

const DisputeCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(30, 30, 30, 0.85)", // Slightly transparent dark background
  color: "#fff",
  padding: "20px",
  borderRadius: "12px", // Slightly larger radius for a softer look
  transition: "transform 0.3s, box-shadow 0.3s",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Add shadow for depth
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)", // Elevate shadow on hover
  },
}));

const Container = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #FF7E5F, #feb47b, #86A8E7, #91EAE4)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  color: "#fff",
  overflow: "auto",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "1.1rem",
  transition: "background-color 0.3s, transform 0.3s",
  "&:hover": {
    backgroundColor: "#004ba0",
    transform: "scale(1.05)",
  },
}));

const DisputeDisplay = () => {
  // Simulated dispute data

  const [disputes, setDisputes] = useState([
    { id: 1, text: "Dispute regarding order #1234", response: "" },
    { id: 2, text: "Service dispute on package #5678", response: "" },
    { id: 3, text: "Payment issue for invoice #4321", response: "" },
  ]);

  const handleResponseChange = (id, response) => {
    setDisputes((prevDisputes) =>
      prevDisputes.map((dispute) =>
        dispute.id === id ? { ...dispute, response } : dispute
      )
    );
  };

  const handleSubmit = (id) => {
    const selectedDispute = disputes.find((dispute) => dispute.id === id);
    alert(`Response for dispute ${id}: ${selectedDispute.response}`);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Dispute List
      </Typography>
      <Grid container spacing={4}>
        {disputes.map((dispute) => (
          <Grid item xs={12} sm={6} md={4} key={dispute.id}>
            <DisputeCard elevation={3}>
              <Typography variant="h6" gutterBottom>
                {dispute.text}
              </Typography>

              <RadioGroup
                value={dispute.response}
                onChange={(e) =>
                  handleResponseChange(dispute.id, e.target.value)
                }
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: "10px",
                }}
              >
                <FormControlLabel
                  value="yes"
                  control={
                    <Radio
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": { color: "#4caf50" },
                      }}
                    />
                  }
                  label={<Typography style={{ color: "#fff" }}>Yes</Typography>}
                />
                <FormControlLabel
                  value="no"
                  control={
                    <Radio
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": { color: "#f44336" },
                      }}
                    />
                  }
                  label={<Typography style={{ color: "#fff" }}>No</Typography>}
                />
              </RadioGroup>

              <Box display="flex" justifyContent="center">
                <SubmitButton onClick={() => handleSubmit(dispute.id)}>
                  Submit
                </SubmitButton>
              </Box>
            </DisputeCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DisputeDisplay;
