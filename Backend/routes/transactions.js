const router = require('express').Router();
const { addExpense, getExpense, deleteExpense } = require('../controllers/expenses');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

// Income Routes
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete-income', deleteIncome);

// Expense Routes
router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpense);
router.delete('/delete-expense', deleteExpense);

module.exports = router;
