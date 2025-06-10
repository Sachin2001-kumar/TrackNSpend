import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

// ✅ Correct way to load env variable
const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
console.log("Loaded BASE_URL in production:", BASE_URL);


const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // ✅ Fetch Incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get-incomes`);
            if (response.headers['content-type']?.includes('application/json')) {
                setIncomes(response.data);
            } else {
                console.error('Invalid JSON response for incomes');
                setIncomes([]);
            }
        } catch (err) {
            console.error('Error fetching incomes:', err);
            setError(err.response?.data?.message || 'Error fetching incomes');
        }
    };

    // ✅ Fetch Expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get-expenses`);
            if (response.headers['content-type']?.includes('application/json')) {
                setExpenses(response.data);
            } else {
                console.error('Invalid JSON response for expenses');
                setExpenses([]);
            }
        } catch (err) {
            console.error('Error fetching expenses:', err);
            setError(err.response?.data?.message || 'Error fetching expenses');
        }
    };

    // ✅ Add Income
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}/add-income`, income);
            getIncomes();
        } catch (err) {
            console.error('Error adding income:', err);
            setError(err.response?.data?.message || 'Error adding income');
        }
    };

    // ✅ Delete Income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/delete-income/${id}`);
            getIncomes();
        } catch (err) {
            console.error('Error deleting income:', err);
            setError(err.response?.data?.message || 'Error deleting income');
        }
    };

    // ✅ Add Expense
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}/add-expense`, expense);
            getExpenses();
        } catch (err) {
            console.error('Error adding expense:', err);
            setError(err.response?.data?.message || 'Error adding expense');
        }
    };

    // ✅ Delete Expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/delete-expense/${id}`);
            getExpenses();
        } catch (err) {
            console.error('Error deleting expense:', err);
            setError(err.response?.data?.message || 'Error deleting expense');
        }
    };

    // ✅ Total Calculations
    const totalIncome = () => incomes.reduce((total, income) => total + (income.amount || 0), 0);
    const totalExpenses = () => expenses.reduce((total, expense) => total + (expense.amount || 0), 0);
    const totalBalance = () => totalIncome() - totalExpenses();

    // ✅ Recent Transactions
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        return history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
    };

    // ✅ Initial Fetch
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

export const useGlobalContext = () => useContext(GlobalContext);
