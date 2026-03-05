import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import db from "../db";


export default function MoodInsights() {
  const [moods, setMoods] = useState([])
    
  useEffect(() => {
    const moodQuery = query(collection(db, 'mood-logs'), orderBy('timestamp', 'desc'));
    const getMoods = onSnapshot(moodQuery, (snapshot) => {
      const moodsArray = [];
      snapshot.docs.forEach(doc => {
        moodsArray.push(doc.data().formData.mood);
      })
      setMoods(moodsArray);
    });

    () => getMoods()
  }, [])

  const frequentMood = (moodsArray) => {
    if (!moodsArray) return;

    const moodMap = {
      '😀': 0,
      '😜': 0,
      '😐': 0,
      '😴': 0,
      '😢': 0,
      '😕': 0,
      '😡': 0,
    }

    for (const mood of moodsArray) {
      switch(mood) {
        case '😀':
          moodMap['😀']++;
          break;
        case '😜':
          moodMap['😜']++;
          break;
        case '😐':
          moodMap['😐']++;
          break;
        case '😴':
          moodMap['😴']++;
          break;
        case '😢':
          moodMap['😢']++;
          break;
        case '😕':
          moodMap['😕']++;
          break;
        case '😡':
          moodMap['😡']++;
          break;
        default:
          return;
      }
    }

    // Conver moodMap into an array of pairs.
    const mostFrequentMood = Object.entries(moodMap)
      .reduce((max, current) => {
        // check if the current count is higher than the max count.
        return current[1] > max[1] ? current : max;
      });
    
    return mostFrequentMood[0];
  }

  return (
    <>
      <h2>Mood Insights</h2>
      <div>
        <h3>Most frequent Mood</h3>
        {frequentMood(moods)}
      </div>
     
     </>
    
  )
}