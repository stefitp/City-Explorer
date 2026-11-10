const API_URL = 'http://localhost:3002'

// Funcția cerută la Exercițiul 5c: primește pagina (implicit 1) și cere 20 de elemente
export async function getDestinatii(pagina = 1) {
  const response = await fetch(`${API_URL}/destinatii?_page=${pagina}&_per_page=20`)
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }
  return response.json()
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

export async function deleteDestinatie(id) {
  const response = await fetch(`${API_URL}/destinatii/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }
  return response.json()
}