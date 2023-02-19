import {useState, createContext, useContext} from "react";

const SearchContext = createContext();

export const StateContext = ({children}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const updateQuery = (query) => {
        setSearchQuery(query)
    }

    return(
        <SearchContext.Provider value={{
            searchQuery,
            updateQuery
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useStateContext = () => useContext(SearchContext)