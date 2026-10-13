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
} from './utils/destinatii.js'

console.log('L2 Ex. 1 orașe:', getOrase(destinatii))
console.log('L2 Ex. 1 nevizitate:', getNevizitate(destinatii).length)
console.log('L2 Ex. 1 zile de vizitat:', totalZile(getNevizitate(destinatii)))
console.log(destinatii.map(formatDestinatie).join('\n'))
console.log('L2 Ex. 1 pe țară:', numarPeTara(destinatii))
console.log('L2 Ex. 1 cea mai lungă vizită:', sortDupaZile(destinatii)[0].oras)