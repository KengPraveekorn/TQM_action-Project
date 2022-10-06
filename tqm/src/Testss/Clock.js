import React, { useEffect, useState } from "react";

function Clock() {
  const [clockState, setClockState] = useState();
  const [dateState, setDateState] = useState();

  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      setClockState(time.toLocaleTimeString());
      // setDateState(date.toDateString());
      //   console.log(date)
    }, 1000);
  }, []);

  // useEffect(()=>{
  //   const date = new Date();
  //   setDateState(date.toDateString());
  // }, []);

  return (
    <div
      style={{
        fontSize: "40px",
        marginTop: "20px",
        textAlign: "center",
        fontWeight: "600",
        color: "#2a5077",
      }}
    >
      {/* <div style={{fontFamily:"'Hanalei Fill', cursive"}}>{dateState}</div> */}
      <div style={{fontFamily:"'Hanalei Fill', cursive"}}>{clockState}</div>
    </div>
  );
}

export default Clock;
