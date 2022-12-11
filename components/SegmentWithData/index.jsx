import styles from './Segment.module.css'

const SegmentWithData = ({ index, route, dataSegmentOne, dataSegmentTwo }) => {
  return (
    <article>
      <p className={styles.title}>{route}</p>
      <div className={styles.segment}>
        <div className={styles.segment_info}>
          <p><span>Vuelo:</span> {dataSegmentOne.flight}</p>
          <p><span>Aerolinea:</span> {dataSegmentOne.airline}</p>
          <p><span>Fecha:</span> {new Date(dataSegmentOne.date).toDateString()}</p>
          <p><span>Hora:</span> {new Date(dataSegmentOne.date).toLocaleTimeString()}</p>
          <p><span>Ciudad:</span> {dataSegmentOne.city}</p>
          <p><span>Aeropuerto:</span> {dataSegmentOne.airport}</p>
          <p><span>{Object.keys(dataSegmentOne).push()}:</span> {Object.values(dataSegmentOne).push()}</p>
          <p><span>Piloto:</span> {dataSegmentOne.pilot}</p>
        </div>
        <div className={styles.segment_info}>
          <p><span>Vuelo:</span> {dataSegmentTwo.flight}</p>
          <p><span>Aerolinea:</span> {dataSegmentTwo.airline}</p>
          <p><span>Fecha:</span> {new Date(dataSegmentTwo.date).toDateString()}</p>
          <p><span>Hora:</span> {new Date(dataSegmentTwo.date).toLocaleTimeString()}</p>
          <p><span>Ciudad:</span> {dataSegmentTwo.city}</p>
          <p><span>Aeropuerto:</span> {dataSegmentTwo.airport}</p>
          <p><span>{Object.keys(dataSegmentTwo).pop()}:</span> {Object.values(dataSegmentTwo).pop()}</p>
          <p><span>Piloto:</span> {dataSegmentTwo.pilot}</p>
        </div>
      </div>
    </article>
  )
}

export default SegmentWithData
