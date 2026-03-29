import { MOVIE } from "../types/movies.type";
import api from "./api"

const getMovies = async()=> {
    const data = await api.get('/movies')
     const res = data.data.data;
     return res
}
const getSingleMovies = async(id : string)=> {
const data = await api.get(`/movies/${id}`)
     const res = data.data;
     return res
}
const deleteMovies = async(id : string)=> {
    const data = await api.delete(`/movies/${id}`)
     const res = data.data;
     return res
}
const updateMovies = async(id : string, payload?: MOVIE)=> {
    const data = await api.patch(`/movies/${id}`, payload)
     const res = data.data;
     return res
}
const createMovies = async(payload: MOVIE)=> {
    const data = await api.post('/movies', payload)
     const res = data.data;
     return res
}

export const moviesRoute = {
    getMovies ,
    getSingleMovies,
    deleteMovies,
    updateMovies ,
    createMovies
}