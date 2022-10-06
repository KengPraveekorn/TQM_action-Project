import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Pagination } from "@mui/material";
import { Pgnt } from "./Pgnt";
import Axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

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

function DataPgnt() {
  const [items, setItem] = useState([]);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const [modaldata, setModaldata] = useState([]);
  const [check_status, setCheck_status] = useState("");

  const getProcess = () => {
    Axios.get("http://10.51.0.151:3333/process_status").then((response) => {
      setItem(response.data);
    });
  };
  useEffect(() => {
    getProcess();
  }, []);

  const showModal = (id) => {
    setModaldata(id);
  };

  const updateStatus = (id, chkStatus, chkPic, chkDetail) => {
    let data = chkDetail + "_" + chkPic + "_" + chkStatus + "_" + id;
    Axios.get(`http://10.51.0.151:3333/update_status/${data}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("err");
      });
  };

  const ModelShow = () => {
    const [pic_check, setPic_check] = useState("");
    const [detail_check, setDetail_check] = useState("");
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: "red",
                      ml: "auto",
                      mr: "auto",
                      display: "block",
                    }}
                  >
                    Detail
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel>Check Status *</InputLabel>
                      <Select
                        id="check_status"
                        value={check_status}
                        label="Check status"
                        onChange={(e) => {
                          setCheck_status(e.target.value);
                        }}
                        autoFocus
                      >
                        <MenuItem value={"G"}>G</MenuItem>
                        <MenuItem value={"NG"}>NG</MenuItem>
                        <MenuItem value={"Wait confirm"}>Wait confirm</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="pic_check"
                    label="Check PIC "
                    onChange={(e) => setPic_check(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="check_detail"
                    label=" Check Detail "
                    onChange={(e) => setDetail_check(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                      borderRadius: 2,
                    }}
                    onClick={() => {
                      updateStatus(
                        modaldata,
                        check_status,
                        pic_check,
                        detail_check
                      );
                    }}
                  >
                    OK
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  };

  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(items.length / PER_PAGE);
  const _DATA = Pgnt(items, PER_PAGE);
  // console.log(items.length);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const theme = createTheme();

  const currDate = new Date();
  const newDate = currDate.getDate();
  const newDate1 = newDate < 10 ? `0${newDate}` : `${newDate}`; //if newDate < 10 ให้ใส่0 else newDate
  const oldDate = newDate - 1 < 10 ? `0${newDate - 1}` : `${newDate - 1}`; //if newDate < 10 ให้ใส่0 else newDate
  const old2Date = newDate - 2 < 10 ? `0${newDate - 2}` : `${newDate - 2}`; //if newDate < 10 ให้ใส่0 else newDate
  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const currentYear = currDate.getFullYear();
  const currentMonth = month[currDate.getMonth()];
  const actualDate = `${currentYear}-${currentMonth}-${newDate1}`; //จัด Format date ตามตาราง
  const actualDate2 = `${currentYear}-${currentMonth}-${oldDate}`; //จัด Format date 1 วันก่อน ตามตาราง
  const actualDate3 = `${currentYear}-${currentMonth}-${old2Date}`; //จัด Format date 2 วันก่อน ตามตาราง
  // console.log(newDate ,"t", currDate, "t",newDate1,"t",actualDate);

  const setColorTb = (date) => {
    if (date == actualDate) {
      return { backgroundColor: "#b2f7ef" };
    } else {
      return { backgroundColor: "#ffaaa5" };
    }
  };

  return (
    <Box p="5">
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ bgcolor: "#f8e55a", fontSize: "40px" }}>
              <TableRow>
                {/* <TableCell align="left">Process</TableCell>
                <TableCell align="left">Mode</TableCell>
                <TableCell align="left">Problem Detail</TableCell> */}
                <TableCell align="left">
                  <Typography fontSize={"20px"} fontWeight={"600"}>
                    Record Action
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontSize={"20px"} fontWeight={"600"}>
                    PIC
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography fontSize={"20px"} fontWeight={"600"}>
                    Effective Date
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_DATA.currentData().map((post) => {
                let todaydate = post.effective_date;
                let stus = post.check_status;
                if (
                  todaydate === actualDate ||
                  todaydate === actualDate2 ||
                  todaydate === actualDate3 ||
                  stus !== 0
                ) {
                  return (
                    <TableRow
                      key={post.idaction}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      onClick={() => {
                        showModal(post.idaction);
                        handleOpen();
                      }}
                      style={setColorTb(todaydate)}
                    >
                      {/* <TableCell align="left">{post.process}</TableCell>
                      <TableCell align="left">{post.mode}</TableCell>
                      <TableCell align="left">{post.problem_detail}</TableCell> */}
                      <TableCell align="left">
                        <Typography fontSize={"16px"}>
                          {post.record_action}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography fontSize={"16px"}>{post.pic}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography fontSize={"16px"}>
                          {post.effective_date}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return null;
                }
              })}
              <ModelShow />
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
      <Box
        marginTop={2}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Pagination
          color="primary"
          count={count}
          size="medium"
          page={page}
          variant="outlined"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}

export default DataPgnt;
