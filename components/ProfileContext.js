// ProfileContext.js
import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
    const [profData, setProfData] = useState({});

    return (
        <ProfileContext.Provider value={{ profData, setProfData }}>
            {children}
        </ProfileContext.Provider>
    );
};
