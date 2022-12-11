'use client'

import { useEffect, useState } from 'react'
import { ROUTE_STATES } from '/helpers/route_states.js'
import styles from './Form.module.css'
import DataListInput from 'react-datalist-input'

const flight = {
  airline: '',
  airline_code: '',
  city: '',
  city_code: null,
  airport: '',
  airport_code: '',
  pilot: '',
  pilot_code: '',
  date: ''
}

const FormCreateFlight = ({ infoCities, dataOfFlight, setDataOfFlight, setRouteArray, setEditableData }) => {
  const [dataFlight, setDataFlight] = useState(flight)
  const [airlines, setAirlines] = useState(null)
  const [airports, setAirports] = useState(null)
  const [pilots, setPilots] = useState(null)
  const [cities, setCities] = useState(null)

  useEffect(() => {
    const citiesItems = infoCities.map(city => {
      return {
        id: city.ciudad.ID,
        value: city.ciudad.NOMBRE
      }
    })

    setCities(citiesItems)
  }, [])

  useEffect(() => {
    const getAirlinesAirport = async () => {
      try {
        const resAirline = await fetch(`http://localhost:3300/aerolineas/${dataFlight.city_code}`)
        const jsonAirline = await resAirline.json()

        const resAirport = await fetch(`http://localhost:3300/aeropuertos/${dataFlight.city_code}`)
        const jsonAirport = await resAirport.json()

        setAirlines(jsonAirline.data)
        setAirports(jsonAirport.data)
        console.log(airlines, airports)
      } catch (error) {
        console.log(error)
      }
    }

    getAirlinesAirport()
  }, [dataFlight.city_code])

  useEffect(() => {
    const getPilots = async () => {
      try {
        const res = await fetch(`http://localhost:3300/pilotos/${dataFlight.airline_code}`)
        const json = await res.json()

        setPilots(json.data)
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

  const handleChangeSelect = (e) => {
    const dataValueAttr = e.target.getAttribute('data-value')
    const textOption = e.target.options[e.target.selectedIndex].text

    setDataFlight({
      ...dataFlight,
      [e.target.name]: e.target.value,
      [dataValueAttr]: textOption
    })
  }

  const handleChangeCity = (e) => {
    const result = cities.filter(city => city.value === e.target.value)

    if (result.length === 0) return

    setDataFlight({
      ...dataFlight,
      [e.target.name]: e.target.value,
      city_code: result[0].id
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const division = infoCities.filter(city => city.ciudad.NOMBRE === dataFlight.city)
    const flight = dataFlight.airline.split(' ').map(word => word.charAt(0)).join('').toUpperCase() + dataFlight.code

    setDataOfFlight([
      {
        ...dataFlight,
        flight,
        division: {
          type: division[0].division.TIPO,
          name: division[0].division.NOMBRE
        },
        country: division[0].pais.NOMBRE,
        date: new Date(dataFlight.date.replace('T', ' ')).getTime()
      },
      {
        ...dataFlight,
        flight,
        city: '',
        city_code: null,
        airport: '',
        airport_code: '',
        country: ''
      }
    ])
    setRouteArray([ROUTE_STATES.SEGMENT])
    setEditableData({
      city: '',
      city_code: null,
      airport: '',
      airport_code: '',
      country: '',
      date: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>Detalles del vuelo</p>
      <label className={styles.form_field}>
        <span>Ciudad:</span>
        {
          cities && (
            <DataListInput
              items={cities}
              className={styles.datalist}
              onSelect={(item) => {
                setDataFlight({
                  ...dataFlight,
                  city: item.value,
                  city_code: item.id
                })
              }}
              inputProps={{
                name: 'city',
                className: styles.form_input,
                onChange: (e) => { handleChangeCity(e) }
              }}
              listboxProps={{
                className: styles.listbox
              }}
            />
          )
        }
      </label>

      <label className={styles.form_field}>
        <span>Aerolinea:</span>
        <select name='airline_code' data-value='airline' onChange={handleChangeSelect} className={styles.form_select}>
          {!airlines ? <option value=''>Escoge una ciudad</option> : <option value='' />}
          {
            airlines &&
            (
              airlines.map(({ CODE, NOMBRE }) => (
                <option key={CODE} value={CODE}>{NOMBRE}</option>
              ))
            )
          }
        </select>
      </label>

      <label className={styles.form_field}>
        <span>Aeropuerto:</span>
        <select name='airport_code' data-value='airport' onChange={handleChangeSelect} className={styles.form_select}>
          {!airports ? <option value=''>Escoge una ciudad</option> : <option value='' />}
          {
            airports &&
            (
              airports.map(({ CODE, NOMBRE }) => (
                <option key={CODE} value={CODE}>{NOMBRE}</option>
              ))
            )
          }
        </select>
      </label>

      <label className={styles.form_field}>
        <span>Escoge piloto:</span>
        <select name='pilot_code' data-value='pilot' onChange={handleChangeSelect} className={styles.form_select}>
          {!pilots ? <option value=''>Escoge una ciudad</option> : <option value='' />}
          {
            pilots &&
            (
              pilots.map(({ LICENCIA, NOMBRE }) => (
                <option key={LICENCIA} value={LICENCIA}>{NOMBRE}</option>
              ))
            )
          }
        </select>
      </label>
      <label className={styles.form_field}>
        <span>
          Codigo de vuelo:
        </span>
        <input type='text' name='code' pattern='[0-9]{3}' title='Codigo de 3 numeros' onChange={handleChange} className={styles.form_input} />
      </label>
      <label className={styles.form_field}>
        <span>
          Hora y fecha de vuelo:
        </span>
        <input type='datetime-local' name='date' onChange={handleChange} className={styles.form_date} />
      </label>
      <input type='submit' value='Generar vuelo' className={styles.button} disabled={dataOfFlight} />
    </form>
  )
}

export default FormCreateFlight
