export default function MoodCard({date, mood, note}) {
  return (
    <li>
      <h3>{date}</h3>
      <p>{mood}</p>
      {note ?? <p>{note}</p>}
    </li>
  )
}