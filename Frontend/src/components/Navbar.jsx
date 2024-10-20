import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { ethers } from "ethers";
import { walletAddress, walletAbi } from "../interaction";

const NavButton = styled(Button)({
  color: "#fff",
  textTransform: "none",
  fontSize: "1.1rem",
  padding: "10px 25px",
  transition: "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)", // Add shadow for depth
  borderRadius: "8px", // Rounded corners for modern look
  "&:hover": {
    backgroundColor: "#ff6f61", // Coral color for hover
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Elevate shadow on hover
  },
});

const Navbar = ({ account }) => {
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    try {
      setLoading(true); // Start loading state
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(walletAddress, walletAbi, signer);

      // Fetch token balance
      const balance = await contract.getTokens(account);
      console.log("The user has this many tokens: ", balance.toString());
      
      setTokens(balance.toString());
    } catch (error) {
      console.error("Error fetching token balance:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  useEffect(() => {
    if (account) {
      getToken(); // Fetch token balance when the component mounts
    }
  }, [account]);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #FF4E50, #FC913A)",
         
        // Gradient background
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // More defined shadow
        padding: "10px 20px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            letterSpacing: "0.05em",
            color: "#fff", // White text for logo
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Daroga
          </Link>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link
            to="/stake"
            style={{ textDecoration: "none"}}
          >
            <NavButton>Apply for Juror</NavButton>
          </Link>
          <Link
            to="/buytoken"
            style={{ textDecoration: "none"}}
          >
            <NavButton>Buy Token</NavButton>
          </Link>
        </Box>

        <NavButton
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background for account button
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)", // Lighter on hover
              },
            }}
          >
            Acc: {account.slice(0, 6) + "..."}
            {loading ? (
          <Typography variant="body1" sx={{ ml: 2, color: "#fff" }}>
            Loading...
          </Typography>
        ) : tokens ? (
          <Typography variant="body1" sx={{ ml: 2, color: "#fff" }}>
            Balance: {tokens}
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ ml: 2, color: "#fff" }}>
            No Balance
          </Typography>
        )}
          </NavButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;