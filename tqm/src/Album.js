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
import Avatar from "@mui/material/Avatar";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Marquee from "react-fast-marquee";
import Clock from "./Testss/Clock";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #FFF0F5",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
  bgcolor: "#FDEEF4",
};

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

  const [processtb, setProcesstb] = useState([]);
  const [dataprocess, setDataprocess] = useState("");
  const [mode, setmode] = useState("");
  const [problem_detail, setproblem_detail] = useState("");
  const [record_action, setrecord_action] = useState("");
  const [pic, setpic] = useState("");
  const [section, setsection] = useState("");
  const [alert_cycle, setalert_cycle] = useState("");
  const [pic_check, setPic_check] = useState("");
  const [actionlist, setActionList] = useState([]);
  const [effective_date, seteffective_date] = useState(new Date());
  const [error, setError] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const [check_status, setCheck_status] = useState("");

  const url = "http://localhost:3333/add";

  const settingDate = (data) => {
    seteffective_date(data);
  };

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
            (window.location = "/process"),
          ]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setError(true);
      console.log("error");
    }
  };

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

  const monthData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const map1 = monthData.map((x) => x * 30);

  const modalAddShow = () => {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
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
                    <label style={{ color: "red" }}>
                      Process can't be Empty
                    </label>
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
                        <MenuItem value={"Reject"}>Reject</MenuItem>
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
                    <label style={{ color: "red" }}>
                      Section can't be Empty
                    </label>
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
        </Modal>
      </div>
    );
  };

  //Change page-------------------------------------------------------------------------------------------------
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };
  const handleAdd = (event) => {
    event.preventDefault();
    // modalAddShow();
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
              bgcolor: "#eeeeee",
              pt: 8,
              pb: 6,
              alignItems: "center",
              minWidth: 700,
            }}
          >
            <Marquee speed={50}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="#ef2e33"
                gutterBottom
                style={{ marginBottom: "20px" }}
                fontFamily="'Hanalei Fill', cursive"
              >
                Action Database
              </Typography>
            </Marquee>
            <Marquee
              speed={100}
              style={{ marginBottom: "20px" }}
              gradient={false}
            >
              <Typography fontFamily="'Hanalei Fill', cursive" variant="h6" color="#f77f00">
                *** วันนี้คุณทำ Action แล้วหรือยัง ? ***
              </Typography>
              
            </Marquee>

            <div style={{ marginLeft: "20px", marginRight: "20px" }}  >
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
                          border: "3px solid Tomato"
                        }}
                        
                      >
                        <Box>
                          {Clock()}
                        </Box>
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
                              sx={{
                                fontSize: 50,
                                textAlign: "center",
                                color: "primary.main",
                                fontFamily:"'Hanalei Fill', cursive"
                              }}
                            >
                              TODAY
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 50,
                                textAlign: "center",
                                color: "primary.main",
                                fontFamily:"'Hanalei Fill', cursive"
                              }}
                            >
                              {/* {st_data.length} */}
                              5
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateRows: "repeat(2,1fr)",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 50,
                                textAlign: "center",
                                color: "error.main",
                                fontFamily:"'Hanalei Fill', cursive"
                              }}
                            >
                              ALL
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 50,
                                textAlign: "center",
                                color: "error.main",
                                fontFamily:"'Hanalei Fill', cursive"
                              }}
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
                      <div>
                        <Button
                          onClick={handleAdd}
                          color="success"
                          variant="contained"
                        >
                          ADD
                        </Button>
                      </div>

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
                          border: "3px solid Tomato"
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
