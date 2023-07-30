import express from "express"
import _ from "lodash"   // usado neste projeto para ser usado no url
import { posts } from "../app.js"   // importa o array posts do arquivo app.js

const router = express.Router()

// por ter especificado que a route principal seria /post eu nao preciso escreve-la

router
//    ("/post/:postName")
.route("/:postName")// os dois pontos servem para identificar oq foi escrito na url
.get((req, res) => {
    // req.params.postName pega oq foi escrito na url dps do /post/
    // decodeURIComponent decodifica a url
    // _.lowerCase deixa a url em minusculo e da pra pesquisar com hifen ex(amo-pe)
    const requestedTitle = _.lowerCase(decodeURIComponent(req.params.postName))
    // procura dentro do array posts um titulo igual ao q o user colocou no url
    const post = posts.find((post) => requestedTitle === _.lowerCase(post.title))

    if (post) {   // se o titulo foi encontrado o user é levado pro post.ejs
        res.render("post.ejs", {
            title: post.title,   // pega o titulo/conteudo do post que foi
            content: post.content // encontrado dentro do posts.find
        })
    } else {   // se nao existir o post digitado aparece msg de
        res.status(404).json({ message: "post nao encontrado" })
    }
})
.put((req, res) => {
    res.send(`update id: ${req.params.postName}`)
})
.delete((req, res) => {
    res.send(`delete id: ${req.params.postName}`)
})



export default router   // exporta esse arquivo para ser utilizado no app.js