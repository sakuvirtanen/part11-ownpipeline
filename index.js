const express = require("express")
require("dotenv").config()
const cors = require("cors")
const morgan = require("morgan")
const Person = require("./models/person")
const app = express()

app.use(express.static("build"))
app.use(express.json())
app.use(cors())

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms",
    JSON.stringify(req.body)
  ].join(" ")
}))

app.get("/info", (req, res, next) => {
  Person
    .countDocuments()
    .then(countRes => {
      if (countRes) {
        res.send(`Phonebook has info for ${countRes} people
    </br>
    ${new Date()}`)
      } else {
        res.send(`Number of database entries not available
    </br>
    ${new Date()}`)
      }
    })
    .catch(err => next(err))
})

app.get("/api/persons", (req, res, next) => {
  Person
    .find()
    .then(people => {
      res.json(people)
    })
    .catch(err => next(err))
})

app.get("/api/persons/:id", (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.post("/api/persons", (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: `Invalid input.${body.name ? "" : " Name missing."} ${body.number ? "" : " Number missing."}`
    })
  }
  /*
        if (persons.find(p => p.name === body.name)) {
            return res.status(400).json({
                error: "Name must be unique"
            })
        }
    */
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(err => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
  const newPerson = {
    name: req.body.name,
    number: req.body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, newPerson, { new: true })
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {

  if (err.name === "CastError") {
    return res.status(400).send({ error: "Incorrect id format" })
  } else if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`)
})