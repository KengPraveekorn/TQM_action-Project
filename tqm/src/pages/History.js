import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Axios from "axios";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

function History() {
  const [processtb, setProcesstb] = useState([]);
  // const [inputValue, setValue] = useState([]);
  // const [selectedValue, setSelectedValue] = useState(null);

  const [value, setValue] = useState(new Date());
  const [value2, setValue2] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleChange2 = (newValue) => {
    setValue2(newValue);
  };

  const getProcess = () => {
    Axios.get("http://localhost:3333/process_tb").then((response) => {
      setProcesstb(response.data);
      //console.log(response.data);
    });
  };

  useEffect(() => {
    getProcess();
  }, []);

  // const handleInputChange = (value) => {
  //   setValue(value);
  // };
  // const handleChange = (value) => {
  //   setSelectedValue(value);
  // };

  const [processs, setprocess] = useState("");
  const [mode, setmode] = useState("");
  const [error, setError] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };
  const handleHomeIcon = (event) => {
    event.preventDefault();
    window.location = "/album";
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      process: data.get("process"),
      mode: data.get("mode"),
    };
    // if (
    //   processs.length !== 0 &&
    //   mode.length !== 0 &&
    // ) {
    //   fetch("http://localhost:3333/add", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(jsonData),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       alert("Searching...");
    //       window.location = '/album'
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // } else {
    //   setError(true);
    // }
  };

  const theme = createTheme();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="warning" enableColorOnDark>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <HomeIcon onClick={handleHomeIcon} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                HISTORY CHECK
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
      </ThemeProvider>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Check action
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Process *
                    </InputLabel>

                    <Select
                      //labelId="demo-simple-select-label"
                      id="process"
                      value={processs}
                      label="Process"
                      name="process"
                      onChange={(e) => setprocess(e.target.value)}
                      //onChange={handleChange}
                      // onLoad={getProcess}
                      // onInputChange={handleInputChange}
                      //onClick={getProcess}
                    >
                      {processtb.map((val, key) => {
                        console.log(val.PROCESS);
                        return (
                          <MenuItem value={val.PROCESS}>
                            {" "}
                            {val.PROCESS}{" "}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              {error && processs.length <= 0 ? (
                <label style={{ color: "red" }}>Process can't be Empty</label>
              ) : (
                ""
              )}
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Catagolize Mode *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="mode"
                      value={mode}
                      label="Catagolize Mode"
                      name="mode"
                      onChange={(e) => setmode(e.target.value)}
                    >
                      <MenuItem value={"Audit"}>Audit</MenuItem>
                      <MenuItem  value={"Reject"}>Reject</MenuItem>
                      <MenuItem value={"Claim"}>Claim</MenuItem>
                      <MenuItem value={"NC"}>NC</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              {error && mode.length <= 0 ? (
                <label style={{ color: "red" }}>Mode can't be Empty</label>
              ) : (
                ""
              )}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    <MobileDatePicker
                      label="Start date"
                      inputFormat="dd/MM/yyyy"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={3}>
                    <MobileDatePicker
                      label="End date"
                      inputFormat="dd/MM/yyyy"
                      value={value2}
                      onChange={handleChange2}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </Grid>
              </LocalizationProvider>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Find
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default History;
