import React, { useEffect, useState } from "react";
import Axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Stack from "@mui/material/Stack";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { getRemainingTimeUntilMsTimestamp } from "./Utils/CountdownTimerUtils";


function Datepi({countdownTimestampMs}) {
  const defaultRemainingTime ={
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
  }
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)
    useEffect(()=>{
      const intervalId = setInterval(()=>{
        updateRemainingTime(countdownTimestampMs)
      },1000)
      return () => clearTimeout(intervalId)
    },[countdownTimestampMs])
    
    function updateRemainingTime(countdown){
      setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown))
      //console.log("Hello World")
    }

  return (
    <div className="countdown-timer">
      <span>{remainingTime.days}</span>
      <span> days </span>
      <span>{remainingTime.hours}</span>
      <span> hours </span>
      <span>{remainingTime.minutes}</span>
      <span> minutes </span>
      <span>{remainingTime.seconds}</span>
      <span> seconds </span>
      
    </div>
  );
}

export default Datepi;
