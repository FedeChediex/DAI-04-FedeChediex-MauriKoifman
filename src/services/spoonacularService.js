import AxiosClient  from "./axiosClient"

const apiKey = "?apiKey=5417214e5b3b4a41941f667bd68938bc"


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

export const getRecipesByID = async (id) => {
    return AxiosClient.get(`${id}/information${apiKey}`)
    .then((response) => {
        console.log(response.data.Search)
        return response.data.Search;
        
    }).catch((error) => {
        throw error;
    });
}
