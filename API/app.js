const express = require("express");
const cors = require("cors");
const app = express();
//var bodyParser = require('body-parser')
const mysql = require("mysql");
const bcrypt = require("bcrypt"); // hash password
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "Fullstack-Login-2022";

app.use(cors());
app.use(express.json());

//Connect DB MT900
const db = mysql.createConnection({
  user: "mt900_admin",
  host: "163.50.57.176",
  password: "Admin!@#",
  database: "mt900db",
});

// Post Register ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.query(
      "INSERT INTO users (email, password, fname, lname) VALUES (?, ?, ?, ?)",
      [email, hash, fname, lname],
      (err, results) => {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "Ok" });
      }
    );
  });
});

// Post Add Action list ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/add", (req, res) => {
  const process = req.body.process;
  const mode = req.body.mode;
  const problem_detail = req.body.problem_detail;
  const record_action = req.body.record_action;
  const pic = req.body.pic;
  const section = req.body.section;
  const effective_date = req.body.effective_date;
  const alert_cycle = req.body.alert_cycle;
  const check_status = req.body.check_status;
  const pic_check = req.body.pic_check;
  const detail_check = req.body.detail_check;

  const splitDate = effective_date.split("T");

  db.query(
    "INSERT INTO actiondb (process, mode, problem_detail, record_action, pic, section, effective_date, alert_cycle, check_status, pic_check, detail_check) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      process,
      mode,
      problem_detail,
      record_action,
      pic,
      section,
      splitDate[0],
      alert_cycle,
      check_status,
      pic_check,
      detail_check
    ],
    (err, results) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "Ok" });
    }
  );
});

// Post Test code ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/adddate", (req, res) => {
  const name = req.body.name;
  const date = req.body.date;

  const splitDate = date.split("T");

  db.query(
    "INSERT INTO datepicker (name, date) VALUES (?, ?)",
    [name, splitDate[0]],
    (err, results) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "Ok" });
    }
  );
});

// Post Login ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email=?", [email], (err, users) => {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    if (users.length == 0) {
      res.json({ status: "error", message: "no user found" });
      return;
    }
    bcrypt.compare(password, users[0].password, (err, islogin) => {
      if (islogin) {
        const token = jwt.sign({ email: users[0].email }, secret, {
          expiresIn: "1h",
        }); //token หมดอายุภายใน 1 hr
        res.json({ status: "Ok", message: "Login Success", token });
      } else {
        res.json({ status: "error", message: "Login falied" });
      }
    });
  });
});

// Post Authentication Token ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post("/authen", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    res.json({ status: "Ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }

  res.json({ decoded });
});

// Get Process List ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/process_tb", (req, res) => {
  db.query("SELECT * FROM process_tb", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Get Action List ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/process", (req, res) => {
  db.query("SELECT * FROM actiondb", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Get Action List check status ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/process_status", (req, res) => {
  db.query(
    "SELECT * FROM actiondb WHERE check_status = ' ' ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Delete Action List ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.delete("/delete/:idaction", (req, res) => {
  const idaction = req.params.idaction;
  db.query(
    "DELETE FROM actiondb WHERE idaction = ?",
    idaction,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Put update Action List ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.put("/update_tb", (req, res) => {
  const idaction = req.body.idaction;
  const process = req.body.process;
  const mode = req.body.mode;
  const problem_detail = req.body.problem_detail;
  const record_action = req.body.record_action;
  const pic = req.body.pic;
  const section = req.body.section;
  const effective_date = req.body.effective_date;
  const alert_cycle = req.body.alert_cycle;
  const check_status = req.body.check_status;
  const pic_check = req.body.pic_check;
  const detail_check = req.body.detail_check;

  db.query(
    "UPDATE actiondb Set (process, mode, problem_detail, record_action, pic, section, effective_date, alert_cycle, check_status, pic_check, detail_check) = (?,?,?,?,?,?,?,?,?,?,?) WHERE idaction = ?",
    [
      idaction,
      process,
      mode,
      problem_detail,
      record_action,
      pic,
      section,
      effective_date,
      alert_cycle,
      idaction,
      check_status,
      pic_check,
      detail_check,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Put update Status check -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/update_status/:data", (req, res) => {
  let data = req.params.data;
  console.log(data);
  let data_arr = data.split("_");
  let idaction = data_arr[3];
  let check_status = data_arr[2];
  let picAction = data_arr[1];
  let detailAction = data_arr[0]
  // console.log(data);
  db.query(
    "UPDATE actiondb Set check_status = '" +
      check_status +
      "', pic_check = '" +
      picAction +
      "', detail_check = '" +
      detailAction +
      "' WHERE idaction = " +
      idaction +
      "",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Get Search Action List ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/select_date/:effective_date", (req, res) => {
  const effective_date = req.params.effective_date;
  db.query(
    "select * from actiondb WHERE effective_date >= TO_DATE('" +
      time +
      "','DD-MM-YY')"
  );
});

// Run Server Port 3333
app.listen(3333, function () {
  console.log("Server is running on port 3333");
});
