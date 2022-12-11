'use client'

import { ROUTE_STATES } from '/helpers/route_states.js'
import { useState, useEffect } from 'react'
import styles from './Segment.module.css'
import DataListInput from 'react-datalist-input'

const Segment = ({ index, route, infoCities, routeArray, editableData, dataOfFlight, dataSegmentOne, dataSegmentTwo, setDataOfFlight, setRouteArray, setCodeCity }) => {
  const [editableSegmentOne, setEditableSegmentOne] = useState({ ...dataSegmentOne })
  const [editableSegmentTwo, setEditableSegmentTwo] = useState({ ...dataSegmentTwo })
  const [errorDate, setErrorDate] = useState(null)
  const [cities, setCities] = useState(null)
  const [airports, setAirports] = useState(null)
  const [infoState, setInfoState] = useState(null)
  const [countrySelect, setCountrySelect] = useState(null)
  const [stateDelete, setStateDelete] = useState(false)

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
        const res = await fetch(`http://localhost:3300/aeropuertos/${editableSegmentTwo.city_code}`)
        const json = await res.json()

        console.log(json.data)
        setAirports(json.data)
      } catch (error) {
        console.log(error)
      }
    }

    getAirlinesAirport()
  }, [editableSegmentTwo.city_code])

  const handleChangeAirport = (e) => {
    const dataValueAttr = e.target.getAttribute('data-value')
    const textOption = e.target.options[e.target.selectedIndex].text

    setEditableSegmentTwo({
      ...editableSegmentTwo,
      [e.target.name]: e.target.value,
      [dataValueAttr]: textOption
    })
  }

  const handleChangeDate = (e) => {
    // Validación de fechas
    /* if (dataSegmentOne?.date < new Date(e.target.value).getTime()) {
      setErrorDate('La fecha y la hora no puede ser anterior')
    } */

    setEditableSegmentOne({
      ...editableSegmentOne,
      date: e.target.value.replace('T', ' ')
    })
  }

  const handleChangeCity = (e) => {
    const result = cities.filter(city => city.value === e.target.value)
    const allInfoCity = infoCities.filter(city => city.ciudad.NOMBRE === e.target.value)

    if (result.length === 0) return

    if (allInfoCity.length !== 0) {
      const { division, pais } = allInfoCity[0]

      setInfoState({
        type: division.TIPO,
        name: division.NOMBRE
      })
      setCountrySelect(pais.NOMBRE)
    }

    setEditableSegmentTwo({
      ...editableSegmentTwo,
      [e.target.name]: e.target.value,
      city_code: result[0].id
    })
  }

  const handleClick = (e) => {
    const flightData = [...dataOfFlight]
    flightData[index] = {
      ...editableSegmentOne
    }
    flightData[index + 1] = {
      ...editableSegmentTwo,
      ...infoState,
      country: countrySelect
    }

    setCodeCity(flightData[flightData.length - 1].city_code)
    setDataOfFlight(flightData)
    setStateDelete(true)
  }

  const handleClickEdit = (e) => {
    const flightData = [...dataOfFlight]
    flightData[index + 1] = editableData
    flightData[index].date = ''

    setCodeCity(flightData[flightData.length - 2].city_code)
    setDataOfFlight(flightData)
    setStateDelete(false)
  }

  const handleClickDelete = (e) => {
    if (index === 0) {
      setCodeCity(null)
      setDataOfFlight(null)
      setRouteArray(null)
    }

    const arrayFlights = [...dataOfFlight]
    const arraySegments = [...routeArray]
    arrayFlights.pop()
    arraySegments.pop()

    arrayFlights[index].date = ''

    setCodeCity(arrayFlights[arrayFlights.length - 1].city_code)
    setDataOfFlight(arrayFlights)
    setRouteArray(arraySegments)
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
          {
            dataSegmentOne.date === ''
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
                  <p><span>Fecha:</span> {new Date(dataSegmentOne?.date).toDateString()}</p>
                  <p><span>Hora:</span> {new Date(dataSegmentOne?.date).toLocaleTimeString()}</p>
                </>
                )
          }
          <p><span>Ciudad:</span> {dataSegmentOne?.city}</p>
          <p><span>Aeropuerto:</span> {dataSegmentOne?.airport}</p>
          <p><span>{dataSegmentOne.type}:</span> {dataSegmentOne.name}</p>
          <p><span>Pais:</span> {dataSegmentOne.country}</p>
          <p><span>Piloto:</span> {dataSegmentOne?.pilot}</p>
        </div>
        <div className={styles.segment_info}>
          <p><span>Vuelo:</span> {dataSegmentTwo?.flight}</p>
          <p><span>Aerolinea:</span> {dataSegmentTwo?.airline}</p>
          <div className={styles.edit_info_segment}>
            {
            dataSegmentTwo.city === ''
              ? (
                <label className={styles.input_edit}>
                  <span>
                    Selecciona la ciudad:
                  </span>
                  {/* <select name='city' onChange={handleChangeCity} className={styles.input_select}>
                    <option value='' />
                    {
                    cityInfo?.map(({ city }) => (
                      <option key={city} value={city}>{city}</option>
                    ))
                  }
                  </select> */}
                  {
                    cities && (
                      <DataListInput
                        items={cities}
                        className={styles.datalist}
                        onSelect={(item) => {
                          const result = cities.filter(city => city.value === item.value)
                          const allInfoCity = infoCities.filter(city => city.ciudad.NOMBRE === item.value)

                          const { division, pais } = allInfoCity[0]

                          setInfoState({
                            type: division.TIPO,
                            name: division.NOMBRE
                          })
                          setCountrySelect(pais.NOMBRE)
                          setEditableSegmentTwo({
                            ...editableSegmentTwo,
                            city: item.value,
                            city_code: result[0].id
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
                  <select name='airport_code' data-value='airport' onChange={handleChangeAirport} className={styles.input_select}>
                    <option value='' />
                    {
                  airports?.map(({ CODE, NOMBRE }) => (
                    <option key={CODE} value={CODE}>{NOMBRE}</option>
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
                <p><span>{infoState.type}:</span> {infoState.name}</p>
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
                          <button onClick={handleClickDelete}>
                            Editar datos iniciales
                          </button>
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
            {/* {
              index !== 0 && (
                <button onClick={handleClickDelete}>
                  Eliminar segmento
                </button>
              )
            } */}
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
