import { createContext, useCallback, useContext, useRef, useState } from 'react';

const MenuOpenContext = createContext(null);

export function MenuOpenProvider({ children }) {
    const [openCount, setOpenCount] = useState(0);

    const register   = useCallback((isOpen) => {
        setOpenCount(n => isOpen ? n + 1 : Math.max(0, n - 1));
    }, []);

    return (
        <MenuOpenContext.Provider value={{ anyOpen: openCount > 0, register }}>
            {children}
        </MenuOpenContext.Provider>
    );
}

export function useMenuOpen() {
    return useContext(MenuOpenContext);
}
