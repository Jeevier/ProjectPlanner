import React from "react";
import Navbar from "../../Navbar/Navbar";
import hero from "../../assets/hero.png";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Home.css";
import LoginButton from "../../Navbar/login-button";
import SignupButton from "../../Navbar/signup-btn";

const Home = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Grid container style={{ height: "60vh" }} spacing={6}>
          <Grid item xs={12} md={7} className="hero-content">
            <div>
              <h1>One Stop Solution!!</h1>
              <p>
                A simple, visual way that simplifies your day to day task
                management and planning needs.
              </p>
              <SignupButton />
              <LoginButton />
            </div>
          </Grid>
          {matches && (
            <Grid item md={5}>
              <img src={hero} alt="hero" width={400} />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
