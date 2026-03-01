import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../db";
import MoodCard from "./MoodCard";

export default function MoodMemories() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
  
    const test = onSnapshot(collection(db, 'mood-logs'), (snapshot) => {
      const newEntries = [];
      snapshot.docs.forEach(doc => {
        newEntries.push({
         data: doc.data(),
         id: doc.id
        });
      })

      setEntries(newEntries);
    });

    return () => test

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



