import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import {Bar} from 'react-chartjs-2';

function TrackSpending() {
  const [details, setDetails] = useState({
    email: "",
  });
  async function track() {
    const sendUserEmail = await axios.post(
      "http://localhost:3001/clientFlightBack"
    );
    details.email = sendUserEmail.data;
    console.log("trackEmail", details.email);
    const trackMoney = await axios.post("http://localhost:3001/money", details);
    // let money = trackMoney.data;
    // let x = ['month1','month2','month3','month4','month5','month6'];
    // let y = [trackMoney.data[0],trackMoney.data[1],trackMoney.data[2],trackMoney.data[3],trackMoney.data[4],trackMoney.data[5]];
    // let myChart = new Chart(document.getElementById("myChart"),{
    //   type:"bar",
    //   data:{
    //     lables:x,
    //     datasets:[{
    //     data: "your payment"
    //   }]
    //   },

    // options:{
    //   legend:{display:false},
    //   title:{
    //     display:true,
    //     text:"your result"
    //   }
    //   }
    // });
    // var data=[
    //   {
    //     type:'bar',
    //     data:data,
    //     x:['month1','month2','month3','month4','month5','month6'],
    //     y:[trackMoney.data[0],trackMoney.data[1],trackMoney.data[2],trackMoney.data[3],trackMoney.data[4],trackMoney.data[5]],
    //     type:'bar'
    //   }
    // ];
  }

  // track();
  return (
    <div className="card">
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>

      <script type="text/javascript" src="jscript/graph.js"></script>
      <script src="/js/app.js"></script> */}

      <h1>Track spending</h1>
      {/* <canvas id="myChart" style="width:100%;max-width:600px"></canvas> */}
      <div className="actions">
        <Link to="/clienthome">
          <button className="btn">Go to client home</button>
        </Link>
      </div>
    </div>
  );
}

export default TrackSpending;
