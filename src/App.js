import React, { useState, useEffect } from "react"
// import { useParksReducer } from "./hooks/useParksReducer"
import "./App.css"

import { parkData } from "./data/parks"

function App() {
  // const { loading, response, error } = useParksReducer()

  // useParksSearchReducer().....
  const [parksDisplayed, setParksDisplayed] = useState([])
  const [nameSearchInput, setNameSearchInput] = useState("")
  const [stateSearchInput, setStateSearchInput] = useState("")

  const handleNameSearchInput = event => {
    setNameSearchInput(event.target.value)
  }

  const handleStateSearchInput = event => {
    setStateSearchInput(event.target.value)
  }

  const handleSearchSubmit = () => {
    // filter through parks & rerender
  }

  useEffect(() => {
    setParksDisplayed(parkData)
  }, [])

  return (
    <div className="App">
      <h1>NPS Finder</h1>

      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="park-name-search">
          Search by name:
          <input
            id="park-name-search"
            type="text"
            value={nameSearchInput}
            onChange={handleNameSearchInput}
          />
        </label>

        <label htmlFor="park-state-search">
          Search by state:
          <select
            name="states"
            id="park-state-search"
            onChange={handleStateSearchInput}
          >
            <option value="">Select state</option>
            <option value="CA">California</option>
            <option value="ID">Idaho</option>
            <option value="OR">Oregon</option>
            <option value="CO">Colorado</option>
          </select>
        </label>
      </form>

      <ul>
        {parksDisplayed.map(park => {
          return (
            <li key={park.parkCode}>
              <h3>{park.name}</h3>
              <p>{park.state}</p>
            </li>
          )
        })}
      </ul>

      {/* {loading && <div>Loading parks...</div>}
      {response && <div>{Parks list!}</div>}
      {error && (
        <div>Sorry, couldn't load any park data at this time.</div>
      )} */}
    </div>
  )
}

export default App
