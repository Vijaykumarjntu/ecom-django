import React, { createContext, useContext, useState } from 'react';
import { menuService } from '../services/menuService';

// Create Context
const MenuContext = createContext();

// Custom hook (so you don't import useContext + MenuContext everywhere)
export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within MenuProvider');
    }
    return context;
};

// Provider component
export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // These functions will do API calls in Step 4
    // For now, just placeholders
    const fetchMenuItems = async() => {
        setLoading(true);
        try {
            const data = await menuService.getAll();
            setMenuItems(data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    const addMenuItem = (item) => {
        console.log('Will add item:', item);
    };

    const value = {
        menuItems,
        loading,
        fetchMenuItems,
        addMenuItem,
    };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
};