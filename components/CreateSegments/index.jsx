'use client'

import { ROUTE_STATES } from '/helpers/route_states.js'
import Segment from '/components/Segment'
import SegmentWithData from 'components/SegmentWithData'

const CreateSegments = ({ dataOfFlight, setDataOfFlight, routeArray, setRouteArray, editableData }) => {
  const handleClickNewSegment = () => {
    setRouteArray([...routeArray, ROUTE_STATES.SEGMENT])
    setDataOfFlight([...dataOfFlight, editableData])
  }

  return (
    <section>
      <div>
        Itinerario del vuelo
      </div>
      <section>
        {
          routeArray?.map((route, index) => {
            if (route === ROUTE_STATES.SEGMENT) {
              console.log(dataOfFlight)
              return (
                <Segment
                  key={route}
                  index={index}
                  route={route}
                  routeArray={routeArray}
                  editableData={editableData}
                  dataOfFlight={dataOfFlight}
                  dataSegmentOne={dataOfFlight[index]}
                  dataSegmentTwo={dataOfFlight[index + 1]}
                  setDataOfFlight={setDataOfFlight}
                  setRouteArray={setRouteArray}
                />
              )
            }

            return (
              <SegmentWithData
                key={route}
                route={route}
                dataSegmentOne={dataOfFlight[index]}
                dataSegmentTwo={dataOfFlight[index + 1]}
              />
            )
          })
        }
      </section>
      <button onClick={handleClickNewSegment}>
        Crear nuevo segmento
      </button>
    </section>
  )
}

export default CreateSegments
