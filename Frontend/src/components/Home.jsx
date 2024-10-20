import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/poppins"; // Import Poppins font

const AnimatedButton = styled(Button)({
  transition: "transform 0.3s, background-color 0.3s, box-shadow 0.3s",
  padding: "12px 30px",
  fontSize: "1.1rem",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  fontFamily: "Poppins, sans-serif", // Use Poppins font
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
  },
});

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #FF7E5F, #feb47b, #86A8E7, #91EAE4)", // Multi-color gradient
        padding: "0 20px",
        fontFamily: "Poppins, sans-serif", // Set font for entire component
      }}
    >
      <Typography variant="h3" component="h1" color="white" sx={{
          fontWeight: 700,
          letterSpacing: "0.05em",
          marginBottom: "20px",
          textAlign: "center",
        }}>
        Welcome to the Jury & Dispute Portal
      </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        color="white" // Change text color for better contrast
        sx={{
          fontSize: "1.2rem",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Choose your action below
      </Typography>
      <Box display="flex" gap={2} mt={4}>
        <Link to="/jury" style={{ textDecoration: "none" }}>
          <AnimatedButton
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1565c0", // Darker blue on hover
              },
            }}
          >
            Jury
          </AnimatedButton>
        </Link>

        <Link to="/dispute" style={{ textDecoration: "none" }}>
          <AnimatedButton
            variant="contained"
            sx={{
              backgroundColor: "#43a047",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#388e3c", // Darker green on hover
              },
            }}
          >
            Dispute
          </AnimatedButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
