const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        if (!title || !amount || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (amount < 500 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount should be a positive number" });
        }

        const income = new IncomeSchema({
            title,
            amount,
            category,
            description,
            date
        });

        await income.save();
        res.status(200).json({ message: "Income successfully added" });
        console.log(income);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
};
