import express from "express"
import mongoose from "mongoose"
import { homeStartingContent, aboutContent, contactContent } from "../text.js"
import { Compose } from "../models.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const posts = await Compose.find()
  res.render("home.ejs", {
    startingContent: homeStartingContent,   // o texto principal para poder chamar no home.ejs
    posts: posts   // a lista de posts para poder chamar ela no home.ejs
  })
})

router.get("/about", (req, res) => {
  res.render("about.ejs", { about: aboutContent })
})

router.get("/contact", (req, res) => {
  res.render("contact.ejs", { contact: contactContent })
})

router.get("/compose", (req, res) => {
    res.render("compose.ejs")   // faz com que exista o /compose
})

router.post("/compose", async (req, res) => {
  const postTitle = req.body.postTitle
  const postBody = req.body.postBody

  try {
    const titleExists = await Compose.findOne({ title: req.body.postTitle})

    if (titleExists) {
      res.render("compose.ejs", { error: "O título já existe. Escolha outro título." })
    } else {
      const post = new Compose ({
        title: postTitle,
        content: postBody
      })
      await post.save()
      res.redirect("/")
    }
  } catch (error) {
    console.error("Erro ao criar post:", error);
    res.status(500).send("Erro Interno do Servidor");
  }
})


export default router;
