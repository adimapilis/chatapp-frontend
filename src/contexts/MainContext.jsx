import React, {useState} from "react"

const MainContext = React.createContext();

function MainContextProvider({children}) {
    const [accessToken, setAccessToken] = useState('');
    const [currUser, setCurrUser] = useState('');
    const [users, setUsers] = useState([]);

    return (
        <MainContext.Provider value={{accessToken, setAccessToken, currUser, setCurrUser, users, setUsers}}>
            {children}
        </MainContext.Provider>
    )
}

export {MainContextProvider, MainContext}