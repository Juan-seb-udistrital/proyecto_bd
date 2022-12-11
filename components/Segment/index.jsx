'use client'

import { ROUTE_STATES } from '/helpers/route_states.js'
import { useState, useEffect } from 'react'
import styles from './Segment.module.css'

const Segment = ({ index, route, routeArray, editableData, dataOfFlight, dataSegmentOne, dataSegmentTwo, setDataOfFlight, setRouteArray }) => {
  const [editableSegment, setEditableSegment] = useState({ ...dataSegmentTwo })
  const [errorDate, setErrorDate] = useState(null)
  const [cityInfo, setCityInfo] = useState(null)
  const [airports, setAirports] = useState(null)
  const [infoState, setInfoState] = useState(null)
  const [countrySelect, setCountrySelect] = useState(null)
  const [stateDelete, setStateDelete] = useState(false)

  useEffect(() => {
    const getCitiesAndAirports = async () => {
      try {
        const res = await fetch('http://localhost:3300/infostate')
        const json = await res.json()

        setCityInfo(json)
      } catch (error) {
        console.log(error)
      }
    }

    getCitiesAndAirports()
  }, [])

  const handleChangeDate = (e) => {
    if (dataSegmentOne?.date < new Date(e.target.value).getTime()) {
      setErrorDate('La fecha y la hora no puede ser anterior')
    }

    setEditableSegment({
      ...editableSegment,
      date: e.target.value.replace('T', ' ')
    })
  }

  const handleChangeCity = (e) => {
    const info = cityInfo.find(({ city }) => city === e.target.value)
    const state = Object.entries(info).pop()

    setAirports(info.airports)
    setInfoState(state)
    setCountrySelect(info.country)
    setEditableSegment({
      ...editableSegment,
      city: e.target.value,
      country: info.country
    })
  }

  const handleClickDelete = (e) => {
    const arrayFlights = [...dataOfFlight]
    const arraySegments = [...routeArray]
    arrayFlights.pop()
    arraySegments.pop()

    setDataOfFlight(arrayFlights)
    setRouteArray(arraySegments)
  }

  const handleChange = (e) => {
    setEditableSegment({
      ...editableSegment,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e) => {
    const flightData = [...dataOfFlight]
    flightData[index + 1] = {
      ...editableSegment,
      [infoState[0]]: infoState[1]
    }

    setDataOfFlight(flightData)
    setStateDelete(true)
  }

  const handleClickEdit = (e) => {
    const flightData = [...dataOfFlight]
    flightData[index + 1] = editableData

    setDataOfFlight(flightData)
    setStateDelete(false)
  }

  return (
    <article className={styles.container}>
      {
        route === ROUTE_STATES.SEGMENT
          ? (<p className={styles.title}>{route} {index}</p>)
          : (<p>{route} 1</p>)
      }
      <div className={styles.segment}>
        <div className={styles.segment_info}>
          <p><span>Vuelo:</span> {dataSegmentOne?.flight}</p>
          <p><span>Aerolinea:</span> {dataSegmentOne?.airline}</p>
          <p><span>Fecha:</span> {new Date(dataSegmentOne?.date).toDateString()}</p>
          <p><span>Hora:</span> {new Date(dataSegmentOne?.date).toLocaleTimeString()}</p>
          <p><span>Ciudad:</span> {dataSegmentOne?.city}</p>
          <p><span>Aeropuerto:</span> {dataSegmentOne?.airport}</p>
          <p><span>{Object.keys(dataSegmentOne).pop()}:</span> {Object.values(dataSegmentOne).pop()}</p>
          <p><span>Piloto:</span> {dataSegmentOne?.pilot}</p>
        </div>
        <div className={styles.segment_info}>
          <p><span>Vuelo:</span> {dataSegmentTwo?.flight}</p>
          <p><span>Aerolinea:</span> {dataSegmentTwo?.airline}</p>
          <div className={styles.edit_info_segment}>
            {
            dataSegmentTwo.date === ''
              ? (
                <label className={styles.input_edit}>
                  <span>
                    Inserte fecha y hora:
                  </span>
                  <input type='datetime-local' name='date' onChange={handleChangeDate} className={styles.input_date} />
                </label>
                )
              : (
                <>
                  <p><span>Fecha:</span> {new Date(dataSegmentTwo.date).toDateString()}</p>
                  <p><span>Hora:</span> {new Date(dataSegmentTwo.date).toLocaleTimeString()}</p>
                </>
                )
            }
            {
            dataSegmentTwo.city === ''
              ? (
                <label className={styles.input_edit}>
                  <span>
                    Selecciona la ciudad:
                  </span>
                  <select name='city' onChange={handleChangeCity} className={styles.input_select}>
                    <option value='' />
                    {
                    cityInfo?.map(({ city }) => (
                      <option key={city} value={city}>{city}</option>
                    ))
                  }
                  </select>
                </label>
                )
              : (
                <p><span>Ciudad:</span> {dataSegmentTwo.city}</p>
                )
            }
            {
            dataSegmentTwo.airport === ''
              ? (
                <label className={styles.input_edit}>
                  <span>
                    Selecciona el aeropuerto:
                  </span>
                  <select name='airport' onChange={handleChange} className={styles.input_select}>
                    <option value='' />
                    {
                  airports?.map(airport => (
                    <option key={airport} value={airport}>{airport}</option>
                  ))
                }
                  </select>
                </label>
                )
              : (
                <p><span>Aeropuerto:</span> {dataSegmentTwo.airport}</p>
                )
            }
          </div>
          {
            infoState
              ? (
                <p><span>{infoState[0]}:</span> {infoState[1]}</p>
                )
              : (
                <p>Escoge una ciudad</p>
                )
          }
          {
            countrySelect
              ? (
                <p><span>Pais:</span> {countrySelect}</p>
                )
              : (
                <p>Selecciona una ciudad</p>
                )
          }
          <p><span>Piloto:</span> {dataSegmentTwo?.pilot}</p>
          <div className={styles.panel}>
            {
              !stateDelete
                ? (
                  <button onClick={handleClick}>
                    Confirmar segmento
                  </button>
                  )
                : (
                  <>
                    {
                      index === 0
                        ? (
                          <p>No puedes eliminar este segmento</p>
                          )
                        : (
                          <button onClick={handleClickDelete}>
                            Eliminar segmento
                          </button>
                          )
                    }
                  </>
                  )
              }
            {
              index !== 0 && (
                <button onClick={handleClickDelete}>
                  Eliminar segmento
                </button>
              )
            }
            <div className={styles.container_button}>
              <button className={styles.button} onClick={handleClickEdit} disabled={!(index + 2 === dataOfFlight.length)}>
                Editar segmento
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Segment
