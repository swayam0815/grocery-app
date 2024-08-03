"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  sum,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
export default function Home() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ name: "", price: "" });
  const [search, setSearch] = useState("");

  const [total, setTotal] = useState(0);

  // read, write, delete from firestore

  const addItem = async (e) => {
    e.preventDefault();
    if (item.price !== "" && item.name !== "") {
      await addDoc(collection(db, "items"), {
        name: item.name,
        price: item.price,
      });
      setItems([...items, item]);
      setItem({ name: "", price: "" });
    }
  };

  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      const calTotal = () => {
        const total = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(total);
      };
      calTotal();
      return () => unsubscribe;
    });
  }, []);
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };
  return (
    <main className="bg-black flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 text-white transition-all duration-300">
      <div className="z-10 w-full max-w-5xl flex flex-col items-center justify-center font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg flex flex-col gap-4">
          <form className="grid grid-cols-6 items-center text-black border-2 border-slate-600 rounded-xl ">
            <input
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              type="text"
              placeholder="Enter Item"
              className="col-span-3 bg-slate-900 text-white h-full rounded-l-xl px-3 outline-none active:border-2 active:border-teal-200 focus:border-2 focus:border-teal-200"
            />
            <input
              value={item.price}
              onChange={(e) => setItem({ ...item, price: e.target.value })}
              type="number"
              placeholder="Enter $"
              className="col-span-2  h-full bg-slate-900 text-white border-r-2 border-l-2 border-l-slate-600 border-r-slate-600 px-3  outline-none active:border-teal-200 focus:border-2 focus:border-teal-200"
            />
            <button
              type="submit"
              onClick={addItem}
              className="text-white rounded-l-none bg-slate-950 hover:bg-slate-500 p-3 text-xl rounded-xl outline-none active:border-2 "
            >
              +
            </button>
          </form>
          <form className="bg-teal-500 flex w-full items-center justify-between rounded-xl ">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for a specific item"
              className="p-3 w-full border-black border-4 flex justify-center items-center rounded-xl outline-none text-black"
            />
          </form>
          <ul className="border-t-4 border-t-slate-600 pt-4 rounded">
            {items.map(
              (item, index) =>
                item.name.toLowerCase().includes(search.toLowerCase()) && (
                  <li
                    key={index}
                    className=" w-full flex justify-between border-2 rounded-xl border-slate-600 "
                  >
                    <div className="  w-full grid grid-cols-6   items-center  justify-between ">
                      <div className="col-span-5 flex items-center justify-between border-slate-700 bg-slate-900  rounded-xl rounded-r-none  h-max">
                        <span className="p-3 capitalize ">{item.name}</span>
                        <span className="p-3 mx-3">${item.price}</span>
                      </div>

                      <button
                        onClick={() => deleteItem(item.id)}
                        className="col-span-1 rounded-r-xl border-l-2 border-l-slate-600 bg-slate-950 hover:bg-slate-500 text-white  p-3"
                      >
                        X
                      </button>
                    </div>
                  </li>
                )
            )}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="w-full px-3 text-xl justify-between flex">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
