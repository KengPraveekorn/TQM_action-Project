import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fade from "@mui/material/Fade";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fab from "@mui/material/Fab";
import Axios from "axios";
import DataPgnt from "./Testss/DataPgnt";
import { Container } from "@mui/material";
import logo from "./img/mrt_logo.png";

//Footer ------------------------------------------------------------------
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="http://asean.murata.co.jp/orgs/CEAB024M0/SitePages/Welcome%20to%20MTL%20Portal.aspx#top"
      >
        MTL Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
//--------------------------------------------------------------------------

//Scroll to top Arrow ----------------------------------------------------
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
//---------------------------------------------------------------------------

// "start": "set POTR=3030 && react-scripts start",

export default function Album(props) {
  const [items, setItem] = useState([]);
  const [data, setData] = useState([]);
  const [st_data, setStdata] = useState([]);

  //Token หมดอายุเด้งไปหน้า Login-----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3333/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Ok") {
          //alert('authen success')
        } else {
          alert("authen failed");
          localStorage.removeItem("token");
          window.location = "/login";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Get data from mysql-----------------------------------
  useEffect(() => {
    fetch("http://localhost:3333/process")
      .then((res) => res.json())
      .then((result) => {
        setItem(result);
        setData(
          result.map((row) => ({
            idaction: row.idaction,
            process: row.process,
            mode: row.mode,
            problem_detail: row.problem_detail,
            record_action: row.record_action,
            pic: row.pic,
            effective_date: row.effective_date,
          }))
        );
        // console.log(result);
      });
  }, []);
  //-------------------------------------------------------------------------------------

  const statusProcess = () => {
    Axios.get("http://localhost:3333/process_status").then((response) => {
      setStdata(response.data);
      // console.log(response.data)
    });
  };
  useEffect(() => {
    statusProcess();
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("This will be called every 2 seconds");
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  //Change page-------------------------------------------------------------------------------------------------
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };
  const handleAdd = (event) => {
    event.preventDefault();
    window.location = "/add";
  };
  const handleHistory = (event) => {
    event.preventDefault();
    window.location = "/history";
  };
  const handleProcess = (event) => {
    event.preventDefault();
    window.location = "/process";
  };
  //-----------------------------------------------------------------------------------------------------------------------

  const theme = createTheme();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          {/* <AppBar position="fixed" color="warning" enableColorOnDark> */}
          <AppBar position="fixed" sx={{ bgcolor: "#B21807" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <HomeIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                ALERT ACTION
              </Typography>
              <Tooltip title="Logout">
                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ p: 0 }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Toolbar id="back-to-top-anchor" />
        </Box>
        <main>
          <Box
            sx={{
              bgcolor: "#ECC5C0",
              pt: 8,
              pb: 6,
              alignItems: "center",
              minWidth: 700,
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
              style={{ marginBottom: "50px" }}
            >
              Action Database
            </Typography>

            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
              <Grid container>
                {/* Grid of number today ----------------------------------------------------------*/}
                <Grid item md={5} sm={12}>
                  <div className="monitorStyle">
                    <ThemeProvider theme={theme}>
                      <Box
                        sx={{
                          bgcolor: "#F5F5F5",
                          boxShadow: 1,
                          borderRadius: 2,
                          p: 2,
                          minWidth: 300,
                          maxWidth: 1200,
                          minHeight: 300,
                          maxHeight: 1000,
                          display: "grid",
                          gridTemplateRows: "repeat(2,1fr)",
                        }}
                      >
                        <Box>Date</Box>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                          }}
                        >
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateRows: "repeat(2,1fr)",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: 50, textAlign: "center" , color: 'primary.main' }}
                            >
                              TODAY
                            </Typography>
                            <Typography
                              sx={{ fontSize: 50, textAlign: "center" , color: 'primary.main' }}
                            >
                              {st_data.length}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateRows: "repeat(2,1fr)",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: 50, textAlign: "center", color: 'error.main'}}
                            >
                              ALL
                            </Typography>
                            <Typography
                              sx={{ fontSize: 50, textAlign: "center", color: 'error.main' }}
                            >
                              {st_data.length}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </ThemeProvider>
                    <Stack
                      sx={{ pt: 3 }}
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                    >
                      <Button
                        onClick={handleAdd}
                        color="success"
                        variant="contained"
                      >
                        ADD
                      </Button>
                      <Button
                        onClick={handleHistory}
                        color="warning"
                        variant="contained"
                      >
                        HISTORY CHECK
                      </Button>
                      <Button
                        onClick={handleProcess}
                        color="info"
                        variant="contained"
                      >
                        ACTION LIST
                      </Button>
                    </Stack>
                  </div>
                </Grid>
                {/* Grid of Alert action list ---------------------------------------------------------- */}
                <Grid item md={7} sm={12}>
                  <div className="monitorStyle">
                    <ThemeProvider theme={theme}>
                      <Box
                        sx={{
                          bgcolor: "#FFFFF7",
                          boxShadow: 1,
                          borderRadius: 2,
                          p: 1,
                          minWidth: 300,
                          maxWidth: 1200,
                          minHeight: 300,
                          maxHeight: 1000,
                        }}
                      >
                        <DataPgnt />
                      </Box>
                    </ThemeProvider>
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* Scroll Top */}
            <ScrollTop {...props}>
              <Fab size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>

            {/* Footer */}
            <Box sx={{ p: 6 }} component="footer">
              <img src={logo} className="bgImg" />
              <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
              >
                INNOVATOR IN ELECTRONICS
              </Typography>
              <Copyright />
            </Box>
            {/* End footer */}
          </Box>
        </main>
      </ThemeProvider>
    </React.Fragment>
  );
}
