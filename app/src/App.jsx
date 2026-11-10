import { useState, useEffect } from 'react'
import { getDestinatii, patchVizitat, postDestinatie } from './api/destinatii.js'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import Rezumat from './components/Rezumat.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import Cautare from './components/Cautare.jsx'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [seTrimite, setSeTrimite] = useState(false)
  const [cautare, setCautare] = useState('')

  // Stări pentru paginare (Exercițiul 5c)
  const [pagina, setPagina] = useState(1)
  const [totalPagini, setTotalPagini] = useState(1)

  // Încărcarea re-executată la fiecare schimbare a stării pagina
  useEffect(() => {
    async function incarca() {
      setIncarcare(true)
      try {
        const rezultat = await getDestinatii(pagina)
        // json-server paginat returnează { pages, data, ... }
        setDestinatii(rezultat.data)
        setTotalPagini(rezultat.pages)
      } catch (err) {
        setEroare(err.message)
      } finally {
        setIncarcare(false)
      }
    }
    incarca()
  }, [pagina])

  // Marcarea unei destinații pe server cu PATCH
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

  // Adăugarea unei destinații noi pe server cu POST
  async function handleAdd(destinatieNoua) {
    setSeTrimite(true)
    try {
      const salvata = await postDestinatie(destinatieNoua)
      setDestinatii((curent) => [...curent, salvata])
      return true
    } catch (err) {
      alert(`Eroare la adăugare: ${err.message}`)
      return false
    } finally {
      setSeTrimite(false)
    }
  }

  if (incarcare && destinatii.length === 0) {
    return (
      <main>
        <p className="stare">Se încarcă destinațiile...</p>
      </main>
    )
  }

  if (eroare) {
    return (
      <main>
        <p className="stare eroare">Nu am putut încărca datele: {eroare}</p>
      </main>
    )
  }

  // Calculele pentru rezumat (lucrează pe pagina curentă în varianta paginată)
  const nevizitate = getNevizitate(destinatii)
  const text = cautare.trim().toLowerCase()
  const afisate = destinatii.filter(
    (d) =>
      d.oras.toLowerCase().includes(text) ||
      d.tara.toLowerCase().includes(text)
  )

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZile(nevizitate)}
      />
      <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
      <Cautare valoare={cautare} onChange={setCautare} />

      {/* Mesaje pentru lista goală conform Exercițiului 3c */}
      {destinatii.length === 0 ? (
        <p className="gol">Nu există nicio destinație. Adaugă prima din formular.</p>
      ) : afisate.length === 0 ? (
        <p className="gol">Niciun rezultat pentru „{cautare}”.</p>
      ) : (
        <ListaDestinatii destinatii={afisate} onToggle={handleToggle} />
      )}

      {/* Controalele de paginare: butoanele Înapoi, Înainte și textul N din M*/}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginTop: '1.5rem' }}>
        <button
          type="button"
          disabled={pagina === 1}
          onClick={() => setPagina((p) => p - 1)}
        >
          Înapoi
        </button>
        <span>
          pagina {pagina} din {totalPagini}
        </span>
        <button
          type="button"
          disabled={pagina === totalPagini}
          onClick={() => setPagina((p) => p + 1)}
        >
          Înainte
        </button>
      </div>
    </main>
  )
}