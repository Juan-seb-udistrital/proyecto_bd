const fetcher = () => fetch('http://localhost:3300/itinerary').then(res => res.json())

const ItineraryPage = async () => {
  const allFlightsInfo = await fetcher()

  return (
    <main>
      Este es el main de itinerary
    </main>
  )
}

export default ItineraryPage
