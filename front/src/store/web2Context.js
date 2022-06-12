import React, {useState} from "react";

import config from "../config.js";

const Web2Context = React.createContext({
    loadingUser: false,
    //errorUser: false,
    user: null,

    getUser: () => {},
    addUser: () => {},
});

export const Web2ContextProvider = (props) => {
    const [loadingUser, setLoadingUser] = useState(false);
    //const [errorUser, setErrorUser] = useState(false);
    const [user, setUser] = useState(null);

	const getUser = async (name) => {
		setLoadingUser(true);
		let response = await fetch(
			config.apiUser.getUser.url + '/' + name,
			{
				method: config.apiUser.getUser.method,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			},
		);
		const data = await response.text();
    	const jsonData = JSON.parse(data);
    	if (jsonData && jsonData.name)
    		setUser(jsonData);
		setLoadingUser(false);
    }

	const addUser = async (data) => {
		setLoadingUser(true);
		let response = await fetch(
			config.apiUser.addUser.url,
			{
				method: config.apiUser.addUser.method,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
			},
		);
		const res = await response.text();
    	const jsonData = JSON.parse(res);
    	if (jsonData)
    		setUser(jsonData);
		setLoadingUser(false);
    }

    return (
        <Web2Context.Provider
            value={{
                loadingUser,
                //errorUser,
                user,
                getUser,
                addUser,
            }}>
            {props.children}
        </Web2Context.Provider>
    )
}

export default Web2Context;