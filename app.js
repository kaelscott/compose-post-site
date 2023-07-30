import express from "express"
import postRouter from "./routes/posts.js"   // importando o arquivo posts.js como { postRouter } para poder reutilizar os comandos dentro dele

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

export let posts = []   // todos os posts vao ficar dentro desta lista
// o export serve para utilizar o array em outro arquivo

app.get("/", (req, res) => {
  res.render("home.ejs", {
    startingContent: homeStartingContent,   // o texto principal para poder chamar no home.ejs
    posts: posts   // a lista de posts para poder chamar ela no home.ejs
  })
})

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    about: aboutContent   // o texto about para chamar no about.ejs
  })
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    contact: contactContent   // o texto contact para chamar no contact.ejs
  })
})

app.get("/compose", (req, res) => {
  res.render("compose.ejs")   // faz com que exista o /compose
})

app.post("/compose", (req, res) => {
  const post = {   // cria um objeto
    title: req.body.postTitle, // pega oq o user escreveu no input[name=postTitle]
    content: req.body.postBody // pega oq o user escreveu no input[name=postBody]
    //para chamar no arquivo ejs
  }
  posts.push(post)   // coloca o objeto post dentro do array posts toda vez que um post for submetido
  res.redirect("/")  // dps de ser submetido volta pra pagina inicial
  
  // document.getElementById("publish-btn").addEventListener("click", () => {
  //   document.getElementById("succes-alert").style.display = "block"

  //   setTimeout(() => {
  //     document.getElementById("succes-alert") = "none"
  //   }, 3000);
  // })
})

// a main route sera /post
app.use("/post", postRouter)   // chama o arquivo posts.js

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
