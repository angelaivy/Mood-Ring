import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import db from "../db";
import { Timestamp } from "firebase/firestore";

export default function MoodForm() {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const timestamp = Timestamp.fromDate(date);

    await addDoc(collection(db, "mood-logs"), {
      mood,
      note,
      timestamp,
    });

    setMood('')
    setNote('')
    e.target.reset();
  }

  const handleChange = (e) => {
    if (e.target.type === 'radio') {
      setMood(e.target.value);
    }
    if (e.target.type === 'textarea') {
      setNote(e.target.value);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>How are you feeling today?</legend>

          <div>
            <input 
              type='radio' 
              id='happy' 
              name='feelings' 
              value='😀'
              required 
              onChange={handleChange} />
            <label htmlFor='happy' aria-label='happy'>😀</label>
          </div>

          <div>
            <input 
              type='radio' 
              id='silly' 
              name='feelings' 
              value='😜'
              required 
              onChange={handleChange} />
            <label htmlFor='silly' aria-label='silly'>😜</label>
          </div>

          <div>
            <input 
              type='radio' 
              id='neutral' 
              name='feelings' 
              value='😐'
              required 
              onChange={handleChange} />
            <label htmlFor='neutral' aria-label='neutral'>😐</label>
          </div>

          <div>
            <input 
              type='radio' 
              id='sad' 
              name='feelings' 
              value='😢'
              required  
              onChange={handleChange} />
            <label htmlFor='sad' aria-label='sad'>😢</label>
          </div>

          <div>
            <input 
              type='radio' 
              id='confused' 
              name='feelings' 
              value='😕'
              required 
              onChange={handleChange} />
            <label htmlFor='confused' aria-label='confused'>😕</label>
          </div>

          <div>
            <input 
              type='radio' 
              id='angry' 
              name='feelings' 
              value='😡'
              required 
              onChange={handleChange} />
            <label htmlFor='angry' aria-label='angry'>😡</label>
          </div>
        </fieldset>

        <label htmlFor='note'>Note:</label>
        <textarea 
          id='note' 
          name='note' 
          rows='5' 
          onChange={handleChange}
          placeholder='Add the details...'></textarea>

        <button type='submit'>Submit Mood</button>
      </form>
    
    </>
  )
}