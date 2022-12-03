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
    path: '/route',
    label: 'Ruta de vuelo'
  },
  {
    path: '/itinerary',
    label: 'Itinerario'
  }
]

const Navigation = () => {
  return (
    <header className=''>
      <nav>
        {
          routes.map(route => (
            <Link href={route.path} key={route.path}>
              {route.label}
            </Link>
          ))
        }
      </nav>
    </header>
  )
}

export default Navigation
