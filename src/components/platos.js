import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getRecipesById } from "../../services/spoonacularService";
import { ListChildStyle } from "./styles";

const platos = ({ item, pressed, setPressed, index }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRecipe(null);
  }, [pressed]);

  const onViewPressed = () => {
    setLoading(true);
    getRecipesById(item.imdbID)
      .then((response) => {
        setLoading(false);
        setRecipe(response);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    setPressed(index === pressed ? null : index);
  };
  return (
    <TouchableOpacity onPress={onViewPressed}>
      {loading && <ActivityIndicator size="large" color="#00ff00" />}
      <View
        style={[
          ListChildStyle.item,
          { backgroundColor: pressed === index ? "#00ffff" : "#ececec" },
        ]}
      >
        <Image
          style={ListChildStyle.tinyLogo}
          source={{
            uri: item.Poster,
          }}
        />
        <Text style={ListChildStyle.title}>{item.Title}</Text>
        {recipe && pressed === index && (
          <View
            style={[
              ListChildStyle.item,
              { backgroundColor: pressed === index ? "#00ffff" : "#ececec" },
            ]}
          >
            <Text>{recipe.Country}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default platos;