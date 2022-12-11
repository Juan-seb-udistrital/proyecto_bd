'use client'

import FormCreateFlight from '/components/FormCreateFlight'
import CreateConnection from '/components/CreateConnection'
import CreateSegments from '/components/CreateSegments'
import { useState } from 'react'
import styles from './Create.module.css'

const CreateFlight = ({ infoCities }) => {
  const [dataOfFlight, setDataOfFlight] = useState(null)
  const [routeArray, setRouteArray] = useState(null)
  const [editableData, setEditableData] = useState(null)
  const [codeCity, setCodeCity] = useState(null)

  return (
    <main className={styles.main}>
      <article className={styles.container_create}>
        <FormCreateFlight
          infoCities={infoCities}
          setDataOfFlight={setDataOfFlight}
          setRouteArray={setRouteArray}
          setEditableData={setEditableData}
        />
        <CreateConnection
          codeCity={codeCity}
          dataOfFlight={dataOfFlight}
          setDataOfFlight={setDataOfFlight}
          routeArray={routeArray}
          setRouteArray={setRouteArray}
        />
      </article>
      {
        dataOfFlight &&
          <article>
            <CreateSegments
              dataOfFlight={dataOfFlight}
              setDataOfFlight={setDataOfFlight}
              routeArray={routeArray}
              setRouteArray={setRouteArray}
              editableData={editableData}
              setCodeCity={setCodeCity}
            />
          </article>
      }
    </main>
  )
}

export default CreateFlight
