'use clients'

import { useState, useEffect } from 'react'
import { ROUTE_STATES } from '/helpers/route_states.js'

const connection = {
  airport: '',
  airline: '',
  flight_code: '',
  pilot: ''
}

const CreateConnection = ({ dataOfFlight, setDataOfFlight, routeArray, setRouteArray }) => {
  const [dataConnection, setDataConnection] = useState(connection)
  const [airports, setAirports] = useState(null)
  const [infoFlight, setInfoFlight] = useState(null)
  const [airlines, setAirlines] = useState(null)
  const [codesFlight, setCodesFlight] = useState(null)

  useEffect(() => {
    const getAirlines = async () => {
      try {
        const res = await fetch('http://localhost:3300/allAirports')
        const json = await res.json()

        setAirports(json)
      } catch (error) {
        console.log(error)
      }
    }

    getAirlines()
  }, [])

  useEffect(() => {
    const getFlightCodes = async () => {
      try {
        const res = await fetch(`http://localhost:3300/codes/${dataConnection.airport}`)
        const json = await res.json()

        /* const flightCodes = json.map(code => {code: code, number_flight:code.slice(2, 5)})
        setFlightCodes(flightCodes) */

        setInfoFlight(json)
        setAirlines([...new Set(json.data.map(info => info.airline))])
      } catch (error) {
        console.log(error)
      }
    }

    getFlightCodes()
  }, [dataConnection.airport])

  const handleChange = (e) => {
    setDataConnection({
      ...dataConnection,
      [e.target.name]: e.target.value
    })
  }

  /* const handleChangeSelect = (e) => {
    const flight = flightCodes.find(element => element.code === e.target.value)

    setDataConnection({
      ...dataConnection,
      pilot: flight.pilot,
      flight_code: e.target.value
    })
  } */

  const handleChangeAirline = (e) => {
    const codes = infoFlight.data.filter(info => info.airline === e.target.value).map(info => info.flight_code)

    setCodesFlight(codes)
    setDataConnection({
      ...dataConnection,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeCode = (e) => {
    const { pilot } = infoFlight.data.filter(info => info.flight_code === e.target.value)[0]

    setDataConnection({
      ...dataConnection,
      [e.target.name]: e.target.value,
      pilot
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const lastFlight = [...dataOfFlight].pop()

    try {
      const res = await fetch(`http://localhost:3300/flight/${dataConnection.flight_code}`)
      const json = await res.json()

      if (lastFlight.airport === json.airport) {
        setDataOfFlight([...dataOfFlight, json])
        setRouteArray([...routeArray, ROUTE_STATES.CONNECTION])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Escoge destino final:</span>
        <select name='airport' onChange={handleChange}>
          <option value='' />
          {
            airports?.data.map(({ CODE, NOMBRE }) => (
              <option key={CODE} value={CODE}>{NOMBRE}</option>
            ))
          }
        </select>
      </label>
      <label>
        <span>Escoge aerolinea:</span>
        <select name='airline' onChange={handleChangeAirline}>
          <option value='' />
          {
            airlines?.map((airline) => (
              <option key={airline} value={airline}>{airline}</option>
            ))
          }
        </select>
      </label>

      <label>
        <span>Escoge codigo:</span>
        <select name='flight_code' onChange={handleChangeCode}>
          <option value='' />
          {
            codesFlight?.map(code => (
              <option key={code} value={code}>{code}</option>
            ))
          }
        </select>
      </label>
      <p>Piloto del vuelo: <span>{dataConnection.pilot}</span></p>
      <input type='submit' value='Crear conexión' />
    </form>
  )
}

export default CreateConnection
