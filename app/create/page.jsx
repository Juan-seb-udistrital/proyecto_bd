import CreateFlight from '/components/CreateFlight'

const fetcher = () => fetch('http://localhost:3300/allCities').then(res => res.json())

const CreatePage = async () => {
  const infoCities = await fetcher()
  console.log(infoCities)
  return (
    <main>
      <CreateFlight infoCities={infoCities} />
    </main>
  )
}

export default CreatePage
