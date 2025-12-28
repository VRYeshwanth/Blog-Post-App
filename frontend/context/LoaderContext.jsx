import { createContext, useState, useContext } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const hideLoader = () => setIsLoading(false);
    const showLoader = () => setIsLoading(true);

    return (
        <LoaderContext.Provider value={{ isLoading, hideLoader, showLoader }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
