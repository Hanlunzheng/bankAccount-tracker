// import React, { useState } from "react";
// import useAddTransaction from "../../hooks/useAddTransaction";

// import useGetTransactions from "../../hooks/useGetTransactions";

// const Home = () => {
//   const [descrption, setDescrption] = useState("");
//   const [transactionAmount, setTransactionAmount] = useState(0);
//   const [transactionType, setTransactionType] = useState("expense");
//   const { addTransaction } = useAddTransaction();

//   const { transactions } = useGetTransactions();

//   const onSubmit = (e) => {
//     e.preventDefault();
//     addTransaction({
//       descrption,
//       transactionAmount,
//       transactionType,
//     });
//   };

//   return (
//     <>
//       <div className="home">
//         <div className="container">
//           <h1>Expense Tracker</h1>
//           <div className="balance">
//             <h3>Your balance</h3>
//             <h2>$0.00</h2>
//           </div>
//           <div className="summary">
//             <div className="income">
//               <h4>Income</h4>
//               <p>$0.00</p>
//             </div>
//           </div>
//           <div className="expenses">
//             <h4>Expense</h4>
//             <p>$0.00</p>
//           </div>
//           <form action="" onSubmit={onSubmit} className="add-transaction">
//             <input
//               type="text"
//               placeholder="descrption"
//               onChange={(e) => setDescrption(e.target.value)}
//               required
//             />
//             <input
//               type="number"
//               placeholder="Amount"
//               onChange={(e) => setTransactionAmount(e.target.value)}
//               required
//             />
//             <input
//               type="radio"
//               id="expense"
//               value="expense"
//               checked={transactionType === "expense"}
//               onChange={(e) => setTransactionType(e.target.value)}
//             />
//             <label htmlFor="expense">Expense</label>
//             <input
//               type="radio"
//               id="income"
//               value="income"
//               checked={transactionType === "income"}
//               onChange={(e) => setTransactionType(e.target.value)}
//             />
//             <label htmlFor="income">Income</label>

//             <button type="submit">Add transaction</button>
//           </form>
//         </div>
//       </div>
//       <div className="transactions">
//         <h3>Transactions</h3>

//         <h3>Transaction:</h3>
//         <ul>
//           {transactions.map((transaction) => {
//             const { description, transactionAmount, transactionType } =
//               transaction;
//             return (
//               <li>
//                 <h4> {description} </h4>
//                 <p>
//                   ${transactionAmount} •{" "}
//                   <label
//                     style={{
//                       color: transactionType === "expense" ? "red" : "green",
//                     }}
//                   >
//                     {" "}
//                     {transactionType}{" "}
//                   </label>
//                 </p>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Home;

import { useState } from "react";
import { signOut } from "firebase/auth";
import useAddTransaction from "../../hooks/useAddTransaction";
import useGetTransactions from "../../hooks/useGetTransactions";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { auth } from "../../config/firebase-config";

const Home = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}'s BankAccount Tracker</h1>
          <div className="balance">
            <h3> Your Balance</h3>
            {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4> Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4> Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Item Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense"> Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income"> Income</label>

            <button type="submit"> Add Transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto} />
            <div className="button-style">
              <button className="sign-out-button" onClick={signUserOut}>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3> Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li>
                <h4> {description} </h4>
                <p>
                  ${transactionAmount} from
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
