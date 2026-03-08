import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../db";
import { useState } from "react";
import GetUser from "./helpers/GetUser";
import './MoodCard.css'

export default function MoodCard({id, date, mood, note, onEdit, onClose, isEditing}) {
  const user = GetUser();
  const [isDeleted, setIsDeleted] = useState(false);

  const onDelete = async () => {
    if (!user?.uid) return
    await deleteDoc(doc(db, 'users', user.uid, 'mood-logs', id));
    setIsDeleted(true);
  }

  const moodColors = {
    '😀': 'var(--mood-happy)',
    '🤩': 'var(--mood-excited)',
    '😜': 'var(--mood-silly)',
    '😐': 'var(--mood-neutral)',
    '😴': 'var(--mood-sleepy)',
    '😢': 'var(--mood-sad)',
    '😕': 'var(--mood-confused)',
    '😡': 'var(--mood-angry)',
  }

  return (
    <div>
    { (!isEditing && !isDeleted) && 
      <div className='card' style={{ borderLeftColor: moodColors[mood] }}>
        <li id={id}>
          <h3>{date}</h3>
          <p className='mood'>{mood}</p>
          {note && <p className='note'>{note}</p>}
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </li> 
      </div>
    }
    </div>
  )
}