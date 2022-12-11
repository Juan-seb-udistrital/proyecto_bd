'use client'

import { useState, useEffect } from 'react'
import CollapsibleItineraries from 'components/CollapsibleItineraries'
import DataListInput from 'react-datalist-input'
import styles from './Itinerary.module.css'

const dataAirportsStruct = {
  from: '',
  final: ''
}

const Itinerary = ({ airports }) => {
  const [dataAirports, setDataAirports] = useState(dataAirportsStruct)
  const [allItineraries, setAllItineraries] = useState(null)
  const [airportsMap, setAirportsMap] = useState(null)

  useEffect(() => {
    const aports = airports.map(airport => {
      return {
        id: airport.CODE,
        value: airport.NOMBRE
      }
    })

    setAirportsMap(aports)
  }, [])

  const handleChange = (e) => {
    const airpt = airportsMap.find(airport => airport.value === e.target.value)

    if (!airpt) return

    setDataAirports({
      [e.target.name]: airpt.id
    })
  }

  const handleClick = async () => {
    try {
      // Request to get all itinerary
      const res = await fetch('http://localhost:3300/itinerary')
      const json = await res.json()

      setAllItineraries(json.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main>
      <section>
        <p>Selecciona origen y destino</p>
        <div className={styles.container_datalist}>
          {
            airportsMap &&
              <label className={styles.form_field}>
                <span>Origen:</span>
                <DataListInput
                  items={airportsMap}
                  className={styles.datalist}
                  onSelect={(item) => {
                    setDataAirports({
                      from: item.id
                    })
                  }}
                  inputProps={{
                    name: 'from',
                    className: styles.form_input,
                    onChange: (e) => { handleChange(e) }
                  }}
                  listboxProps={{
                    className: styles.listbox
                  }}
                />
              </label>
          }
          {
            airportsMap &&
              <label className={styles.form_field}>
                <span>Destino:</span>
                <DataListInput
                  items={airportsMap}
                  className={styles.datalist}
                  onSelect={(item) => {
                    setDataAirports({
                      to: item.id
                    })
                  }}
                  inputProps={{
                    name: 'to',
                    className: styles.form_input,
                    onChange: (e) => { handleChange(e) }
                  }}
                  listboxProps={{
                    className: styles.listbox
                  }}
                />
              </label>
          }

        </div>
        <button onClick={handleClick}>
          Buscar itinerarios
        </button>
      </section>
      <section className={styles.container_all_itineraries}>
        <p>Todos los itinerarios del destino</p>
        {
          allItineraries
            ? (
                allItineraries?.map((itinerary, index) => (
                  <CollapsibleItineraries key={index} index={index} itinerary={itinerary} />
                ))
              )
            : (
              <p>Busca un itinerario</p>
              )
        }
      </section>
    </main>
  )
}

export default Itinerary
