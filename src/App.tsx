import { useState } from 'react'
import './App.css'
import WeatherForecast from './WeatherForecast'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <WeatherForecast></WeatherForecast>
    
  )
}

export default App
