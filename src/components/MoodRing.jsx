import MoodForm from "./MoodForm";
import { useState } from "react";

export default function MoodRing() {
  const [isFormVisible, setIsFormVisible] = useState(true);

  const todaysDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div>{todaysDate}</div>
      <MoodForm 
        type='addEntry' 
        isFormVisible={isFormVisible} 
        formToggle={() => setIsFormVisible(prev => !prev)} />
    </>
    
  )
}



