const prisma = require("../services/prisma");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  try {
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (amount < 500 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount should be a positive number" });
    }

    const expense = await prisma.expense.create({
      data: { title, amount, category, description, date: new Date(date) },
    });

    res.status(200).json({ message: "Expense successfully added", expense });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(expenses);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await prisma.expense.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "Expense Deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};
