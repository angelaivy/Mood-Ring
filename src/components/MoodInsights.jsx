import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import db from "../db";


export default function MoodInsights() {
  const [moods, setMoods] = useState([])
  const [topMood, setTopMood] = useState('')
  const moodCount = {
      '😀': 0,
      '😜': 0,
      '😐': 0,
      '😴': 0,
      '😢': 0,
      '😕': 0,
      '😡': 0,
    }
    
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

  useEffect(() => {
    for (const mood of moods) {
      switch(mood) {
        case '😀':
          moodCount['😀']++;
          break;
        case '😜':
          moodCount['😜']++;
          break;
        case '😐':
          moodCount['😐']++;
          break;
        case '😴':
          moodCount['😴']++;
          break;
        case '😢':
          moodCount['😢']++;
          break;
        case '😕':
          moodCount['😕']++;
          break;
        case '😡':
          moodCount['😡']++;
          break;
        default:
          return;
      }
    }

    // Convert moodCount into an array of pairs.
    const mostFrequentMood = Object.entries(moodCount)
      .reduce((max, current) => {
        // check if the current count is higher than the max count.
        return current[1] > max[1] ? current : max;
      });
    
    setTopMood(mostFrequentMood[0])
  }, [moodCount])

  return (
    <>
      <h2>Mood Insights</h2>
      <div>
        <h3>Most frequent Mood</h3>
        {topMood}
      </div>
     
     </>
    
  )
}