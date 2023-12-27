const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require("../index")
const Person = require("../models/person")

const api = supertest(app)

const initialPeople = [
  {
    name: "First person",
    number: "123-12345"
  },
  {
    name: "Second person",
    number: "12-123456"
  }
]

beforeEach(async () => {
  await Person.deleteMany({})
  await Person.insertMany(initialPeople)
})

describe("A GET to /api/persons", () => {
  test("returns the initial persons", async () => {
    const returnedPeople = await api.get("/api/persons").expect(200)

    expect(returnedPeople.body.length).toEqual(initialPeople.length)
  })
})

describe("A POST to /api/persons", () => {
  test("returns 201 on valid request and adds record to persons", async () => {
    const goodPayload = {
      name: "This number is ok",
      number: "044-123223"
    }

    await api.post("/api/persons").send(goodPayload).expect(201)

    const newContent = await api.get("/api/persons")

    expect(newContent.body.length).toEqual(initialPeople.length + 1)
  })

  test("returns 400 and error in body when number does not begin with xx- or xxx-", async () => {
    const badPayload = {
      name: "This number is not ok",
      number: "12345678"
    }

    const responseToBad = await api.post("/api/persons").send(badPayload).expect(400)

    expect(responseToBad.body).toHaveProperty("error")
  })
})

afterAll(() => {
  mongoose.connection.close()
})