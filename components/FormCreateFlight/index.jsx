'use client'

import { useEffect, useState } from 'react'

const flight = {
  airline: '',
  city: '',
  airport: '',
  pilot: ''
}

const FormCreateFlight = ({ cities }) => {
  const [dataFlight, setDataFlight] = useState(flight)
  const [airlines, setAirlines] = useState(null)
  const [airports, setAirports] = useState(null)
  const [pilots, setPilots] = useState(null)

  useEffect(() => {
    const getAirlinesAirport = async () => {
      try {
        const resAirline = await fetch(`http://localhost:3300/airlines/${dataFlight.city.split(' ').join('')}`)
        const jsonAirline = await resAirline.json()

        const resAirport = await fetch(`http://localhost:3300/airports/${dataFlight.city.split(' ').join('')}`)
        const jsonAirport = await resAirport.json()

        setAirlines(jsonAirline.airlines)
        setAirports(jsonAirport.airports)
      } catch (error) {
        console.log(error)
      }
    }

    getAirlinesAirport()
  }, [dataFlight.city])

  useEffect(() => {
    const getPilots = async () => {
      try {
        const res = await fetch(`http://localhost:3300/pilots/${dataFlight.airline.split(' ').join('')}`)
        const json = await res.json()

        setPilots(json.pilots)
      } catch (error) {
        console.log(error)
      }
    }

    getPilots()
  }, [dataFlight.airline])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setDataFlight({
      ...dataFlight,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Ciudad:</span>
        <select name='city' onChange={handleChange}>
          {
            cities?.map(city => (
              <option key={city} value={city}>{city}</option>
            ))
          }
        </select>
      </label>

      <label>
        <span>Escoge aerolinea:</span>
        <select name='airline' onChange={handleChange}>
          {!airlines ? <option value=''>Escoge una ciudad</option> : <option value='' />}
          {
            airlines &&
            (
              airlines.map(airlines => (
                <option key={airlines} value={airlines}>{airlines}</option>
              ))
            )
          }
        </select>
      </label>

      <label>
        <span>Escoge aeropuerto:</span>
        <select name='airport' onChange={handleChange}>
          {!airports ? <option value=''>Escoge una ciudad</option> : <option value='' />}
          {
            airports &&
            (
              airports.map(airport => (
                <option key={airport} value={airport}>{airport}</option>
              ))
            )
          }
        </select>
      </label>

      <label>
        <span>Escoge piloto:</span>
        <select name='pilot' onChange={handleChange}>
          {!pilots ? <option value=''>Escoge una ciudad</option> : <option value='' />}
          {
            pilots &&
            (
              pilots.map(pilot => (
                <option key={pilot} value={pilot}>{pilot}</option>
              ))
            )
          }
        </select>
      </label>
      <input type='submit' value='Generar vuelo' />
    </form>
  )
}

export default FormCreateFlight
