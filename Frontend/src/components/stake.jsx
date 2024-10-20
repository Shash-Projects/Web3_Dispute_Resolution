import React, { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { ethers } from "ethers";
import { walletAddress, walletAbi } from "../interaction";

const SubmitButton = styled(Button)({
  backgroundColor: "#1976d2",
  color: "#fff",
  padding: "12px 24px",
  fontSize: "1.2rem",
  borderRadius: "8px",
  transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    backgroundColor: "#004ba0",
    transform: "scale(1.05)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  },
});

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #FF7E5F, #feb47b, #86A8E7, #91EAE4)", // Gradient background
  padding: "20px",
 
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
});

const StyledTextField = styled(TextField)({
  width: "100%", // Full width of its container
  maxWidth: "400px",
  
 
   // Maximum width
  "& .MuiOutlinedInput-root": {
    border:'none',
    transition: "all 0.3s",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "1.2rem",
  },
  "& .MuiInputBase-input": {
    fontSize: "1.5rem", // Input font size
  },
});

const AmountSubmit = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (amount <= 10 || amount >= 100) {
      alert("The amount is not in the suitable range i.e. between 10 and 100");
      return;
    }

    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      setLoading(true); // Start loading
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(walletAddress, walletAbi, signer);

      const tx = await contract.applyForJuror(amount);
      const receipt = await tx.wait();
      console.log('Tokens staked:', receipt);
    } catch (error) {
      console.error("Error becoming a juror:", error);
      alert("Error staking " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
    setAmount("");
  };

  return (
    <Container>
            <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, color: "#333" }}
      >
        Enter Grull Tokens to Stake
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <StyledTextField
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{ style: { fontSize: "1.5rem" } }} // Adjust input text size
        />
        
        {/* Conditional rendering of spinner or button */}
        {loading ? (
          <CircularProgress /> // Display loading spinner during transaction
        ) : (
          <SubmitButton type="submit">Become a Juror</SubmitButton> // Display button if not loading
        )}
      </Box>
    </Container>
  );
};

export default AmountSubmit;