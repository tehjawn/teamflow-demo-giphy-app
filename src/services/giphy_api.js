import axios from "axios"

const apiKey = 'API_KEY_HERE'

const getTrendingGIFs = () => {
    return axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
}

const getSearchedGIFs = (searchTerm) => {
    return axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}`)
}

export {
    getTrendingGIFs,
    getSearchedGIFs
}