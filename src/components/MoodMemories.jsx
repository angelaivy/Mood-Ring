import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../db"
import MoodCard from "./MoodCard"
import MoodForm from "./form/MoodForm"
import React from "react"
import GetUser from "./helpers/GetUser"
import Loading from "./Loading"

export default function MoodMemories() {
  const [entries, setEntries] = useState([])
  const [editingId, setEditingId] = useState(null)
  const user = GetUser()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) return
    
    const moodLogsQuery = query(collection(db, 'users', user.uid, 'mood-logs'), orderBy('timestamp', 'desc'))
    const getMoodLogs = onSnapshot(moodLogsQuery, (snapshot) => {
      const newEntries = []
      snapshot.docs.forEach(doc => {
        newEntries.push({
         data: doc.data(),
         id: doc.id
        })
      })
      setEntries(newEntries)
      setIsLoading(false)
    })

    return () => getMoodLogs()
  }, [user])

  // Set loading spinner.
  if (isLoading) return <Loading />
  
  return (
    <>
      <h2>Mood Memories</h2>
      {(!entries.length) && <p>Go to the <a href='/'>home page</a> to log your first mood! Your moods will show here.</p>}
      <div className='overlay hide'></div>
      <ul className="cardList">
        {entries.map((entry) => {
          const date = entry.data.timestamp.toDate()
          const formattedDate = date.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })

          return (
            <React.Fragment key={entry.id}>
              <MoodCard 
                key={entry.id}
                id={entry.id}
                date={formattedDate}
                mood={entry.data.formData.mood} 
                note={entry.data.formData.note}
                isEditing={editingId === entry.id}
                onEdit={() => setEditingId(entry.id)}
              />
              <MoodForm 
                key={`mood_${entry.id}`}
                type='editEntry' 
                id={entry.id} 
                date={formattedDate}
                rawDate={entry.data.timestamp}
                isFormVisible={editingId === entry.id}
                formToggle={() => setEditingId(null)}
              />
            </React.Fragment>
          )
        })}
      </ul>
     </>
    
  )
}



