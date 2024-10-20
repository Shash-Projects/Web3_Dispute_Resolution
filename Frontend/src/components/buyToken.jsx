import { useState } from "react";
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
  
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
});

const StyledTextField = styled(TextField)({
  width: "100%", // Full width of its container
  maxWidth: "400px", // Maximum width
  "& .MuiOutlinedInput-root": {
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

const BuyToken = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      setLoading(true); // Set loading state to true when transaction starts
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(walletAddress, walletAbi, signer);

      const tx = await contract.buyTokens(amount, {
        value: ethers.BigNumber.from(amount).mul(100)
      });
      const receipt = await tx.wait();
      console.log('Tokens bought:', receipt);
    } catch (error) {
      console.error("Error purchasing tokens:", error);
      alert("Error purchasing tokens: " + error.message);
    } finally {
      setLoading(false); // Set loading state to false when transaction completes
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
        Buy GRULL Tokens
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

        {/* Conditionally show the loading indicator or the submit button */}
        {loading ? (
          <CircularProgress /> // Show loading spinner while transaction is processing
        ) : (
          <SubmitButton type="submit">Buy</SubmitButton>
        )}
      </Box>
    </Container>
  );
};

export default BuyToken;