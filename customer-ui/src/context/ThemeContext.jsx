import { createContext } from "react";
import {createTheme} from '@mui/material';

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {

    const PRIMARY_COLOR = '#E83B25';
    const authTheme = createTheme({
        palette: {
            primary: {
                main: PRIMARY_COLOR,
            }
        }
    });

    return (
        <ThemeContext.Provider value={{PRIMARY_COLOR, authTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;