import { useState} from "react"
import { collection, doc, addDoc, setDoc } from "firebase/firestore"
import { db } from "../../db";
import FormElement from "./FormElement";
import GetUser from "../helpers/GetUser"
import './MoodForm.css';

export default function MoodForm({type, id, rawDate, isFormVisible, formToggle}) {
  const [formData, setFormData] = useState({'mood': '', 'note': ''})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const user = GetUser();

  // Handle submit for both the edit form and home page form.
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const timestamp = new Date();

    if (type === 'addEntry') {
      if (!user?.uid) return
      await addDoc(collection(db, 'users', user.uid, 'mood-logs'), { 
        formData,
        timestamp,
      });
    }

    if (type === 'editEntry') {
      if (!user?.uid) return
      await setDoc(doc(db, 'users', user.uid, 'mood-logs', id), {
        formData,
        // Keep the original date of the entry.
        timestamp: rawDate,
      }); 
    }

    formToggle();
    setFormData({'mood': '', 'note': ''});
    setIsSubmitted(true);
    e.target.reset();
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const addAnotherMood = () => {
    formToggle();
    setIsSubmitted(false);
  }

  return (
    <div>
      {(!isSubmitted && isFormVisible) && 
      <form onSubmit={handleSubmit}>  
        <fieldset>
          <legend><h3>How are you feeling today?</h3></legend>
          <FormElement type='input' id='happy' value='😀' onChange={handleChange} />
          <FormElement type='input' id='excited' value='🤩' onChange={handleChange} />
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
      }

      {isSubmitted && type === 'addEntry' ? (
        <div className={'confirmation'}>
          <p>✨ Mood Saved ✨</p>
          <button onClick={() => addAnotherMood()}>Add another mood</button>
        </div>
      ) : '' }
    </div>
  )
}