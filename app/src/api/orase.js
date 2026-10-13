const API_URL = 'https://jsonplaceholder.typicode.com'

// lista completa de 10 utilizatori
export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}

// un singur utilizator dupa id 
export async function fetchUserById(id) {
  const response = await fetch(`${API_URL}/users/${id}`)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}