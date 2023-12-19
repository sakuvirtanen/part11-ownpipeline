const NumberRow = ({ person, remove }) => {
    return (
        <tr>
            <td>
                {person.name}
            </td>
            <td>
                {person.number}
            </td>
            <td>
                <button onClick = {remove} >
                    remove
                </button>
            </td>
        </tr>
    )
}

export default NumberRow