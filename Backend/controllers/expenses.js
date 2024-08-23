const ExpenseSchema = require("../models/ExpensesModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (amount < 500 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount should be a positive number" });
        }

        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date
        });

        await expense.save();
        res.status(200).json({ message: "Expense successfully added" });
        console.log(expense);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
};
