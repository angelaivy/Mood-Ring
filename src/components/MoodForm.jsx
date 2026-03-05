import { useState} from "react"
import { collection, doc, addDoc, setDoc } from "firebase/firestore"
import db from "../db";
import FormElement from "./FormElement";

export default function MoodForm({type, id, rawDate, isFormVisible, formToggle}) {
  const [formData, setFormData] = useState({'mood': '', 'note': ''})

  // Handle submit for both the edit form and home page form.
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const timestamp = new Date();

    if (type === 'addEntry') {
      await addDoc(collection(db, "mood-logs"), { 
        formData,
        timestamp,
      });
    }

    if (type === 'editEntry') {
      await setDoc(doc(db, 'mood-logs', id), {
        formData,
        // Keep the original date of the entry.
        timestamp: rawDate,
      }); 
    }
    formToggle();
    setFormData({'mood': '', 'note': ''});
    e.target.reset();
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const addAnotherMood = () => {
    formToggle();
  }

  return (
    <div>
      <form className={isFormVisible ? 'show' : 'hide'} onSubmit={handleSubmit}>
        <fieldset>
          <legend>How are you feeling today?</legend>
          <FormElement type='input' id='happy' value='😀' onChange={handleChange} />
          <FormElement type='input' id='silly' value='😜' onChange={handleChange} />
          <FormElement type='input' id='neutral' value='😐' onChange={handleChange} />
          <FormElement type='input' id='tired' value='😴' onChange={handleChange} />
          <FormElement type='input' id='sad' value='😢' onChange={handleChange} />
          <FormElement type='input' id='confused' value='😕' onChange={handleChange} />
          <FormElement type='input' id='angry' value='😡' onChange={handleChange} />
        </fieldset>

        <FormElement type='textarea' id='note' onChange={handleChange}/>
        <button type='submit'>Submit Mood</button>
      </form>

      {type === 'addEntry' ? (
        <div className={`confirmation ${isFormVisible ? 'hide' : 'show'}`}>
          <p>Mood Saved ✨</p>
          <button onClick={() => addAnotherMood()}>Add another mood</button>
        </div>
      ) : '' }
    </div>
  )
}