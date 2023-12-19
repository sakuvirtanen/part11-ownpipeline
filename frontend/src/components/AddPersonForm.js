const AddPersonForm = ({handleSubmit,newName,handleName,newNumber,handleNumber}) => {
    return (
        <div>
            <h2>Add new person:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input
                        value={newName}
                        onChange={handleName} />
                </div>
                <div>
                    number: <input
                        value={newNumber}
                        onChange={handleNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddPersonForm