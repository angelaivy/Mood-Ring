import { useState, useEffect } from "react"
import { collection, addDoc } from "firebase/firestore"
import db from "../db";
import FormElement from "./FormElement";

export default function MoodForm() {
  const [formData, setFormData] = useState({'mood': '', 'note': ''})
  const [isSubmitted, setIsSubmitted] = useState(true)  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date();

    await addDoc(collection(db, "mood-logs"), { 
      formData,
      timestamp,
    });

    setFormData({'mood': '', 'note': ''});
    e.target.reset();
    setIsSubmitted(true);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const addAnotherMood = () => {
    setIsSubmitted(false);
  }

  return (
    <>
      <form className={`${isSubmitted ? 'hide' : 'show'}`} onSubmit={handleSubmit}>
        <fieldset>
          <legend>How are you feeling today?</legend>
          <FormElement type='input' id='happy' value='😀' onChange={handleChange} />
          <FormElement type='input' id='silly' value='😜' onChange={handleChange} />
          <FormElement type='input' id='neutral' value='😐' onChange={handleChange} />
          <FormElement type='input' id='sad' value='😢' onChange={handleChange} />
          <FormElement type='input' id='confused' value='😕' onChange={handleChange} />
          <FormElement type='input' id='angry' value='😡' onChange={handleChange} />
        </fieldset>

        <FormElement type='textarea' id='note' onChange={handleChange}/>
        <button type='submit'>Submit Mood</button>
      </form>

      <div className={`confirmation ${isSubmitted ? 'show' : 'hide'}`}>
        <p>Mood Saved ✨</p>
        <button onClick={() => addAnotherMood()}>Add another mood</button>
      </div>
    </>
  )
}