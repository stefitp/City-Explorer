import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// ===== Laboratorul 2 =====
import { destinatii } from './data/destinatii.js'
import {
  getOrase,
  getNevizitate,
  totalZile,
  formatDestinatie,
  numarPeTara,
  sortDupaZile,
  marcheazaVizitat,
  adaugaDestinatie,
  stergeDestinatie,
} from './utils/destinatii.js'

// --- Exercițiul 1 ---
console.log('L2 Ex. 1 orașe:', getOrase(destinatii))
console.log('L2 Ex. 1 nevizitate:', getNevizitate(destinatii).length)
console.log('L2 Ex. 1 zile de vizitat:', totalZile(getNevizitate(destinatii)))
console.log(destinatii.map(formatDestinatie).join('\n'))
console.log('L2 Ex. 1 pe țară:', numarPeTara(destinatii))
console.log('L2 Ex. 1 cea mai lungă vizită:', sortDupaZile(destinatii)[0].oras)

// --- Exercițiul 2 ---
const dupaMarcare = marcheazaVizitat(destinatii, '1')
console.log('L2 Ex. 2 original:', destinatii[0].vizitat, 'listă nouă:', dupaMarcare[0].vizitat)
console.log('L2 Ex. 2 element refolosit:', destinatii[1] === dupaMarcare[1])

const noua = { id: '7', oras: 'Sevilla', tara: 'Spania', zile: 3, vizitat: false }
const dupaAdaugare = adaugaDestinatie(destinatii, noua)
console.log('L2 Ex. 2 după adăugare: original', destinatii.length, ', listă nouă', dupaAdaugare.length)

const dupaStergere = stergeDestinatie(dupaAdaugare, '7')
console.log('L2 Ex. 2 după ștergere:', dupaStergere.length)