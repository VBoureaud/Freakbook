import { Button, message, DatePicker, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Web3Context from "../store/web3Context";
import Web2Context from "../store/web2Context";
import config from "../config.js";

import { calculateAge } from "../utils";
import { calculateProof, verifyProof } from "../utils/snark";

const { Title } = Typography;

export default function Home(props) {
  const [date, setDate] = useState('1990-02-23');
  const [loadingSnark, setLoadingSnark] = useState(false);
  const [proof, setProof] = useState(null);
  const [publicSignals, setPublicSignals] = useState(null);

  const {
      loading,
      account,
  } = useContext(Web3Context);

  const {
      loadingUser,
      errorUser,
      user,
      getUser,
      addUser,
  } = useContext(Web2Context);

  useEffect(() => {
    if (account && account.address) {
      getUser(account.address);
    }
  }, [account]);

  const handleVerify = async () => {
    if (proof && publicSignals) {
      setLoadingSnark(true);
      const res = await verifyProof(proof, publicSignals);
      if (res) message.success('You are an adult!');
      else message.error('You are not an adult!');
      setLoadingSnark(false);
    }
  }

  const handleClick = async () => {
    if (!account || !account.address) {
      message.error('You must be connected.');
      return false;
    }

    if (!date) message.error('Date is wrong or empty.');
    else {
      setLoadingSnark(true);
      const dateYear = calculateAge(date);
      const res = await calculateProof(dateYear);
      console.log({ res });
      setProof(res.proof);
      setPublicSignals(res.publicSignals);
      //await addUser({ name: account.address, data: dateSec });
      //await getUser(account.address);
      setLoadingSnark(false);
    }

    return true;
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
      {account && proof && !loadingSnark && <div style={{
        maxWidth: '450px',
        margin: 'auto',
      }}>
        <Title>Welcome</Title>
        <Button onClick={handleVerify}>Are you an adult ?</Button>
      </div>}

      {account && !proof && !loadingSnark && <div style={{
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
      </div>}

      {!loadingSnark 
        && !loadingUser
        && !loading
        && !account
        && <div style={{
        maxWidth: '450px',
        margin: 'auto',
      }}>
        <Title>Welcome</Title>
        <Typography>Welcome to the FreakBook - FreakBook helps you share the right pieces of information trustlessly without leaking all your data to the outside world.</Typography>
      </div>}
      
      {(loadingUser || loading || loadingSnark) && (
        <Button type="primary" style={{ margin: 'auto' }} loading>
          Loading
        </Button>
      )}
    </div>
  );
}
