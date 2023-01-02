const express = require('express')
const axios = require('axios');

var cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000

// initialise middelware to send json data as response
app.use(express.json({ extended: false }))
app.use(cors())


app.get('/recentlyUploaded', (req, res) => {

    axios.get(`https://yts.mx/api/v2/list_movies.json?sort_by=date_added&limit=20&page=${1}`)
        .then(function (response) {
            res.status(200).send(response.data.data)
        })
})
app.get('/search', (req, res) => {
    const { searchMovie, page } = req.query;
    console.log(searchMovie, page)
    axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${searchMovie}&sort_by=like_count&page=${page}`)
        .then(function (response) {
            res.status(200).send(response.data.data)
        })
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})