import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Album from "./Album";
import Register from "./Register";
import Addpage from "./pages/Addpage";
import History from "./pages/History";
import Process from "./pages/Process";
import Datepi from "./Testss/Datepi";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Carousels from "./Testss/Carousels";
import DataPgnt from "./Testss/DataPgnt";
import './App.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/album" element={<Album />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<Addpage />} />
        <Route path="/history" element={<History />} />
        <Route path="/process" element={<Process />} />
        <Route path="/adddate" element={<Datepi countdownTimestampMs={1628454873000}/>} />
        <Route path="/carousel" element={<Carousels/>} />
        <Route path="/datapgnt" element={<DataPgnt/>} />
      </Routes>
    </LocalizationProvider>
  </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
