import { Link } from "react-router-dom"

export default function Header() {
  
  return (
    <>
      <h1>Mood Ring</h1>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/mood-memories'}>Mood Memories</Link>
          </li>
          <li>
            <Link to={'/mood-insights'}>Mood Insights</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}