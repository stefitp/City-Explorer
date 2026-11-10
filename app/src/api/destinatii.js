const API_URL = 'http://localhost:3001'

export async function getDestinatiiPaginat(pagina = 1, perPage = 20) {
  const response = await fetch(`http://localhost:3002/destinatii?_page=${pagina}&_per_page=${perPage}`)
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }
  return response.json() // întoarce { pages, items, data, first, next, ... }
}

export async function postDestinatie(destinatie) {
  const response = await fetch(`${API_URL}/destinatii`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(destinatie),
  })
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }
  return response.json()
}

export async function patchVizitat(id, vizitat) {
  const response = await fetch(`${API_URL}/destinatii/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vizitat }),
  })
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }
  return response.json()
}