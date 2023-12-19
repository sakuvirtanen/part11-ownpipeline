import NumberRow from './NumberRow'

const PhonebookContent = ({ persons,searchCondition, handleRemove }) => {
    return (
      <>
        <h2>Numbers</h2>
        <table>
          <tbody>
            {persons
            .filter(person =>
            person.name.toLowerCase()
            .includes(searchCondition.toLowerCase()))
            .map((person) =>
            <NumberRow key={person.name} person={person} remove={ () => handleRemove(person)} />)}
          </tbody>
        </table>
      </>
    )
  }

  export default PhonebookContent