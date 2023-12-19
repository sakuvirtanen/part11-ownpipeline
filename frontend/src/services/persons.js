import axios from 'axios'
const resourceUrl = "/api/persons"

const getAll = () => {
    const request = axios.get(resourceUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(resourceUrl, newPerson)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${resourceUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${resourceUrl}/${id}`)
    return request.then(response => response.data)
}

const personService = {
    getAll,
    create,
    update,
    remove
}

export default personService