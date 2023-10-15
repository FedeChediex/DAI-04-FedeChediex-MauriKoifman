import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator, Text, TextInput } from "react-native";
import { getRecipesByName } from "../services/spoonacularService";
import { ListComponentStyle } from "./styles";
import ListChild from "./Listchild.js";

import { ActionTypes, useContextState } from "../contextState"

const Buscador = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [search, setSearch] = useState('');
  const [buscar, setBuscar] = useState(false)

  const renderItem = ({ item, index}) => (
    <ListChild
      item={item}
      index={index}
      navigation={navigation}
    />
  );

  const handleKeyPress = (event, values) => {
    if (event.key === 'Enter') {
      setBuscar(!buscar)
    }
  }


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
  }, [buscar]);

  return (
    <SafeAreaView style={ListComponentStyle.container}>
      <TextInput value={search} onChangeText={setSearch} onKeyPress={(e) => { handleKeyPress(e) }} />
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

export default Buscador;
