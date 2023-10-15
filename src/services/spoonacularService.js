import AxiosClient  from "./axiosClient"

const apiKey = "?apiKey=a4c83ab221cd481fa6965d373c517709"


export const getRecipesByName = async (title) => {
    try {
      const response = await AxiosClient.get(`/complexSearch${apiKey}&query=${title}`);
  
      if (response.data && response.data.results) {
        console.log(response.data.results);
        return response.data.results;
      } else {
        throw new Error("No recipe data found in the API response.");
      }
    } catch (error) {
      throw error;
    }
  };

export const getRecipesById = async (id) => {
  console.log(id)
    return AxiosClient.get(`/${id}/information${apiKey}`)
    .then((response) => {
        console.log(response.data)
        return response.data;
        
    }).catch((error) => {
        throw error;
    });
}
