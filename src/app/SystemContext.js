import { createContext, useContext, useState } from 'react';

const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
    const [systemData, setSystemData] = useState(null);

    const updateSystemData = (data) => {
        setSystemData(data);
    };

    return (
        <SystemContext.Provider value={{ systemData, updateSystemData }}>
            {children}
        </SystemContext.Provider>
    );
};

export const useSystemData = () => {
    return useContext(SystemContext);
};
