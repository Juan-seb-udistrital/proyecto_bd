'use clients'

import { useState, useEffect } from 'react'
import { ROUTE_STATES } from '/helpers/route_states.js'
import styles from './Connection.module.css'

const connection = {
  airport: '',
  airline: '',
  flight_code: '',
  pilot: ''
}

const CreateConnection = ({ codeCity, dataOfFlight, setDataOfFlight, routeArray, setRouteArray }) => {
  const [dataConnection, setDataConnection] = useState(connection)
  const [airports, setAirports] = useState(null)
  const [infoFlight, setInfoFlight] = useState(null)
  const [airlines, setAirlines] = useState(null)
  const [codesFlight, setCodesFlight] = useState(null)

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

  useEffect(() => {
    if (!codeCity) return

    const getAirports = async () => {
      try {
        const resAirline = await fetch(`http://localhost:3300/aerolineas/${codeCity}`)
        const jsonAirline = await resAirline.json()

        const resAirport = await fetch(`http://localhost:3300/aeropuertos/${codeCity}`)
        const jsonAirport = await resAirport.json()

        setAirlines(jsonAirline.data)
        setAirports(jsonAirport.data)
      } catch (error) {
        console.log(error)
      }
    }

    getAirports()
  }, [codeCity])

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>Crear conexión</p>
      <label className={styles.form_field}>
        <span>Escoge destino final:</span>
        <select name='airport' className={styles.form_select} onChange={handleChange}>
          <option value='' />
          {
            airports?.data.map(({ CODE, NOMBRE }) => (
              <option key={CODE} value={CODE}>{NOMBRE}</option>
            ))
          }
        </select>

      </label>
      <label className={styles.form_field}>
        <span>Escoge aerolinea:</span>
        <select name='airline' className={styles.form_select} onChange={handleChangeAirline}>
          <option value='' />
          {
            airlines?.map((airline) => (
              <option key={airline} value={airline}>{airline}</option>
            ))
          }
        </select>
      </label>

      <label className={styles.form_field}>
        <span>Escoge codigo:</span>
        <select name='flight_code' className={styles.form_select} onChange={handleChangeCode}>
          <option value='' />
          {
            codesFlight?.map(code => (
              <option key={code} value={code}>{code}</option>
            ))
          }
        </select>
      </label>
      <p className={styles.pilot_p}><span>Piloto del vuelo:</span> {dataConnection.pilot}</p>
      <div className={styles.container_button}>
        <input type='submit' value='Crear conexión' className={styles.button} />
      </div>
    </form>
  )
}

export default CreateConnection
