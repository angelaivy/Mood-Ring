import { doc, setDoc, deleteDoc } from "firebase/firestore";
import db from "../db";
import MoodForm from "./MoodForm";
import { useState } from "react";

export default function MoodCard({id, date, rawDate, mood, note}) {
  const [isEditing, setIsEditing] = useState(false)

  const editMood = async () => {
    setIsEditing(true)
    const newVal = window.prompt('Enter new mood');
    await setDoc(doc(db, 'mood-logs', id), {
      formData: {mood: mood, note: newVal},
      // Keep the original date of the entry.
      timestamp: rawDate,
    });
  }

  const deleteMood = async () => {
    await deleteDoc(doc(db, 'mood-logs', id));
  }

  return (
    <>
      <li>
        <h3>{date}</h3>
        <p>{mood}</p>
        {note ?? <p>{note}</p>}
        <button onClick={() => editMood()}>Edit</button>
        <button onClick={() => deleteMood()}>Delete</button>
      </li>
      
    </>
  )
}