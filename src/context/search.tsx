import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
    value: "",
    update: (term: string) => { },
});

export function useSearch() {
    return useContext(SearchContext);
}

export function SearchProvider({ children }: any) {
    const [search, setSearch] = useState("");

    function updateSearch(term: string) {
        setSearch(term);
    }

    return (
        <SearchContext.Provider value={{ value: search, update: updateSearch }}>
            {children}
        </SearchContext.Provider>
    )
}
