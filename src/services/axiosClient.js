import axios from 'axios'


const AxiosClient = axios.create({
    baseURL: 'https://api.spoonacular.com/recipes'
})

export default AxiosClient