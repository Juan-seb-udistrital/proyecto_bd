import CreateFlight from '/components/CreateFlight'

const fetcher = () => fetch('http://localhost:3300/cities/allCities').then(res => res.json())

const CreatePage = async () => {
  const cities = await fetcher()

  return (
    <main>
      <CreateFlight cities={cities.cities} />
    </main>
  )
}

export default CreatePage
