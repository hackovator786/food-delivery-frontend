import { createContext } from "react";
import {createTheme} from '@mui/material';

const ThemeContext = createContext({});

export const ThemeContextProvider = ({ children }) => {

    const PRIMARY_COLOR = '#E83B25';

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

    const homePageTheme = createTheme({
        palette: {
            primary: {
                main: PRIMARY_COLOR,
                light: '#EB6456',
                dark: '#B0291C',
                contrastText: '#ffffff',
            },
            background: {
                default: '#f8f8fa',
                paper: '#ffffff',
            },
        },
        typography: {
            fontFamily: 'Inter, Arial, sans-serif',
            h4: { fontWeight: 700 },
            h6: { fontWeight: 600 },
        },
        components: {
            MuiPaper: {
                defaultProps: {
                    elevation: 1,
                },
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 12,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: 'none',
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        borderRight: 'none',
                        backgroundColor: '#ffffff',
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#ffffff',
                        color: '#333',
                        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.05)',
                    }
                }
            }
        }
    });

    return (
        <ThemeContext.Provider value={{PRIMARY_COLOR, authTheme, otpTheme, homePageTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;