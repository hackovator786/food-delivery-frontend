import { createContext } from "react";
import {createTheme} from '@mui/material';

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {

    const PRIMARY_COLOR = '#E83B25';

    return (
        <ThemeContext.Provider value={{PRIMARY_COLOR}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;