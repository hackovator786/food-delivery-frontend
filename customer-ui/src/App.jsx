import { useState } from 'react'
import './App.css'
import ExploreMenu from './components/MenuItemSwiper'
import HomePage from './components/food_delivery_home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ExploreMenu /> */}
      <HomePage />
    </>
  )
}

export default App
