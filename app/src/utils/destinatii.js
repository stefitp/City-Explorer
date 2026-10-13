// lista cu numele orașelor folosind map
export const getOrase = (list) => list.map((d) => d.oras)

// doar destinațiile nevizitate folosind filter
export const getNevizitate = (list) => list.filter((d) => !d.vizitat)

//  suma totală a zilelor folosind reduce cu pornire 0
export const totalZile = (list) => list.reduce((total, d) => total + d.zile, 0)

// fomrateaza un singur obiect (destructuring, template literals, ternar)
export const formatDestinatie = ({ oras, tara, zile, vizitat }) =>
  `[${vizitat ? 'x' : ' '}] ${oras}, ${tara} (${zile} zile)`

//  distribuția numărului de destinatii pe tari
export const numarPeTara = (list) =>
  list.reduce(
    (acc, { tara }) => ({
      ...acc,
      [tara]: (acc[tara] ?? 0) + 1,
    }),
    {}
  )

// orodoneaza descrescator dupa zile pe o copie a listei ca să nu o modifice
export const sortDupaZile = (list) => [...list].sort((a, b) => b.zile - a.zile)


// Inverseaza proprietatea vizitat a destinației cu ids-ul dat (fără a modifica retul obiectelor)
export const marcheazaVizitat = (list, id) =>
  list.map((d) => (d.id === id ? { ...d, vizitat: !d.vizitat } : d))

// Adauga o destinatie nouă la finalul listei folosind spread
export const adaugaDestinatie = (list, d) => [...list, d]

// sterge destinatia cu id-ul dat returnand o lista filtrata
export const stergeDestinatie = (list, id) => list.filter((d) => d.id !== id)