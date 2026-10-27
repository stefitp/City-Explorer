import { useState } from 'react'
import { destinatii as destinatiiInitiale } from './data/destinatii.js'
import { getNevizitate, totalZile, marcheazaVizitat } from './utils/destinatii.js'
import Rezumat from './components/Rezumat.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState(destinatiiInitiale)

  function handleToggle(id) {
    setDestinatii((curent) => marcheazaVizitat(curent, id))
  }

  const total = destinatii.length
  const nevizitate = getNevizitate(destinatii).length
  const zile = totalZile(getNevizitate(destinatii))

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat total={total} nevizitate={nevizitate} zile={zile} />
      <ListaDestinatii destinatii={destinatii} onToggle={handleToggle} />
    </main>
  )
}