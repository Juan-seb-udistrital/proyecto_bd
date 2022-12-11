'use clients'

import { useState, useEffect } from 'react'
import { ROUTE_STATES } from '/helpers/route_states.js'
import styles from './Connection.module.css'

const connection = {
  airport_code: '',
  airline_code: '',
  flight_code: '',
  pilot: ''
}

const CreateConnection = ({ codeCity, dataOfFlight, setDataOfFlight, routeArray, setRouteArray }) => {
  const [dataConnection, setDataConnection] = useState(connection)
  const [airports, setAirports] = useState(null)
  const [infoFlight, setInfoFlight] = useState(null)
  const [airlines, setAirlines] = useState(null)
  const [allSegments, setAllSegments] = useState(null)
  const [codes, setCodes] = useState(null)

  useEffect(() => {
    if (!codeCity) return

    const getAirports = async () => {
      try {
        const res = await fetch(`http://localhost:3300/aeropuertos/${codeCity}`)
        const json = await res.json()

        setAirports(json.data)
      } catch (error) {
        console.log(error)
      }
    }

    getAirports()
  }, [codeCity])

  useEffect(() => {
    const getFlightCodes = async () => {
      try {
        const res = await fetch(`http://localhost:3300/getsegmentos/${dataConnection.airport_code}`)
        const json = await res.json()

        setAllSegments(json.data)
        setAirlines([...new Set(json.data.map(segment => segment.AEREOLINEA))])
      } catch (error) {
        console.log(error)
      }
    }

    getFlightCodes()
  }, [dataConnection.airport_code])

  useEffect(() => {
    if (!allSegments) return
    const flightCodes = allSegments?.filter(segment => segment.AEREOLINEA === dataConnection.airline_code).map(segment => segment.VUELO)

    setCodes(flightCodes)
  }, [dataConnection.airline_code])

  const handleChange = (e) => {
    setDataConnection({
      ...dataConnection,
      [e.target.name]: e.target.value
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
        <select name='airport_code' className={styles.form_select} onChange={handleChange}>
          <option value='' />
          {
            airports?.map(({ CODE, NOMBRE }) => (
              <option key={CODE} value={CODE}>{NOMBRE}</option>
            ))
          }
        </select>

      </label>
      <label className={styles.form_field}>
        <span>Escoge aerolinea:</span>
        <select name='airline_code' className={styles.form_select} onChange={handleChange}>
          <option value='' />
          {
            airlines?.map(airline => (
              <option key={airline} value={airline}>{airline}</option>
            ))
          }
        </select>
      </label>

      <label className={styles.form_field}>
        <span>Escoge codigo:</span>
        <select name='flight_code' className={styles.form_select} onChange={handleChange}>
          <option value='' />
          {
            codes?.map(code => (
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
