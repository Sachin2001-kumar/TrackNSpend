import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Fetch incomes and handle errors
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            if (response.headers['content-type'].includes('application/json')) {
                setIncomes(response.data);
            } else {
                console.error('Incomes data is not JSON:', response.data);
                setIncomes([]);
            }
        } catch (err) {
            console.error('Error fetching incomes:', err);
            setError(err.response?.data?.message || 'Error fetching incomes');
        }
    };

    // Fetch expenses and handle errors
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            if (response.headers['content-type'].includes('application/json')) {
                setExpenses(response.data);
            } else {
                console.error('Expenses data is not JSON:', response.data);
                setExpenses([]);
            }
        } catch (err) {
            console.error('Error fetching expenses:', err);
            setError(err.response?.data?.message || 'Error fetching expenses');
        }
    };

    // Calculate total income
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + (income.amount || 0), 0);
    };

    // Calculate total expenses
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + (expense.amount || 0), 0);
    };

    // Calculate total balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Get transaction history
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    // Add an income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            getIncomes();
        } catch (err) {
            console.error('Error adding income:', err);
            setError(err.response?.data?.message || 'Error adding income');
        }
    };

    // Delete an income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncomes();
        } catch (err) {
            console.error('Error deleting income:', err);
            setError(err.response?.data?.message || 'Error deleting income');
        }
    };

    // Add an expense
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            getExpenses();
        } catch (err) {
            console.error('Error adding expense:', err);
            setError(err.response?.data?.message || 'Error adding expense');
        }
    };

    // Delete an expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            console.error('Error deleting expense:', err);
            setError(err.response?.data?.message || 'Error deleting expense');
        }
    };

    // Fetch initial data
    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
