import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../db"
import { useState } from "react"
import GetUser from "./helpers/GetUser"
import './MoodCard.css'

export default function MoodCard({id, date, mood, note, onEdit, isEditing}) {
  const user = GetUser()
  const [isDeleted, setIsDeleted] = useState(false)

  const onDelete = () => {
    if (!user?.uid) return

    const deleteData = async () => {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'mood-logs', id))
        setIsDeleted(true)
      } catch(e) {
        console.log('There was an error trying to delete the entry', e)
      }
    }

    deleteData()
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
    <>
    { (!isEditing && !isDeleted) && 
      <li id={id} className='card' style={{ borderLeftColor: moodColors[mood] }}>
        <h3>{date}</h3>
        <p className='mood'>{mood}</p>
        {note && <p className='note'>{note}</p>}
        <div className='cardBtns'>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </li> 
    }
    </>
  )
}