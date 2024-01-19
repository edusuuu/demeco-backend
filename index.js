let express = require("express")
let { db } = require("./firebase")
let bcrypt = require("bcrypt")
require("dotenv").config()
const cors = require("cors")

let app = express()
const PORT = 8080

// GLOBAL MIDDLEWARES
app.use(express.json())
app.use(require("body-parser").urlencoded({ extended: false }))
app.use(cors());



// ROUTES OR ENDPOINTS

app.post("/login", async (req, res) => {
  let { username, password } = req.body
  console.log(username, password)
  let userRef = await db.collection("accounts").doc(username)
  let user = await userRef.get()
  if (user.exists) {
    try {
      let validPasssword = await bcrypt.compare(password, user.data().password)
      if (validPasssword) res.send({ "success": true })
      else res.send({ "success": false })
    } catch (error) {
      console.log(error.message)
      res.end()
    }
  }
})

app.post("/register", async (req, res) => {
  let { username, password, fname, lname, gender, bday, email, phonenum } = req.body;
  let userRef = db.collection("accounts").doc(username);

  let hash = bcrypt.hashSync(password, 10);

  // You can adjust the fields here based on your Firebase data model
  await userRef.set({
      username: username,
      password: hash,
      fname: fname,
      lname: lname,
      gender: gender,
      bday: bday,
      email: email,
      phonenum: phonenum
  });

  res.status(201).send({ "success": true });
});


// APP RUNNING ON PORT 6969
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
