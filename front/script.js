const btnStartGame = document.querySelector('#JsBtnStartGame')
const inputGame = document.querySelector('#price')
const btnGame = document.querySelector('#envoyer')
const find = document.querySelector('#find')
const provisoire = document.querySelector('#provisoire')
const newGame = document.querySelector('#NewGame')
const username = document.querySelector('#username')
const blockName = document.querySelector('#blockName')
const errName = document.querySelector("#errName")


//Au clic du btn "commencer une partie"
btnStartGame.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    const username = document.querySelector("#username")
    let name = {
        'username': username.value
    }
    if (username.value !== "") {
        const blockNameUser = document.querySelector("#blockNameUser")
        inputGame.classList.remove('hidden')
        btnGame.classList.remove('hidden')
        btnStartGame.classList.add('hidden')
        blockName.classList.add('hidden')
        username.classList.add('hidden')
        blockNameUser.classList.add('hidden')
        errName.classList.add('hidden')
        fetch("http://localhost:3000/lejusteprix/user", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(name)
        })
            .then(response => response.json())
            .then(json => console.log(json))
    } else {
        errName.classList.remove('hidden')
    }
})


//Au clic du btn "Parier"
btnGame.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (inputGame.value !== "") {
        let obj = { 'price': inputGame.value }
        fetch("http://localhost:3000/lejusteprix/prix", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => console.log(json))

        fetch("http://localhost:3000/lejusteprix/", {
            method: "Get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                find.innerHTML = json.result
                provisoire.innerHTML = json.nbTentative
                const usernameScore = document.querySelector("#usernameScore")
                const score = document.querySelector("#score")
                if (json.result === "Gagné !") {
                    newGame.classList.remove('hidden')
                    inputGame.classList.add('hidden')
                    btnGame.classList.add('hidden')
                    blocScore.classList.remove('hidden')
                    find.style.color = 'red'
                    find.style.fontWeight = 'bold'
                    usernameScore.textContent = json.user.name
                    score.textContent = json.user.score
                }
                if (json.nbTentative === "Nombre de tentative restante : 0") {
                    newGame.classList.remove('hidden')
                    inputGame.classList.add('hidden')
                    btnGame.classList.add('hidden')
                    blocScore.classList.remove('hidden')
                }
            })
    } else {
        find.innerHTML = "Veuillez rentrer un nombre !"
    }
})

//Au clic du btn "nouvelle partie"
newgame.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()

    fetch("http://localhost:3000/lejusteprix/reload", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            newGame.classList.add('hidden')
            inputGame.classList.remove('hidden')
            btnGame.classList.remove('hidden')
            provisoire.innerHTML = json.nbTentative
            find.innerHTML = json.result
        })
})