import OptionFlight from '/components/OptionFlight'

const fetcher = () => fetch('url').then(res => res.json())

const LayoutRoute = async () => {
  const flights = await fetcher()
  return (
    <section>
      <OptionFlight flight={flights} />
    </section>
  )
}

export default LayoutRoute
