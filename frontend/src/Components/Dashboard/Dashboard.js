import React, { useEffect } from "react";
import { useGlobalContext } from "../../Context/GlobalContext";
import History from "../../History/History";
import { InnerLayout, MainLayout } from "../../Styles/Layouts";
import Chart from "../Chart/Chart";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  const name = localStorage.getItem("userName");

  useEffect(() => {
    if (name) {
      getIncomes();
      getExpenses();
    }
    // eslint-disable-next-line
  }, [incomes, expenses, name]);

  return (
    <div id="dashboard-container">
      {name ? (
        <MainLayout>
          <InnerLayout>
            <h1>All Transactions</h1>
            <div className="stats-con">
              <div className="chart-con">
                <Chart />
                <div className="amount-con">
                  <div className="income">
                    <h2>Total Income</h2>
                    <p>₹ {totalIncome()}</p>
                  </div>
                  <div className="expense">
                    <h2>Total Expense</h2>
                    <p>₹ {totalExpenses()}</p>
                  </div>
                  <div className="balance">
                    <h2>Total Balance</h2>
                    <p>₹ {totalBalance()}</p>
                  </div>
                </div>
              </div>
              <div className="history-con">
                <History />
                <h2 className="salary-title">
                  Min <span>Salary</span>Max
                </h2>
                <div className="salary-item">
                  <p>₹ {Math.min(...incomes.map((item) => item.amount))}</p>
                  <p>₹ {Math.max(...incomes.map((item) => item.amount))}</p>
                </div>
                <h2 className="salary-title">
                  Min <span>Expense</span>Max
                </h2>
                <div className="salary-item">
                  <p>₹ {Math.min(...expenses.map((item) => item.amount))}</p>
                  <p>₹ {Math.max(...expenses.map((item) => item.amount))}</p>
                </div>
              </div>
            </div>
          </InnerLayout>
        </MainLayout>
      ) : (
        <div id="welcome-container">
          <h1 className="welcome-title">Welcome to EXPENSE BUDDY</h1>
          <p className="welcome-text">Manage your incomes and expenses with ease.</p>
          <p className="welcome-text">Track your financial activities, view detailed reports, and maintain your budget effectively.</p>
          <p className="welcome-text"><Link to={"/login"}  style={{color:"orange", textDecoration:"none"}}>Log In</Link> or <Link to={"/signup"}  style={{color:"orange", textDecoration:"none"}}>Sign Up</Link> to get started!</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
