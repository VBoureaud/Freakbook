import { Button, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Web3Context from "../store/web3Context";
import Web2Context from "../store/web2Context";
import config from "../config.js";

import { calculateProof } from "../utils/snark";

export default function Home(props) {
  const {
      loading,
  } = useContext(Web3Context);

  const handleClick = async () => {
    const res = await calculateProof();
    console.log({ res });
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
      <h2>Hello Home</h2>
      <Button onClick={handleClick}>Click Me</Button>      
      {loading && (
        <Button type="primary" style={{ margin: 'auto' }} loading>
          Loading
        </Button>
      )}
    </div>
  );
}
