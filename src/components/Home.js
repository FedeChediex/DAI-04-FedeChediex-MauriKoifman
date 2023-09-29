import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, Text, TextInput } from "react-native";
import { getRecipesByName } from "../services/spoonacularService";
import { ListComponentStyle } from "./styles";
import ListChild from "./ListChild";

import { ActionTypes, useContextState } from "../contextState"

const Home = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [pressed, setPressed] = useState({});
  const [search, setSearch] = useState('');

  const renderItem = ({ item, index }) => (
    <ListChild
      item={item}
      index={index}
      pressed={pressed}
      setPressed={setPressed}
      navigation={navigation} 
      
    />
  );
useEffect(() => {
  setContextState({ newValue: true, type: ActionTypes.setLoading });
  console.log("Search query:", search); 
  getRecipesByName(search)
    .then((response) => {
      console.log("API Response:", response); 
      setContextState({ newValue: false, type: ActionTypes.setLoading });
      setContextState({ newValue: response, type: ActionTypes.setRecipes });
    })
    .catch((error) => {
      console.log("Error:", error); 
      setContextState({ newValue: false, type: ActionTypes.setLoading });
    });
  return;
}, [search]);

  return (
    <SafeAreaView style={ListComponentStyle.container}>
      <TextInput value={search} onChangeText={setSearch}/>
      {contextState?.loading && (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
      <FlatList
        data={contextState?.allRecipes ?? []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Home;
