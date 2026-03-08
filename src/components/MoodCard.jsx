import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../db";
import { useState } from "react";
import GetUser from "./helpers/GetUser";

export default function MoodCard({id, date, mood, note, onEdit, isEditing}) {
  const user = GetUser();
  const [isDeleted, setIsDeleted] = useState(false);
  const onDelete = async () => {
    if (!user?.uid) return
    await deleteDoc(doc(db, 'users', user.uid, 'mood-logs', id));
    setIsDeleted(true);
  }

  return (
    <>
    { (!isEditing && !isDeleted) && <li id={id}>
        <h3>{date}</h3>
        <p>{mood}</p>
        {note && <p>{note}</p>}
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </li> }
    </>
  )
}