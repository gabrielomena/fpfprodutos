const express = require("express")
const routes = require("./routes/routes")
const cors = require("cors")
const app = express()
require("dotenv").config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use("/", routes)

app.listen(process.env.PORT, () => {
  console.log("Servidor Rodando!")
})
