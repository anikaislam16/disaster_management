const { Parser } = require("json2csv");
const ExcelJS = require("exceljs");
const db = require("../../db/db");

// Function to generate Daily Donations CSV
function generateDailyDonationsCSV(callback) {
  const query = `
    SELECT DATE(date) AS date, SUM(amount) AS total_donations
    FROM donationMoney 
    GROUP BY DATE(date);
  `;

  db.query(query, (error, donations) => {
    if (error) {
      return callback(new Error("Error querying donations: " + error.message));
    }
    if (!donations.length) {
      return callback(new Error("No donation data found"));
    }

    const csvFields = ["date", "total_donations"];
    const json2csvParser = new Parser({ fields: csvFields });
    const csv = json2csvParser.parse(donations);
    callback(null, csv);
  });
}

// Function to generate Daily Expenses CSV
function generateDailyExpensesCSV(callback) {
  const query = `
    SELECT DATE(date) AS date, SUM(cost) AS total_expenses
    FROM purchase
    GROUP BY DATE(date);
  `;

  db.query(query, (error, expenses) => {
    if (error) {
      return callback(new Error("Error querying expenses: " + error.message));
    }
    if (!expenses.length) {
      return callback(new Error("No expense data found"));
    }

    const csvFields = ["date", "total_expenses"];
    const json2csvParser = new Parser({ fields: csvFields });
    const csv = json2csvParser.parse(expenses);
    callback(null, csv);
  });
}

// Function to generate Daily Donations Excel
function generateDailyDonationsExcel(res, callback) {
  const query = `
    SELECT DATE(date) AS date, SUM(amount) AS total_donations
    FROM donationMoney 
    GROUP BY DATE(date);
  `;

  db.query(query, (error, donations) => {
    if (error) {
      return callback(new Error("Error querying donations: " + error.message));
    }
    if (!donations.length) {
      return callback(new Error("No donation data found"));
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Daily Donations Report");

    worksheet.columns = [
      { header: "Date", key: "date" },
      { header: "Total Donations", key: "total_donations" },
    ];

    worksheet.addRows(donations);

    res.header(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.attachment("daily_donations_report.xlsx");

    workbook.xlsx
      .write(res)
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(new Error("Error writing Excel file: " + err.message));
      });
  });
}

// Function to generate Daily Expenses Excel
function generateDailyExpensesExcel(res, callback) {
  const query = `
    SELECT DATE(date) AS date, SUM(cost) AS total_expenses
    FROM purchase
    GROUP BY DATE(date);
  `;

  db.query(query, (error, expenses) => {
    if (error) {
      return callback(new Error("Error querying expenses: " + error.message));
    }
    if (!expenses.length) {
      return callback(new Error("No expense data found"));
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Daily Expenses Report");

    worksheet.columns = [
      { header: "Date", key: "date" },
      { header: "Total Expenses", key: "total_expenses" },
    ];

    worksheet.addRows(expenses);

    res.header(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.attachment("daily_expenses_report.xlsx");

    workbook.xlsx
      .write(res)
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(new Error("Error writing Excel file: " + err.message));
      });
  });
}

module.exports = {
  generateDailyDonationsCSV,
  generateDailyExpensesCSV,
  generateDailyDonationsExcel,
  generateDailyExpensesExcel,
};
