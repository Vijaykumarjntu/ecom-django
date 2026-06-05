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
    const fetchMenuItems = async(filters = {}) => {
        setLoading(true);
        try {
            const data = await menuService.getAll(filters);
            console.log("this is the data of the fetch call");
            console.log(data);
            setMenuItems(data.results);
            console.log("these are the results");
            console.log(data.results);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    // const searchMenuItems = async (query) => {
    //     setLoading(true);
    //     try {
    //         const data = await menuService.search(query);
    //         setMenuItems(data.results);
    //     } catch (error) {
    //         console.error('Search failed:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const addMenuItem = async (item) => {
        try {
            const newItem = await menuService.create(item);
            setMenuItems([...menuItems, newItem]);
            return newItem;
        } catch (error) {
            console.error('Failed to add item:', error);
            throw error;
        }
    };
    
    // const addMenuItem = (item) => {
    //     console.log('Will add item:', item);
    // };
    const updateMenuItem = async (id, updatedData) => {
        setLoading(true);
        try {
            const updated = await menuService.update(id, updatedData);
            setMenuItems(menuItems.map(item => 
            item.id === id ? updated : item
            ));
            return updated;
        } catch (error) {
            console.error('Failed to update:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteMenuItem = async (id) => {
        setLoading(true);
        try {
            await menuService.delete(id);
            setMenuItems(menuItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to delete:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        menuItems,
        loading,
        fetchMenuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem
        // searchMenuItems
    };

    return (
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    );
};