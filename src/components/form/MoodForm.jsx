import { useState} from "react"
import { collection, doc, addDoc, setDoc } from "firebase/firestore"
import { db } from "../../db"
import FormElement from "./FormElement"
import GetUser from "../helpers/GetUser"
import './MoodForm.css'

/* 
  The form appears in two places: on the home page to add an entry,
  and on the mood memories page to edit an entry. The edit entry form
  is a modal, so it comes with modal styling and extra html which is
  conditionally shown in this component.
*/
export default function MoodForm({type, id, rawDate, date, isFormVisible, formToggle}) {
  const [formData, setFormData] = useState({'mood': '', 'note': ''})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [introFormText] = useState(
    type === 'editEntry' ? `Edit entry for ${date}` : 'How are you feeling today?'
  )
  const user = GetUser()

  // Handle submit for both the edit form and home page form.
  const handleSubmit = (e) => {
    e.preventDefault()
    const timestamp = new Date()

    if (type === 'addEntry') {
      if (!user?.uid) return

      const addData = async () => {
        try {
          await addDoc(collection(db, 'users', user.uid, 'mood-logs'), { 
            formData,
            timestamp,
          })
          setIsSubmitted(true)

        } catch (e) {
          console.error('There was an error adding an entry', e)
        }
      }

      addData()
    }

    if (type === 'editEntry') {
      if (!user?.uid) return

      const editData = async () => {
        try {
          await setDoc(doc(db, 'users', user.uid, 'mood-logs', id), {
            formData,
            // Keep the original date of the entry.
            timestamp: rawDate,
          })
        } catch(e) {
          console.log('There was an error editing the entry', e)
        }
      }
      
      editData()
    }

    formToggle()
    setFormData({'mood': '', 'note': ''})
    e.target.reset()
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addAnotherMood = () => {
    formToggle()
    setIsSubmitted(false)
  }

  if (isFormVisible && type === 'editEntry') {
    document.querySelector('.overlay').classList.remove('hide')
  }

  const closeModal = () => {
    formToggle()
    document.querySelector('.overlay').classList.add('hide')
  }

  return (
    <>
      { // Set form visibility based on editing or submitted state.
      (!isSubmitted && isFormVisible) && 
        <div aria-modal={(type === 'editEntry') ? true : false} className={(type === 'editEntry') ? 'modal' : ''}>
          {// Only show the close button if it's the edit form modal.
            (type === 'editEntry') && 
            <>
              <button className='closeModal' onClick={() => closeModal()}>Close Modal</button>
              <span className='spanWrapper'>
                <span className='bm-cross right'></span>
                <span className='bm-cross left'></span>
              </span>
            </>
          }
        <form onSubmit={handleSubmit}>  
          <fieldset>
            <legend><h3>{introFormText}</h3></legend>
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
      </div>
      }

      {isSubmitted && type === 'addEntry' ? (
        <div className={'confirmation'}>
          <p>✨ Mood Saved ✨</p>
          <button onClick={() => addAnotherMood()}>Add another mood</button>
        </div>
      ) : '' }
    </>
  )
}