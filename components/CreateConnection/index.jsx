'use clients'

import { useState, useEffect } from 'react'

const connection = {
  airline: '',
  flight_code: '',
  pilot: ''
}

const CreateConnection = () => {
  const [dataConnection, setDataConnection] = useState(connection)
  const [airlines, setAirlines] = useState(null)
  const [flightCodes, setFlightCodes] = useState(null)

  useEffect(() => {
    const getAirlines = async () => {
      try {
        const res = await fetch('http://localhost:3300/allAirlines')
        const json = await res.json()

        setAirlines(json)
      } catch (error) {
        console.log(error)
      }
    }

    getAirlines()
  }, [])

  useEffect(() => {
    const getFlightCodes = async () => {
      try {
        const res = await fetch(`http://localhost:3300/codes/${dataConnection.airline.split(' ').join('')}`)
        const json = await res.json()

        setFlightCodes(json.flightCodes)
      } catch (error) {
        console.log(error)
      }
    }

    getFlightCodes()
  }, [dataConnection.airline])

  const handleChange = (e) => {
    setDataConnection({
      ...dataConnection,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeSelect = (e) => {
    const flight = flightCodes.find(element => element.code === e.target.value)

    setDataConnection({
      ...dataConnection,
      pilot: flight.pilot,
      flight_code: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Escoge aerolinea:</span>
        <select name='airline' onChange={handleChange}>
          <option value='' />
          {
            airlines?.map(airline => (
              <option key={airline} value={airline}>{airline}</option>
            ))
          }
        </select>
      </label>
      <label>
        <span>Escoge codigo:</span>
        <select name='flight_code' onChange={handleChangeSelect}>
          <option value='' />
          {
            flightCodes?.map(flightCode => (
              <option key={flightCode.code} value={flightCode.code}>{flightCode.code}</option>
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
