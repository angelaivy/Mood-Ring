import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../db";
import MoodCard from "./MoodCard";

export default function MoodMemories() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const moodLogsQuery = query(collection(db, 'mood-logs'), orderBy('timestamp', 'desc'));
    const getMoodLogs = onSnapshot(moodLogsQuery, (snapshot) => {
      const newEntries = [];
      snapshot.docs.forEach(doc => {
        newEntries.push({
         data: doc.data(),
         id: doc.id
        });
      })

      setEntries(newEntries);
    });

    return () => getMoodLogs()

  }, [])

  return (
    <>
      <h2>Mood Memories</h2>
      <ul>
        {entries.map((entry)=> {
          const date = entry.data.timestamp.toDate();
          const formattedDate = date.toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })
          return (
            <MoodCard 
              key={entry.id}
              date={formattedDate}  
              mood={entry.data.mood} 
              note={entry.data.note} 
            />
          )
        })}
      </ul>
     
    </>
    
  )
}



