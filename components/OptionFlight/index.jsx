'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const OptionFlight = ({ flights }) => {
  const router = useRouter()
  const [flight, setFlight] = useState('')

  const handleChange = (e) => {
    setFlight(e.target.value)
  }

  const handleClick = () => {
    console.log('ruta')
    router.replace(`/route/${flight}`)
  }

  return (
    <section>
      <label>
        <span>
          Escoge el vuelo:
        </span>
        <select name='select_flight' onChange={handleChange}>
          <option value='' />
          {
          flights?.map(flight => (
            <option key={flight.id} value={flight.id}>{flight.id}</option>
          ))
        }
        </select>
      </label>
      <button onClick={handleClick}>
        Consultar ruta de vuelo
      </button>
    </section>
  )
}

export default OptionFlight
