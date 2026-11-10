import { useState, useEffect } from 'react'
import { getDestinatii, patchVizitat, postDestinatie } from './api/destinatii.js'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import Rezumat from './components/Rezumat.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [seTrimite, setSeTrimite] = useState(false)

  // 1. Încărcarea datelor la pornirea aplicației (Exercițiul 1b)
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

  // 2. Marcarea destinației pe server cu PATCH (Exercițiul 1c)
  async function handleToggle(id) {
    const tinta = destinatii.find((d) => d.id === id)
    if (!tinta) return

    try {
      const salvata = await patchVizitat(id, !tinta.vizitat)
      setDestinatii((curent) =>
        curent.map((d) => (d.id === id ? salvata : d))
      )
    } catch (err) {
      alert(`Eroare la actualizarea destinației: ${err.message}`)
    }
  }

  // 3. Adăugarea destinației noi pe server cu POST (Exercițiul 2c)
  async function handleAdd(destinatieNoua) {
    setSeTrimite(true)
    try {
      const salvata = await postDestinatie(destinatieNoua)
      setDestinatii((curent) => [...curent, salvata])
      return true
    } catch (err) {
      alert(`Eroare la adăugarea destinației: ${err.message}`)
      return false
    } finally {
      setSeTrimite(false)
    }
  }

  // Afișarea stării de încărcare (Exercițiul 1b)
  if (incarcare) {
    return (
      <main>
        <p className="stare">Se încarcă destinațiile...</p>
      </main>
    )
  }

  // Afișarea stării de eroare dacă serverul nu răspunde (Exercițiul 1b)
  if (eroare) {
    return (
      <main>
        <p className="stare eroare">Nu am putut încărca datele: {eroare}</p>
      </main>
    )
  }

  const nevizitate = getNevizitate(destinatii)

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZile(nevizitate)}
      />
      <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
      <ListaDestinatii destinatii={destinatii} onToggle={handleToggle} />
    </main>
  )
}