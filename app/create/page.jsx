import CreateFlight from '/components/CreateFlight'

const fetcher = () => fetch('http://localhost:3300/ciudades').then(res => res.json())

const CreatePage = async () => {
  const infoCities = await fetcher()

  return (
    <CreateFlight infoCities={infoCities.data} />
  )
}

export default CreatePage
