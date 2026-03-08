import './App.css'
import { Routes, Route } from 'react-router'
import MoodRing from './components/MoodRing'
import MoodMemories from './components/MoodMemories'
import MoodInsights from './components/MoodInsights'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <MoodRing /> } />
        <Route path="/mood-memories" element={ <MoodMemories /> } />
        <Route path="/mood-insights" element={ <MoodInsights /> } />
      </Routes>
    </>
  )
}

export default App
