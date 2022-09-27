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
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Axios from "axios";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Stack from "@mui/material/Stack";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

function Addpage() {
  const [processtb, setProcesstb] = useState([]);
  const [dataprocess, setDataprocess] = useState("");
  const [mode, setmode] = useState("");
  const [problem_detail, setproblem_detail] = useState("");
  const [record_action, setrecord_action] = useState("");
  const [pic, setpic] = useState("");
  const [section, setsection] = useState("");
  const [alert_cycle, setalert_cycle] = useState("");
  const [check_status, setCheck_status] = useState("");
  const [pic_check, setPic_check] = useState("");
  const [actionlist, setActionList] = useState([]);
  const [error, setError] = useState(false);
  const [effective_date, seteffective_date] = useState(new Date());


  // const currentDate = new Date()
  // //console.log(currentDate)

  // const difftime = () =>{
  //   Axios.get("http://localhost:3333/process").then((response) => {
  //     console.log(response.data[0])
  //     //if ()
  //     return response.data[0]

  //   })
  // }
  // difftime()
  // const getProcess = () => {
  //   Axios.get("http://localhost:3333/process_tb").then((response) => {
  //     setProcesstb(response.data);
  //   });
  // };
  // useEffect(() => {
  //   getProcess();
  // }, []);

  const url = "http://localhost:3333/add";

  const settingDate = (data) => {
    seteffective_date(data);
  };

  // const handleChange = (e) => {
  //   const newdata = { ...data };
  //   newdata[e.target.id] = e.target.value;
  //   setData(newdata);
  //   console.log(newdata);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      dataprocess.length !== 0 &&
      mode.length !== 0 &&
      problem_detail.length !== 0 &&
      record_action.length !== 0 &&
      pic.length !== 0 &&
      section.length !== 0 &&
      effective_date.length !== 0 &&
      alert_cycle.length !== 0 &&
      dataprocess.length !== null &&
      mode.length !== null &&
      problem_detail.length !== null &&
      record_action.length !== null &&
      pic.length !== null &&
      section.length !== null &&
      effective_date.length !== null &&
      alert_cycle.length !== null
    ) {
      Axios.post(url, {
        process: dataprocess,
        mode: mode,
        problem_detail: problem_detail,
        record_action: record_action,
        pic: pic,
        section: section,
        effective_date: effective_date,
        alert_cycle: alert_cycle,
        check_status: check_status,
        pic_check: pic_check,
      })
        .then((res) => {
          setActionList([
            ...actionlist,
            {
              process: dataprocess,
              mode: mode,
              problem_detail: problem_detail,
              record_action: record_action,
              pic: pic,
              section: section,
              effective_date: effective_date,
              alert_cycle: alert_cycle,
              check_status: check_status,
              pic_check: pic_check,
            },
            console.log(res.data),
            alert("Add Success"),
            window.location = "/process"
          ])
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setError(true);
      console.log("error");
    }
  };

  const getProcess = () => {
    Axios.get("http://localhost:3333/process_tb").then((response) => {
      setProcesstb(response.data);
    });
  };
  useEffect(() => {
    getProcess();
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };
  const handleHomeIcon = (event) => {
    event.preventDefault();
    window.location = "/album";
  };

  const theme = createTheme();

  const monthData = [1,2,3,4,5,6,7,8,9,10,11,12]
  const map1 = monthData.map(x => x*30);

  //######################################### U I #########################################//
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
                ADD
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
            <AddCircleSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add action
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel>Process *</InputLabel>
                    <Select
                      id="dataprocess"
                      value={dataprocess}
                      label="Process"
                      onChange={(e) => setDataprocess(e.target.value)}
                    >
                      {processtb.map((val, key) => {
                        //console.log(val.PROCESS);
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
                {error && dataprocess.length <= 0 ? (
                <label style={{ color: "red" }}>Process can't be Empty</label>
              ) : (
                ""
              )}
              </Grid>
             
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel>Catagolize Mode *</InputLabel>
                    <Select
                      id="mode"
                      value={mode}
                      label="Catagolize Mode"
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
                {error && mode.length <= 0 ? (
                <label style={{ color: "red" }}>Mode can't be Empty</label>
              ) : (
                ""
              )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="pic"
                  label="PIC"
                  onChange={(e) => setpic(e.target.value)}
                  autoComplete="family-name"
                />
                {error && pic.length <= 0 ? (
                  <label style={{ color: "red" }}>PIC can't be Empty</label>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="section"
                  label="Section"
                  onChange={(e) => setsection(e.target.value)}
                  autoComplete="family-name"
                />
                {error && section.length <= 0 ? (
                  <label style={{ color: "red" }}>Section can't be Empty</label>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={3}>
                  <MobileDatePicker
                    id="effective_date"
                    label="Effective date"
                    //format="dd-MM-yyyy"
                    value={effective_date}
                    onChange={settingDate}
                    renderInput={(params) => <TextField {...params} />}
                    
                  />
                  {error && effective_date.length <= 0 ? (
                      <label style={{ color: "red" }}>
                        Effective date can't be Empty
                      </label>
                    ) : (
                      ""
                    )}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={3}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel>Alert cycle *</InputLabel>
                      <Select
                        id="alert_cycle"
                        value={alert_cycle}
                        label="Alert cycle"
                        onChange={(e) => setalert_cycle(e.target.value)}
                      >
                        <MenuItem value={map1[1]}>1 Month</MenuItem>
                        <MenuItem value={map1[2]}>2 Month</MenuItem>
                        <MenuItem value={map1[3]}>3 Month</MenuItem>
                        <MenuItem value={map1[4]}>4 Month</MenuItem>
                        <MenuItem value={map1[5]}>5 Month</MenuItem>
                        <MenuItem value={map1[6]}>6 Month</MenuItem>
                        <MenuItem value={map1[7]}>7 Month</MenuItem>
                        <MenuItem value={map1[8]}>8 Month</MenuItem>
                        <MenuItem value={map1[9]}>9 Month</MenuItem>
                        <MenuItem value={map1[10]}>10 Month</MenuItem>
                        <MenuItem value={map1[11]}>11 Month</MenuItem>
                        <MenuItem value={map1[12]}>12 Month</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {error && alert_cycle.length <= 0 ? (
                      <label style={{ color: "red" }}>
                        Alert cycle can't be Empty
                      </label>
                    ) : (
                      ""
                    )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="problem_detail"
                  label="Problem detail"
                  multiline
                  onChange={(e) => setproblem_detail(e.target.value)}
                  autoFocus
                />
                {error && problem_detail.length <= 0 ? (
                  <label style={{ color: "red" }}>
                    Problem detail can't be Empty
                  </label>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="record_action"
                  label="Record action"
                  onChange={(e) => setrecord_action(e.target.value)}
                  autoComplete="family-name"
                  color="warning"
                  multiline
                />
                {error && record_action.length <= 0 ? (
                  <label style={{ color: "red" }}>
                    Record action can't be Empty
                  </label>
                ) : (
                  ""
                )}
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              ADD
            </Button>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Addpage;
