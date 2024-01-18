let express = require("express")
let { db } = require("./firebase")
let bcrypt = require("bcrypt")
require("dotenv").config()

let app = express()
const PORT = 8080

// GLOBAL MIDDLEWARES
app.use(express.json())
app.use(require("body-parser").urlencoded({ extended: false }))


// ROUTES OR ENDPOINTS

app.post("/login", async (req, res) => {
  let { username, password } = req.body
  let userRef = await db.collection("accounts").doc(username)
  let user = await userRef.get()
  if (user.exists) {
    let validPasssword = bcrypt.compareSync(password, user.data().password)
    if (validPasssword) res.send({ "success": true })
    else res.send({ "success": false })
  }
})

app.post("/register", async (req, res) => {
  let { username, password } = req.body;
  let userRef = db.collection("accounts").doc(username)

  let hash = bcrypt.hashSync(password, 10)
  await userRef.set({ username: username, password: hash })
  res.status(201).send({ "success": true })
})


// APP RUNNING ON PORT 6969
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
