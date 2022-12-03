const fetcher = () => fetch('url').then(res => res.json())

const ItineraryPage = async () => {
  const allFlightsInfo = await fetcher()

  return (
    <main>
      Este es el main de itinerary
    </main>
  )
}

export default ItineraryPage
