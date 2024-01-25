import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import useGetUserInfo from "./useGetUserInfo";

const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions"); //refer to real collection,collection need to call "db" from firebase-config file
  const { userID } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      //create a object
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};

export default useAddTransaction;
