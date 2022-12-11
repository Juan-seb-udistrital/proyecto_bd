import Itinerary from '/components/Itinerary'

const fetcher = () => fetch('http://localhost:3300/allAirports').then(res => res.json())

const ItineraryPage = async () => {
  const allAirports = await fetcher()

  return <Itinerary airports={allAirports.data} />
}

export default ItineraryPage
