import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../../db';
import GetUser from './GetUser'

// Get all data from the db. Includes moods, notes, timestamp, id.
export function GetAllMoodData() {
  const user = GetUser();
  const [moodLogs, setMoodLogs] = useState([])
  
  useEffect(() => {
    if (!user?.uid) return

    const moodLogsQuery = query(collection(db, 'users', user.uid, 'mood-logs'), orderBy('timestamp', 'desc'));
    const getMoodLogs = onSnapshot(moodLogsQuery, (snapshot) => {
      const moodLogsArray = [];
      snapshot.docs.forEach(doc => {
        moodLogsArray.push({
         data: doc.data(),
         id: doc.id
        });
      })
      setMoodLogs(moodLogsArray);
    });

    return () => getMoodLogs()
  }, [user])

  return moodLogs
}

// Get only the moods, no notes or timestamp.
export function GetMoodData() {
  const [moods, setMoods] = useState([])
  const moodDataObj = GetAllMoodData();
  useEffect(() => {
    let moodsArr = []
      for (const moodData of moodDataObj) {
        moodsArr.push(moodData.data.formData.mood);
      }
      setMoods(moodsArr);
  }, [moodDataObj])

  return moods;
}

// Get counts for each mood.
export function MoodCount() {
  const moods = GetMoodData();
  const [moodCount, setMoodCount] = useState({
    '😀': 0,
    '😜': 0,
    '😐': 0,
    '😴': 0,
    '😢': 0,
    '😕': 0,
    '😡': 0,
  })

  useEffect(() => {
    const newCount = {
      '😀': 0, '😜': 0, '😐': 0, '😴': 0, '😢': 0, '😕': 0, '😡': 0,
    };
    for (const mood of moods) {
      if (newCount[mood] !== undefined) {
        newCount[mood]++
      }
    }
    setMoodCount(newCount);
  }, [moods])

  return moodCount;
}

// Get counts of moods.
export function GetMoodCountsOnly() {
  const counts = MoodCount();
  return Object.values(counts);
}

// Get the most frequent mood symbol.
export function MostFrequentMood() {
  const count = MoodCount();
   // Convert count into an array of pairs.
  const mostFrequentMood = Object.entries(count)
    .reduce((max, current) => {
      // Check if the current count is higher than the max count.
      return current[1] > max[1] ? current : max;
    });

  return mostFrequentMood[0]
}