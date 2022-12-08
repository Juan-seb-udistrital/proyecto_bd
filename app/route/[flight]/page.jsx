import FlightInfo from '/components/FlightInfo'

const fetcher = (flight) => fetch(`http://localhost:3300/flights/${flight}`).then(res => res.json())

const FlightPage = async ({ params }) => {
  const { flight } = params
  const flightInfo = await fetcher(flight)

  return (
    <section>
      Aqui va la info del vuelo
      <FlightInfo flightInfo={flightInfo} />
    </section>
  )
}

export default FlightPage
