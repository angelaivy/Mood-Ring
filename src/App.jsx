import './App.css'
import { Routes, Route } from 'react-router'
import MoodRing from './components/MoodRing'
import MoodMemories from './components/MoodMemories'
import MoodInsights from './components/MoodInsights'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <MoodRing /> } />
        <Route path="/memories" element={ <MoodMemories /> } />
        <Route path="/insights" element={ <MoodInsights /> } />
      </Routes>
    </>
  )
}

export default App
