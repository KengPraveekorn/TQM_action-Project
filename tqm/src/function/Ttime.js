import React from "react";
import './Ttime.css';

function Ttime() {
// var Ttimes =require('./Ttimes.html');
  return (
    // <iframe src={Ttimes }></iframe>
    <div className="container">
      <div className="content">
        <div className="launch-time">
          <div>
            <p>00</p>
            <span>Days</span>
          </div>
          <div>
            <p>00</p>
            <span>Hours</span>
          </div>
          <div>
            <p>00</p>
            <span>Minutes</span>
          </div>
          <div>
            <p>00</p>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Ttime;
