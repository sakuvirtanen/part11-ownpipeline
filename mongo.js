const mongoose = require("mongoose")

const password = process.argv[2]
const dbURL = `mongodb+srv://puh-frontend:${password}@cluster.xwbee9o.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
  mongoose.connect(dbURL)
  Person
    .find()
    .then(results => {
      results.forEach(p => {
        // eslint-disable-next-line no-console
        console.log(`${p.name} ${p.number}`)
      })
      mongoose.connection.close()
    })
}
else if (process.argv.length < 5) {
  // eslint-disable-next-line no-console
  console.log("Too few arguments. Args should include DB password, name (String), and phone number (String) of person to be added")
  process.exit(1)
} else {
  const newName = process.argv[3]
  const newNumber = process.argv[4]

  mongoose.connect(dbURL)

  const person = new Person({
    name: newName,
    number: newNumber
  })

  person
    .save()
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      // eslint-disable-next-line no-console
      console.log(`Added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
}