import { useState, useEffect } from 'react'
import PhonebookContent from './components/PhonebookContent'
import AddPersonForm from './components/AddPersonForm'
import FilterInput from './components/FilterInput'
import MessageBar from './components/MessageBar'
import PersonService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchCondition, setSearchCondition] = useState("")
  const [messageBarContent, setMessageBarContent] = useState(null)
  
  useEffect( () => {
    PersonService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.find(p => p.name === newName)) {
      if (window.confirm(`${newPerson.name} is already in the phonebook. Do you want to update their number?`)) {
        const updateId = persons.find(p => p.name === newName).id

        PersonService
        .update(updateId, newPerson)
        .then(response => {
          setPersons(persons.map(p => p.id !== updateId ? p : response))
          setMessageBarContent(
            {
              type: "success",
              content: `Number for ${response.name} succesfully edited`
            }
          )
          setTimeout(() => {
            setMessageBarContent(null)
          }, 5000)
          }
          )
          .catch( error => {
            setMessageBarContent(
              {
                type: "error",
                content: `Number for ${newPerson.name} has already been deleted`
              }
            )
            setTimeout(() => {
              setMessageBarContent(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== updateId))
          })
      }
    } else {
      PersonService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName("")
        setNewNumber("")
        setMessageBarContent(
          {
            type: "success",
            content: `Number for ${response.name} succesfully added`
          }
        )
        setTimeout(() => {
          setMessageBarContent(null)
        }, 5000)
      })
      .catch(err => {
        console.log(err.response.data)
        setMessageBarContent(
          {
            type: "error",
            content: `${err.response.data.error}`
          }
        )
        setTimeout(() => {
          setMessageBarContent(null)
        }, 5000)
      }
        )
    }

  }

  const handleRemove = (person) => {
    if (window.confirm(`Do you really want to remove ${person.name} from the phonebook?`)) {
      PersonService
      .remove(person.id)
      .then(response => {
        setMessageBarContent(
          {
            type: "success",
            content: `Number for ${person.name} succesfully deleted`
          }
        )
        setTimeout(() => {
          setMessageBarContent(null)
        }, 5000)
      setPersons(persons.filter(p => p.id !== person.id))
    }
      )
      .catch( error => {
        setMessageBarContent(
          {
            type: "error",
            content: `${person.name} has already been removed`
          }
        )
        setTimeout(() => {
          setMessageBarContent(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchCondition(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <MessageBar message={messageBarContent} />
      <FilterInput
        searchCondition={searchCondition}
        handleSearch={handleSearch}
      />
      <AddPersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <PhonebookContent persons={persons} searchCondition={searchCondition} handleRemove = {handleRemove} />
      <br />
      <i>Phonebook app with deployment pipeline for Full Stack Open part 11</i>
    </div>
  )

}

export default App