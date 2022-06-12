import { Button, message, DatePicker, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Web3Context from "../store/web3Context";
import Web2Context from "../store/web2Context";
import config from "../config.js";

import { dateToSeconds } from "../utils";
import { calculateProof } from "../utils/snark";

const { Title } = Typography;

export default function Home(props) {
  const [date, setDate] = useState(null);

  const {
      loading,
  } = useContext(Web3Context);

  const handleClick = async () => {
    console.log({ date });
    if (!date) message.error('Date is wrong or empty.');
    else {
      const dateSec = dateToSeconds(date);
      console.log({ dateSec });
      const res = await calculateProof(dateSec);
      console.log({ res });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: '70vh',
      }}
    >
      
      <div style={{
        maxWidth: '450px',
        margin: 'auto',
      }}>
        <Title>What's your birthdate ?</Title>
        <div style={{
          display: 'flex'
        }}>
          <DatePicker
            /*disabledDate={(current) => current && current < moment.today()}*/
            onChange={(date, dateString) => setDate(dateString)}
            style={{ flex: 3 }}
          />
          <Button type='primary' style={{ flex: 1 }} onClick={handleClick}>Confirm</Button>   
        </div>
      </div>
      
      {loading && (
        <Button type="primary" style={{ margin: 'auto' }} loading>
          Loading
        </Button>
      )}
    </div>
  );
}
