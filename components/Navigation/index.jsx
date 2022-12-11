import Link from 'next/link'
import styles from './Navigation.module.css'

const routes = [
  {
    path: '/',
    label: 'Home'
  },
  {
    path: '/create',
    label: 'Crear vuelos'
  },
  {
    path: '/itinerary',
    label: 'Itinerario'
  }
]

const Navigation = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {
          routes.map(route => (
            <Link className={styles.link} href={route.path} key={route.path}>
              {route.label}
            </Link>
          ))
        }
      </nav>
    </header>
  )
}

export default Navigation
