import { useState } from "react"

import Header from "./components/Header"
import UserInput from "./components/UserInput"
import Result from "./components/Result"

function App() {
  const [inputData, setInputData] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  })

  const inputValidCheck = inputData.duration > 0

  function handleInputChange(event) {
    // console.log("This is the target", event.target)
    const { name, value } = event.target
    setInputData(prevPlayers => {
      return {
        ...prevPlayers,
        [name]: Number(value)

      }
    })
  }
  return (
    <div>
      <Header />
      <UserInput inputData={inputData} handleInputChange={handleInputChange} />
      {!inputValidCheck && <p className="center">Please enter a number of duration greater than 0</p>}
      {inputValidCheck && <Result inputData={inputData} />}
    </div>
  )
}

export default App
