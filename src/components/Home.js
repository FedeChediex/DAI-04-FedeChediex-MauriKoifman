import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, Text } from "react-native";
import { getRecipesByName } from "../services/spoonacularService";
import { ListComponentStyle } from "./styles";
import ListChild from "./ListChild";

import { ActionTypes, useContextState } from "../contextState"

const Home = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [pressed, setPressed] = useState({});
  const [search, setSearch] = useState();

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
    getRecipesByName(search)
      .then((response) => {
        setContextState({ newValue: false, type: ActionTypes.setLoading });
        setContextState({ newValue: response, type: ActionTypes.setRecipes });
      })
      .catch((error) => {
        console.log(error);
        setContextState({ newValue: false, type: ActionTypes.setLoading });
      });
    return;
  }, [Search]);

  return (
    <SafeAreaView style={ListComponentStyle.container}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {contextState?.loading && (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
      <Text>{search}</Text>
      <FlatList
        data={contextState?.allRecipes ?? []}
        renderItem={renderItem}
        keyExtractor={(item) => item.Title}
      />
    </SafeAreaView>
  );
};

export default Home;
