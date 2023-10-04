import axios from 'axios'


const AxiosClient = axios.create({
    baseURL:'http://challenge-react.alkemy.org/'
})
export const login = async(data)=>{
    return AxiosClient.post('', data).then(response => response.data )
    
    .catch( error => {
        console.log(error)
        throw error
    })
}
export default AxiosClient