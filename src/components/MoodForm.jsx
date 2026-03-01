import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import db from "../db";
import { Timestamp } from "firebase/firestore";
import FormElement from "./FormElement";

export default function MoodForm() {
  const [formData, setFormData] = useState({'mood': '', 'note': ''})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const timestamp = Timestamp.fromDate(date);

    await addDoc(collection(db, "mood-logs"), {
      formData,
      timestamp,
    });

    setFormData({'mood': '', 'note': ''});
    e.target.reset();
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
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
  )
}