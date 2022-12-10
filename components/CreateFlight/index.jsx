'use client'

import FormCreateFlight from '/components/FormCreateFlight'
import CreateConnection from '/components/CreateConnection'
import CreateSegments from '/components/CreateSegments'
import { useState } from 'react'

const CreateFlight = ({ infoCities }) => {
  const [dataOfFlight, setDataOfFlight] = useState(null)
  const [routeArray, setRouteArray] = useState(null)
  const [editableData, setEditableData] = useState(null)

  return (
    <section>
      <article>
        <FormCreateFlight
          infoCities={infoCities}
          setDataOfFlight={setDataOfFlight}
          setRouteArray={setRouteArray}
          setEditableData={setEditableData}
        />
        <CreateConnection
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
            />
          </article>
      }
    </section>
  )
}

export default CreateFlight
