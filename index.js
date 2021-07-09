const express = require('express')
const app = express()
const port = process.env.PORT | 3000
const cors = require('cors')


app.use(express.json())
app.use(cors())

let justePrix = Math.floor(Math.random() * (100 - 0) + 0)
let prix = 0
let nbTentative = 10


let send = {
    "nbTentative": `Nombre de tentative restante : ${nbTentative}`,
    "result": "",
    "user": {
        "name": "",
        "score": 0
    }
}

// POST => Route qui envoie un prix
app.post("/lejusteprix/prix", (req, res) => {
    prix = req.body.price
    res.json('Envoie OK')
})

//GET => Route qui récupère le résultat
app.get('/lejusteprix/', (req, res) => {
    nbTentative--
    send.nbTentative = `Nombre de tentative restante : ${nbTentative}`    
    if (nbTentative !== 0) {
        if (parseInt(prix) === justePrix) {
            send.result = 'Gagné !'
            send.user.score++
            res.json(send)
        } else if (parseInt(prix) > justePrix) {
            send.result = 'Plus petit !'
            res.json(send)
        } else {
            send.result = 'Plus grand !'
            res.json(send)
        }
    } else {
        send.result = `Vous n'avez pas trouvé le chiffre. Le chiffre était ${justePrix}`
        res.json(send)
    }
})

//Route pour ajouter un utilisateur
app.put('/lejusteprix/user', (req, res) => {
    send.user.name = req.body.username
    res.json(send.user.name)
})


//Route pour relancer une partie
app.put('/lejusteprix/reload', (req, res) => {
    justePrix = Math.floor(Math.random() * (100 - 0) + 0)
    prix = 0
    nbTentative = 10
    send.nbTentative= `Nombre de tentative restante : ${nbTentative}`
    send.result = "Trouvez le Juste Prix !"
    res.json(send)
})

app.listen(port)
