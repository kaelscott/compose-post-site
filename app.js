import express from "express"
import mongoose from "mongoose"
import mainRoutes from "./routes/main.js"
import postRouter from "./routes/posts.js"   // importando o arquivo posts.js como { postRouter } para poder reutilizar os comandos dentro dele


mongoose.connect("mongodb://0.0.0.0:27017/composeDB")

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


app.use("/", mainRoutes)


// a main route sera /post
app.use("/post", postRouter)   // chama o arquivo posts.js

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
