const prisma = require("../services/prisma");

exports.addIncome = async (req, res) => {
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

    const income = await prisma.income.create({
      data: {
        title,
        amount,
        category,
        description,
        date: new Date(date),
      },
    });

    res.status(200).json({ message: "Income successfully added", income });
    console.log(income);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await prisma.income.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(incomes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.income.delete({ where: { id } });
    res.status(200).json({ message: "Income Deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
};
