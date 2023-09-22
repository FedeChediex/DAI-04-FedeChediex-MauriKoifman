import AxiosClient  from "./axiosClient"

const apiKey = "?apiKey=58b6a634f61b4a6b814738e625053e19"


export const getRecipesByName = async (title) => {
    return AxiosClient.get(`/complexSearch${apiKey}&query=${title}`)
    .then((response) => {
        console.log(response.data.Search)
        return response.data.Search;
        
    }).catch((error) => {
        throw error;
    });
}

export const getRecipesByID = async (id) => {
    return AxiosClient.get(`${id}/information${apiKey}`)
    .then((response) => {
        console.log(response.data.Search)
        return response.data.Search;
        
    }).catch((error) => {
        throw error;
    });
}
