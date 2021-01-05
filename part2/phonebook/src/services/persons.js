import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data)
}

const remove = (newObject, id) => {
    const request = axios.delete(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data)
}

const updateNumber = (newObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    remove,
    updateNumber
}