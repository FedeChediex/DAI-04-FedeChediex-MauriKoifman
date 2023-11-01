import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getRecipesByID } from "../services/spoonacularService";
import { ListChildStyle } from "./styles";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const ListChild = ({ item, pressed, index, navigation}) => {
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    setRecipe(null);
  }, []);

  const onViewPressed = () => {
    navigation.navigate("detalle", {id: item.id})
  };
  return (
    
      <View
        style={[
          ListChildStyle.item,
          { backgroundColor: pressed === index ? "#00ffff" : "#00000" },
        ]}
      ><TouchableOpacity onPress={onViewPressed} 
          style={[
          ListChildStyle.button,
        ]}>
        
        
        <Image 
          style={ListChildStyle.tinyLogo}
          source={{
            uri: item.image,
          }}
        /></TouchableOpacity>
        <Text style={ListChildStyle.title}>{item.title}</Text>
        {recipe && pressed === index && (
          <View
            style={[
              ListChildStyle.item,
              { backgroundColor: pressed === index ? "#00ffff" : "#00000" },
            ]}
          >
            <Text>{recipe.Country}</Text>
          </View>
        )}
      
    </View>
  );
};

export default ListChild;