const SegmentWithData = ({ index, route, dataSegmentOne, dataSegmentTwo }) => {
  return (
    <article>
      <p>{route}</p>
      <div>
        <div>
          <p>Vuelo: {dataSegmentOne.flight}</p>
          <p>Aerolinea: {dataSegmentOne.airline}</p>
          <p>Fecha: {new Date(dataSegmentOne.date).toDateString()}</p>
          <p>Hora: {new Date(dataSegmentOne.date).toLocaleTimeString()}</p>
          <p>Ciudad: {dataSegmentOne.city}</p>
          <p>Aeropuerto: {dataSegmentOne.airport}</p>
          <p>{Object.keys(dataSegmentOne).push()}: {Object.values(dataSegmentOne).push()}</p>
          <p>Piloto: {dataSegmentOne.pilot}</p>
        </div>
        <div>
          <p>Vuelo: {dataSegmentTwo.flight}</p>
          <p>Aerolinea: {dataSegmentTwo.airline}</p>
          <p>Fecha: {new Date(dataSegmentTwo.date).toDateString()}</p>
          <p>Hora: {new Date(dataSegmentTwo.date).toLocaleTimeString()}</p>
          <p>Ciudad: {dataSegmentTwo.city}</p>
          <p>Aeropuerto: {dataSegmentTwo.airport}</p>
          <p>{Object.keys(dataSegmentTwo).pop()}: {Object.values(dataSegmentTwo).pop()}</p>
          <p>Piloto: {dataSegmentTwo.pilot}</p>
        </div>
      </div>
    </article>
  )
}

export default SegmentWithData
