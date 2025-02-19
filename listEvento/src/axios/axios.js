import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:5000/api/v1/",
    headers:{
        'accept':'applicatipon/json'
    }
});

const sheets = {
    getEventos:()=>api.get("evento/")
}

export default sheets;