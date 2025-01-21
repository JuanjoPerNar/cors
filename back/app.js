const express = require('express')
const axios = require('axios')
const cors = require('cors')

const PORT = 3000
const app = express()


app.use(cors())

app.get('/characters/', async (req, res) => {
    const url = 'https://rickandmortyapi.com/api/character/'

    try {
        const response = await axios.get(url)

        //console.log(response.data.results);
        res.json(response.data.results)        
    } catch (error) {
        res.status(404).json({error: 'No se encuentran los personajes'})
    }
})

app.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name.toLowerCase()
    const url = `https://rickandmortyapi.com/api/character/?name=${characterName}`

    try {
        const response = await axios.get(url)

        res.json(response.data.results)        
    } catch (error) {
        res.status(404).json({error: 'No se encuentra el personaje'})
    }
})

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}/characters/`)    
})
