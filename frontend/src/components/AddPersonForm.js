const AddPersonForm = ({handleSubmit,newName,handleName,newNumber,handleNumber}) => {
    return (
        <div>
            <h2>Add new person:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input
                        id="newName"
                        value={newName}
                        onChange={handleName} />
                </div>
                <div>
                    number: <input
                        id="newNumber"
                        value={newNumber}
                        onChange={handleNumber} />
                </div>
                <div>
                    <button id="submitNew" type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddPersonForm