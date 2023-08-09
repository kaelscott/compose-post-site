import express from "express"
import _ from "lodash"   // usado neste projeto para ser usado no url
import { Compose } from "../models.js"

const router = express.Router()

// por ter especificado que a route principal seria /post eu nao preciso escreve-la

router
//    ("/post/:postName")
router.get("/:postName", async (req, res) => {
    try{
        const requestedTitle = _.lowerCase(decodeURIComponent(req.params.postName))
        const post = await Compose.findOne({ title: requestedTitle}).exec()
        if (post) {   // se o titulo foi encontrado o user é levado pro post.ejs
            res.render("post.ejs", {
                title: post.title,   // pega o titulo/conteudo do post que foi
                content: post.content, // encontrado dentro do posts.find
            })
        } else {   // se nao existir o post digitado aparece msg de
            res.status(404).json({ message: "post nao encontrado" })
        }
    } catch (error) {
        console.error("Erro ao buscar post:", error);
        res.status(500).send("Erro Interno do Servidor");
    }
})

router.post("/:postName/delete", async (req, res) => {
    const requestedTitle = _.lowerCase(decodeURIComponent(req.params.postName))

    if (req.body.hasOwnProperty("delete")) {
        const deletedPost = await Compose.findOneAndDelete({ title: requestedTitle })
        if (deletedPost) {
            res.redirect("/")
        }
    }
})




export default router   // exporta esse arquivo para ser utilizado no app.js