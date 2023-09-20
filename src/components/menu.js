import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, Text } from "react-native";
import { getRecipesByName } from "../services/spoonacularService";
import { ListComponentStyle } from "./styles";
import platos from "./platos";
import { useContextState } from "../contextState";

const Menu = ({ search }) => {
  const { contextState, setContextState } = useContextState();
  const [pressed, setPressed] = useState({});

  const renderItem = ({ item, index }) => (
    <platos
      item={item}
      index={index}
      pressed={pressed}
      setPressed={setPressed}
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
  }, []);

  return (
    <SafeAreaView style={ListComponentStyle.container}>
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

export default Menu;