import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import "./App.css";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Tasks from "./components/Tasks";
import InputTask from "./components/InputTask";
import Messaging from "./components/Messaging";
function App() {
  const [tasks, setTasks] = useState([]);
  const [fcmToken, setFcmToken] = useState("");
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (collection) => {
      const tasks = collection.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setTasks(tasks);
      console.log(tasks);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="App">
      <h1>Firebase Todo list!</h1>
      <InputTask fcmToken={fcmToken} />
      <Tasks tasks={tasks} />
      <Messaging setFcmToken={setFcmToken} />
    </div>
  );
}

export default App;
