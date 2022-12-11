'use client'

import { ROUTE_STATES } from '/helpers/route_states.js'
import Segment from '/components/Segment'
import SegmentWithData from 'components/SegmentWithData'
import styles from './CreateSeg.module.css'

const CreateSegments = ({ dataOfFlight, setDataOfFlight, routeArray, setRouteArray, editableData }) => {
  const handleClickNewSegment = () => {
    setRouteArray([...routeArray, ROUTE_STATES.SEGMENT])
    setDataOfFlight([...dataOfFlight, editableData])
  }

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        Itinerario del vuelo
      </div>
      <section className={styles.container_segments}>
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
      <div className={styles.container_button}>
        <button className={styles.button} onClick={handleClickNewSegment}>
          Crear nuevo segmento
        </button>
      </div>
    </section>
  )
}

export default CreateSegments
