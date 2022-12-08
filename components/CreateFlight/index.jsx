'use client'

import FormCreateFlight from '/components/FormCreateFlight'
import CreateConnection from '/components/CreateConnection'

const CreateFlight = ({ cities }) => {
  return (
    <section>
      <FormCreateFlight cities={cities} />
      <CreateConnection />
    </section>
  )
}

export default CreateFlight
