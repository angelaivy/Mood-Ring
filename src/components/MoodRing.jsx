import MoodForm from "./MoodForm";

export default function MoodRing() {
  const todaysDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div>{todaysDate}</div>
      <MoodForm />
    </>
    
  )
}



