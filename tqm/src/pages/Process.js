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
import { DataGrid } from "@material-ui/data-grid";
import DataTable from "react-data-table-component";
import { ButtonGroup, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Axios from "axios";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
//import IconButton from '@mui/material/IconButton';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { textAlign } from "@mui/system";

// Css Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Process() {
  const [isloaded, setIsLoaded] = useState(false);
  const [items, setItem] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [processtb, setProcesstb] = useState([]);
  const [dataprocess, setDataprocess] = useState("");
  const [mode, setmode] = useState("");
  // const [problem_detail, setproblem_detail] = useState("");
  // const [record_action, setrecord_action] = useState("");
  // const [pic, setpic] = useState("");
  // const [section, setsection] = useState("");
  const [effective_date, seteffective_date] = useState(new Date());
  const [alert_cycle, setalert_cycle] = useState("");
  // const [actionlist, setActionList] = useState([]);
  // const [error, setError] = useState(false);
  // const [newdataprocess, setNewdataprocess] = useState("");
  // const [newmode, setNewmode] = useState("");
  // const [newproblem_detail, setNewproblem_detail] = useState("");
  // const [newrecord_action, setNewrecord_action] = useState("");
  // const [newpic, setNewpic] = useState("");
  // const [newsection, setNewsection] = useState("");
  // const [newalert_cycle, setNewalert_cycle] = useState("");


  const [search, setSearch] = useState("");

  // Get data from mysql
  const getDataAll = () => {
    // var url = `http://localhost:3333/process`;
    var url = `http://localhost:3333/process`;

    if (search) {
      url += `&search=${search}`;
    }
    Axios.get(url).then((res) => {
      setItem(res.data);
    });
  };
  useEffect(() => {
    getDataAll();
  }, []);

  // Get list process from mysql
  const getProcess = () => {
    Axios.get("http://localhost:3333/process_tb").then((response) => {
      setProcesstb(response.data);
    });
  };
  useEffect(() => {
    getProcess();
  }, []);

  // Function delete button
  const ActionDelete = (idaction) => {
    Axios.delete(`http://localhost:3333/delete/${idaction}`).then(
      (response) => {
        setItem(
          items.filter((row) => {
            return row.idaction != idaction;
          })
        );
      }
    );
  };

  // Function Logout
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };

  // Function HomeIcon
  const handleHomeIcon = (event) => {
    event.preventDefault();
    window.location = "/album";
  };

  // Function Create button
  const handleCreate = (event) => {
    event.preventDefault();
    window.location = "/add";
  };

  // Function set date
  const settingDate = (data) => {
    seteffective_date(data);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getDataAll();
  };

  //Theme Web
  const theme = createTheme();

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
                ACTION LIST
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
        <Container maxWidth="lg" sx={{ p: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Box display={"flex"}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom component={"div"}>
                  TABLE ACTION LIST
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleCreate}
                >
                  CREATE
                </Button>
              </Box>
            </Box>
            <Paper
              component="form"
              sx={{
                p: "2px 5px ",
                display: "flex",
                alignItems: "center",
                width: 200,
                margin: "0 0 10px 40%", // margin ระยะห่างรอบตัว นับ บน ขวา ล่าง ซ้าย
              }}
              onSubmit={handleSearchSubmit}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search google maps" }}
                onChange={handleSearchChange}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>ID</TableCell> */}
                    <TableCell align="left">Process</TableCell>
                    <TableCell align="left">Mode</TableCell>
                    <TableCell align="left">Problem_detail</TableCell>
                    <TableCell align="left">Record_action</TableCell>
                    <TableCell align="left">Pic</TableCell>
                    <TableCell align="left">Section</TableCell>
                    <TableCell align="left">Effective_date</TableCell>
                    <TableCell align="left">Alert_cycle</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {/* <TableCell component="th" scope="row">
                          {row.idaction}
                        </TableCell> */}
                      <TableCell align="left">{row.process}</TableCell>
                      <TableCell align="left">{row.mode}</TableCell>
                      <TableCell align="left">{row.problem_detail}</TableCell>
                      <TableCell align="left">{row.record_action}</TableCell>
                      <TableCell align="left">{row.pic}</TableCell>
                      <TableCell align="left">{row.section}</TableCell>
                      <TableCell align="left">{row.effective_date}</TableCell>
                      <TableCell align="left">{row.alert_cycle}</TableCell>
                      <TableCell align="left">
                        <ButtonGroup
                          variant="outlined"
                          aria-label="outlined button groud"
                        >
                          <div>
                            <Button onClick={handleOpen}>Edit</Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
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
                                            onChange={(e) =>
                                              setDataprocess(e.target.value)
                                            }
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
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                          <InputLabel>
                                            Catagolize Mode *
                                          </InputLabel>
                                          <Select
                                            id="mode"
                                            value={mode}
                                            label="Catagolize Mode"
                                            //   onChange={(e) =>
                                            //     setmode(e.target.value)
                                            //   }
                                          >
                                            <MenuItem value={"Audit"}>
                                              Audit
                                            </MenuItem>
                                            <MenuItem value={"Reject"}>
                                              Reject
                                            </MenuItem>
                                            <MenuItem value={"Claim"}>
                                              Claim
                                            </MenuItem>
                                            <MenuItem value={"NC"}>NC</MenuItem>
                                            <MenuItem value={"Other"}>
                                              Other
                                            </MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <TextField
                                        autoComplete="given-name"
                                        required
                                        fullWidth
                                        id="problem_detail"
                                        label="Problem detail"
                                        // onChange={(e) =>
                                        //   setproblem_detail(e.target.value)
                                        // }
                                        autoFocus
                                      />
                                      {/* {error && problem_detail.length <= 0 ? (
                  <label style={{ color: "red" }}>
                    Problem detail can't be Empty
                  </label>
                ) : (
                  ""
                )} */}
                                    </Grid>
                                    <Grid item xs={12}>
                                      <TextField
                                        required
                                        fullWidth
                                        id="record_action"
                                        label="Record action"
                                        // onChange={(e) =>
                                        //   setrecord_action(e.target.value)
                                        // }
                                        autoComplete="family-name"
                                        color="warning"
                                      />
                                      {/* {error && record_action.length <= 0 ? (
                  <label style={{ color: "red" }}>
                    Record action can't be Empty
                  </label>
                ) : (
                  ""
                )} */}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        required
                                        fullWidth
                                        id="pic"
                                        label="PIC"
                                        // onChange={(e) => setpic(e.target.value)}
                                        autoComplete="family-name"
                                      />
                                      {/* {error && pic.length <= 0 ? (
                                    <label style={{ color: "red" }}>
                                      PIC can't be Empty
                                    </label>
                                  ) : (
                                    ""
                                  )} */}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        required
                                        fullWidth
                                        id="section"
                                        label="Section"
                                        // onChange={(e) => setsection(e.target.value)}
                                        autoComplete="family-name"
                                      />
                                      {/* {error && section.length <= 0 ? (
                                    <label style={{ color: "red" }}>
                                      Section can't be Empty
                                    </label>
                                  ) : (
                                    ""
                                  )} */}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Stack spacing={3}>
                                        <MobileDatePicker
                                          id="effective_date"
                                          label="Effective date"
                                          format="dd-MM-yyyy"
                                          value={effective_date}
                                          onChange={settingDate}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                        {/* {error && effective_date.length <= 0 ? (
                                      <label style={{ color: "red" }}>
                                        Effective date can't be Empty
                                      </label>
                                    ) : (
                                      ""
                                    )} */}
                                      </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Stack spacing={3}>
                                        <Box sx={{ minWidth: 120 }}>
                                          <FormControl fullWidth>
                                            <InputLabel>
                                              Alert cycle *
                                            </InputLabel>
                                            <Select
                                              id="alert_cycle"
                                              value={alert_cycle}
                                              label="Alert cycle"
                                              // onChange={(e) =>
                                              //   setalert_cycle(e.target.value)
                                              // }
                                            >
                                              <MenuItem value={1}>
                                                1 Month
                                              </MenuItem>
                                              <MenuItem value={2}>
                                                2 Month
                                              </MenuItem>
                                              <MenuItem value={3}>
                                                3 Month
                                              </MenuItem>
                                              <MenuItem value={4}>
                                                4 Month
                                              </MenuItem>
                                              <MenuItem value={5}>
                                                5 Month
                                              </MenuItem>
                                              <MenuItem value={6}>
                                                6 Month
                                              </MenuItem>
                                              <MenuItem value={7}>
                                                7 Month
                                              </MenuItem>
                                              <MenuItem value={8}>
                                                8 Month
                                              </MenuItem>
                                              <MenuItem value={9}>
                                                9 Month
                                              </MenuItem>
                                              <MenuItem value={10}>
                                                10 Month
                                              </MenuItem>
                                              <MenuItem value={11}>
                                                11 Month
                                              </MenuItem>
                                              <MenuItem value={12}>
                                                12 Month
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Box>
                                        {/* {error && alert_cycle.length <= 0 ? (
                                      <label style={{ color: "red" }}>
                                        Alert cycle can't be Empty
                                      </label>
                                    ) : (
                                      ""
                                    )} */}
                                      </Stack>
                                    </Grid>
                                  </Grid>
                                  <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                   //onClick={() => setID(items.alert_cycle)}
                                    //onClick={handleSubmit}
                                  >
                                    UPDATE
                                  </Button>
                                </Box>
                              </Box>
                            </Modal>
                          </div>
                          <Button
                            onClick={() => {
                              ActionDelete(row.idaction);
                            }}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </ThemeProvider>
      {/* <Grid>
          <DataTable
            columns={columns}
            data={item}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangePage={handlePageChang}
            onChangeRowsPerPage={handlePerRowsChange}
          />
        </Grid> */}
    </React.Fragment>
  );
}
//}

export default Process;
