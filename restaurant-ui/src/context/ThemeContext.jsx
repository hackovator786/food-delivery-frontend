import { createContext, useState } from "react";
import {createTheme} from '@mui/material';

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {
    const authTheme = createTheme({
        typography: {
            fontFamily: 'Inter, sans-serif',
            h4: {
                fontWeight: 700,
            },
        },
        palette: {
            primary: {
                main: '#E83B25',
            },
            secondary: {
                main: '#FFD700',
            },
            background: {
                default: '#F5F5F5',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '12px',
                        textTransform: 'none',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: '24px',
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
    });

    const otpTheme = createTheme({
        typography: {
            fontFamily: 'Inter, sans-serif',
            h4: {
                fontWeight: 700,
            },
        },
        palette: {
            primary: {
                main: '#E83B25',
            },
            secondary: {
                main: '#FFD700',
            },
            background: {
                default: '#F5F5F5',
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '12px',
                        textTransform: 'none',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: '24px',
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                    },
                },
            },
        },
    });

    return (
        <ThemeContext.Provider value={{authTheme, otpTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;