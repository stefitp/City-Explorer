import { useState, useEffect } from 'react'
import { getDestinatii, patchVizitat } from './api/destinatii.js'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import Rezumat from './components/Rezumat.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)

  useEffect(() => {
    async function incarca() {
      try {
        const date = await getDestinatii()
        setDestinatii(date)
      } catch (err) {
        setEroare(err.message)
      } finally {
        setIncarcare(false)
      }
    }
    incarca()
  }, [])

  async function handleToggle(id) {
    const tinta = destinatii.find((d) => d.id === id)
    if (!tinta) return
    try {
      const salvata = await patchVizitat(id, !tinta.vizitat)
      setDestinatii((curent) =>
        curent.map((d) => (d.id === id ? salvata : d))
      )
    } catch (err) {
      alert(`Eroare la actualizare: ${err.message}`)
    }
  }

  if (incarcare) return <main><p className="stare">Se încarcă destinațiile...</p></main>
  if (eroare) return <main><p className="stare eroare">Nu am putut încărca datele: {eroare}</p></main>

  const nevizitate = getNevizitate(destinatii)

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZile(nevizitate)}
      />
      <FormularDestinatie onAdd={() => {}} />
      <ListaDestinatii destinatii={destinatii} onToggle={handleToggle} />
    </main>
  )
}