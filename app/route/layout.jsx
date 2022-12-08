import OptionFlight from '/components/OptionFlight'

const fetcher = () => fetch('http://localhost:3300/flight').then(res => res.json())

const LayoutRoute = async () => {
  const flights = await fetcher()
  return (
    <section>
      <OptionFlight flights={flights} />
    </section>
  )
}

export default LayoutRoute
