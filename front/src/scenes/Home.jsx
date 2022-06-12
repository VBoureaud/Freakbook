import { Button, message, DatePicker, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Web3Context from "../store/web3Context";
import Web2Context from "../store/web2Context";
import config from "../config.js";

import { calculateAge } from "../utils";
import { calculateProof } from "../utils/snark";

const { Title } = Typography;

export default function Home(props) {
  const [date, setDate] = useState('1990-02-23');

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

  const handleClick = async () => {
    if (!account || !account.address) {
      message.error('You must be connected.');
      return false;
    }

    if (!date) message.error('Date is wrong or empty.');
    else {
      const dateYear = calculateAge(date);
      const res = await calculateProof(dateYear);
      console.log({ res });
      //await addUser({ name: account.address, data: dateSec });
      //await getUser(account.address);
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
      
      {account && user && <div style={{
        maxWidth: '450px',
        margin: 'auto',
      }}>
        <Title>Welcome {user.name}</Title>
      </div>}

      {account && !user && <div style={{
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

      {!loadingUser && !loading && !account && <div style={{
        maxWidth: '450px',
        margin: 'auto',
      }}>
        <Title>Welcome</Title>
        <Typography>Nisi dolor ad commodo excepteur fugiat reprehenderit occaecat magna et quis non culpa tempor anim mollit ad duis mollit cillum voluptate et sunt.</Typography>
      </div>}
      
      {(loadingUser || loading) && (
        <Button type="primary" style={{ margin: 'auto' }} loading>
          Loading
        </Button>
      )}
    </div>
  );
}
