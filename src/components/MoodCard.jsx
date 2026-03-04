import { doc, deleteDoc } from "firebase/firestore";
import db from "../db";
import { useState } from "react";

export default function MoodCard({id, date, mood, note, onEdit, isEditing}) {
  const onDelete = async () => {
    await deleteDoc(doc(db, 'mood-logs', id));
  }

  return (
    <>
      <li id={id} className={isEditing ? 'hide' : 'show'}>
        <h3>{date}</h3>
        <p>{mood}</p>
        {note && <p>{note}</p>}
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </li>
    </>
  )
}