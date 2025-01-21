const buscarPersonaje = () => {
    const inputNombre = document.getElementById('nombre-personaje')
    const contenedorResultados = document.getElementById('contenedor-resultados')

    const nombrePersonaje = inputNombre.value.toLowerCase()

    fetch(`http://localhost:3000/characters/${nombrePersonaje}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encuentra el personaje')
            }
            return response.json()
        })
        .then(data => {
            console.log(data);

            if (data.length > 0) {
                const { name, status, species, gender, origin, image } = data[0]
                contenedorResultados.innerHTML = `
                    <div id="carta">
                        <h2>${name}</h2>
                        <img src="${image}" alt="${name}">
                        <p>Status: ${status}</p>
                        <p>Species: ${species}</p>
                        <p>Gender: ${gender}</p>
                        <p>Origin: ${origin.name}</p>
                    </div>
                `
            } else {
                contenedorResultados.innerHTML = `<p>No se encuentra el personaje que buscas</p>`;
            }
        })
        .catch(error => {
            console.error(error)            
            contenedorResultados.innerHTML = `<p>No se puede acceder al personaje</p>`
        })
}

document.getElementById('formulario-buscar').addEventListener('submit', (event) => {
    event.preventDefault()
    buscarPersonaje()
})