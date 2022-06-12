const data = {
  "LOCAL": {
    "CHAIN_ID": 1337,
    "RPC": "http://127.0.0.1:8545",
    "NATIVE_DECIMAL": '18',
    "STABLE_DECIMAL": '6',
  },
  "PROD": {
    "CHAIN_ID": 4,
    "RPC": "",
    "NATIVE_DECIMAL": '18',
    "STABLE_DECIMAL": '6',
  },
  apiUser: {
    getUser: {
      url: 'http://127.0.0.1:3002/user',
      method: 'GET'
    },
    addUser: {
      url: 'http://127.0.0.1:3002/user',
      method: 'POST'
    },
  }
}

export default data