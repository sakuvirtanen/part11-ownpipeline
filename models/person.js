const mongoose = require("mongoose")

const dbURL = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URL : process.env.DB_URL

mongoose
  .connect(dbURL)
  // eslint-disable-next-line no-unused-vars
  .then(resp => {
    // eslint-disable-next-line no-console
    console.log("Database connected successfully")
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log("Database connection failed:")
    // eslint-disable-next-line no-console
    console.log(error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  number: {
    type: String,
    validate: {
      validator: numb => {
        return new RegExp("(([0-9]{2})-([0-9]{5,}))|(([0-9]{3})-([0-9]{4,}))").test(numb)
      },
      message: "Phone number must be at least 8 characters long and formatted as 12-123456 or 123-12345"
    },
    required: true,
    minLength: 8
  }
})

personSchema.set("toJSON", {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = mongoose.model("Person", personSchema)