import { useEffect, useReducer } from "react"

export const useParksReducer = () => {
  const initialState = {
    loading: false,
    response: null,
    error: null,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOADING":
        return {
          ...state,
          loading: true,
          response: null,
          error: null,
        }
      case "RESOLVED":
        return {
          ...state,
          loading: false,
          response: action.response,
          error: null,
        }
      case "ERROR":
        return {
          ...state,
          loading: false,
          response: null,
          error: action.error,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let isCurrent = true
    dispatch({ type: "LOADING" })

    fetch(
      `https://developer.nps.gov/api/v1/parks?q=National%20Park&api_key=${process.env.REACT_APP_NPS_API_KEY}&limit=100`
    )
      .then(response => response.json())
      .then(json => {
        if (isCurrent) {
          console.log("the dataaaa:", json.data[0])
          dispatch({ type: "RESOLVED", response: json })
        }
      })
      .catch(error => {
        dispatch({ type: "ERROR", error })
      })

    return () => (isCurrent = false)
  }, [])

  const { loading, response, error } = state

  return { loading, response, error }
}
