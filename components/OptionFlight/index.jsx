'use client'

import { useRouter } from 'next/router'
import { useState } from 'react'

const OptionFlight = ({ flights }) => {
  const router = useRouter()
  const [flight, setFlight] = useState('')

  const handleChange = (e) => {
    setFlight(e.target.value)
  }

  const handleClick = () => {
    router.replace(`/${flight}`)
  }

  return (
    <section>
      <select name='select_flight' onChange={handleChange}>
        {
          flights.map(flight => (
            <option key={flight} value={flight}>{flight}</option>
          ))
        }
      </select>
      <button onClick={handleClick}>
        Consultar ruta de vuelo
      </button>
    </section>
  )
}

export default OptionFlight
