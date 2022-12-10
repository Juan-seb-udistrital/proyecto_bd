'use client'

import { ROUTE_STATES } from '/helpers/route_states.js'
import { useState, useEffect } from 'react'

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
    if (dataSegmentOne.date < new Date(e.target.value).getTime()) {
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
    <article>
      {
        route === ROUTE_STATES.SEGMENT
          ? (<p>{route} {index}</p>)
          : (<p>{route} 1</p>)
      }
      <div>
        <div>
          <p>Vuelo: {dataSegmentOne.flight}</p>
          <p>Aerolinea: {dataSegmentOne.airline}</p>
          <p>Fecha: {new Date(dataSegmentOne.date).toDateString()}</p>
          <p>Hora: {new Date(dataSegmentOne.date).toLocaleTimeString()}</p>
          <p>Ciudad: {dataSegmentOne.city}</p>
          <p>Aeropuerto: {dataSegmentOne.airport}</p>
          <p>{Object.keys(dataSegmentOne).pop()}: {Object.values(dataSegmentOne).pop()}</p>
          <p>Piloto: {dataSegmentOne.pilot}</p>
        </div>
        <div>
          <p>Vuelo: {dataSegmentTwo?.flight}</p>
          <p>Aerolinea: {dataSegmentTwo?.airline}</p>
          {
            dataSegmentTwo.date === ''
              ? (
                <label>
                  <span>
                    Inserte fecha y hora del nuevo segmento:
                  </span>
                  <input type='datetime-local' name='date' onChange={handleChangeDate} />
                </label>
                )
              : (
                <>
                  <p>Fecha: {new Date(dataSegmentTwo.date).toDateString()}</p>
                  <p>Hora: {new Date(dataSegmentTwo.date).toLocaleTimeString()}</p>
                </>
                )
          }
          {
            dataSegmentTwo.city === ''
              ? (
                <label>
                  <span>
                    Selecciona la ciudad:
                  </span>
                  <select name='city' onChange={handleChangeCity}>
                    {
                    cityInfo?.map(({ city }) => (
                      <option key={city} value={city}>{city}</option>
                    ))
                  }
                  </select>
                </label>
                )
              : (
                <p>Ciudad: {dataSegmentTwo.city}</p>
                )
          }
          {
            dataSegmentTwo.airport === ''
              ? (
                <label>
                  <span>
                    Selecciona el aeropuerto:
                  </span>
                  <select name='airport' onChange={handleChange}>
                    {
                  airports?.map(airport => (
                    <option key={airport} value={airport}>{airport}</option>
                  ))
                }
                  </select>
                </label>
                )
              : (
                <p>Aeropuerto: {dataSegmentTwo.airport}</p>
                )
          }
          {
            infoState
              ? (
                <p>{infoState[0]}: {infoState[1]}</p>
                )
              : (
                <p>Escoge una ciudad</p>
                )
          }
          {
            countrySelect
              ? (
                <p>Pais seleccionado: {countrySelect}</p>
                )
              : (
                <p>Selecciona una ciudad</p>
                )
          }
          <p>Piloto: {dataSegmentTwo?.pilot}</p>

          {
            !stateDelete
              ? (
                <button onClick={handleClick}>
                  Confirmar nuevo segmento
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

          <button onClick={handleClickEdit} disabled={!(index + 2 === dataOfFlight.length)}>
            Editar segmento
          </button>
        </div>
      </div>
    </article>
  )
}

export default Segment
