import {createContext} from "react";

const RestaurantMenuContext = createContext({});

export const RestaurantMenuContextProvider = ({ children }) => {

    return (
        <RestaurantMenuContext.Provider value={
            {

            }
        }>
            {children}
        </RestaurantMenuContext.Provider>
    )
}

export default RestaurantMenuContext;