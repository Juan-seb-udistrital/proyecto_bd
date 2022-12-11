'use client'

import useCollapse from 'react-collapsed'
import { useState, useEffect } from 'react'
import { ROUTE_STATES } from '/helpers/route_states.js'
import SegmentWithData from 'components/SegmentWithData'

const CollapsibleItineraries = ({ index, itinerary }) => {
  const [routeArray, setRouteArray] = useState(null)
  const [dataOfFlight, setDataOfFlight] = useState(null)
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  useEffect(() => {
    const routes = []
    const dataFlight = itinerary.map(route=>{
      return {
        flight: route.VUELO,
        airline: route.AEROLINEA,
        date: route.FECHA,
        city: route.ciudad
      }
    })

    itinerary?.forEach((route, index) => {
      if (itinerary[index + 1] === null) return

      if (route.flight === itinerary[index + 1].flight) {
        routes.push(ROUTE_STATES.SEGMENT)
        return
      }
      routes.push(ROUTE_STATES.CONNECTION)
    })
    setRouteArray(routes)
  }, [])

  return (
    <div>
      <div {...getToggleProps()}>
        Itinerario {index + 1}
      </div>
      <section {...getCollapseProps()}>
        {
        routeArray?.map((route, index) => (
          <SegmentWithData
            key={route}
            route={route}
            dataSegmentOne={itinerary[index]}
            dataSegmentTwo={itinerary[index + 1]}
          />
        ))
      }
      </section>
    </div>
  )
}

export default CollapsibleItineraries
