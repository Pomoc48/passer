import { createContext, useContext, useState } from "react";

const KeyContext = createContext({
    key: null as CryptoKey | null,
    update: (key: CryptoKey | null) => { },
});

export function useCryptoKey() {
    return useContext(KeyContext);
}

export function KeyProvider({ children }: any) {
    const [key, setKey] = useState<CryptoKey | null>(null);

    function updateKey(key: CryptoKey | null) {
        setKey(key);
    }

    return (
        <KeyContext.Provider value={{ key: key, update: updateKey }}>
            {children}
        </KeyContext.Provider>
    )
}
