'use client'

import {useState, useEffect} from 'react'
import DataListInput from 'react-datalist-input'

const data_airports = {
  origin: '',
  final: ''
}

const Itinerary = ({ airports }) => {
  const [dataAirports, setDataAirports] = useState(data_airports)

  const handleChange = (e) => {
    setDataAirports({
      [e.target.name]: e.target.value
    })
  }

  const handleClick = async () => {
    
  }
  return (
    <main>
      <section>
        {/* dos datalis input para los aeropuertos */}
      </section>
      <section>

      </section>
    </main>
  )
}

export default Itinerary
