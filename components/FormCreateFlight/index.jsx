'use client'

import { useEffect, useState } from 'react'
import { ROUTE_STATES } from '/helpers/route_states.js'

const flight = {
  airline: '',
  city: '',
  airport: '',
  pilot: '',
  code: '',
  date: ''
}

const FormCreateFlight = ({ infoCities, setDataOfFlight, setRouteArray, setEditableData }) => {
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
        console.log(airlines, airports)
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

  const handleChange = (e) => {
    setDataFlight({
      ...dataFlight,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const [division, place] = Object.entries(infoCities.find(infoCity => infoCity.city === dataFlight.city)).pop()
    const { country } = infoCities.find(infoCity => infoCity.city === dataFlight.city)
    const flight = dataFlight.airline.split(' ').map(word => word.charAt(0)).join('').toUpperCase() + dataFlight.code
    const { airline, city, airport, pilot, date } = dataFlight

    setDataOfFlight([
      {
        country,
        flight,
        airport,
        city,
        airline,
        pilot,
        date: new Date(date.replace('T', ' ')).getTime(),
        [division]: place
      },
      {
        flight,
        airline,
        airport: '',
        city: '',
        country: '',
        date: '',
        pilot
      }
    ])
    setRouteArray([ROUTE_STATES.SEGMENT])
    setEditableData({
      flight,
      airline,
      airport: '',
      city: '',
      country: '',
      date: '',
      pilot
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Ciudad:</span>
        <select name='city' onChange={handleChange}>
          {
            infoCities?.map(({ city }) => (
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
      <label>
        <span>
          Codigo de vuelo:
        </span>
        <input type='text' name='code' pattern='[0-9]{3}' title='Codigo de 3 numeros' onChange={handleChange} />
      </label>
      <label>
        <span>
          Hora y fecha de vuelo:
        </span>
        <input type='datetime-local' name='date' onChange={handleChange} />
      </label>
      <input type='submit' value='Generar vuelo' />
    </form>
  )
}

export default FormCreateFlight
