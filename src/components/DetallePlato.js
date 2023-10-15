import * as React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from "react";
import { ActionTypes, useContextState } from "../contextState"
import { getRecipesById } from '../services/spoonacularService';
import { ListChildStyle } from './styles';

const DetallePlato = ({ navigation, route }) => {
  const [plato, setPlato] = useState({});
  const [platoExistente, setPlatoExistente] = useState(false);
  const [cantidadPlatos, setCantidadPlatos] = useState(0);
  const { contextState, setContextState } = useContextState();

  
  useEffect(() => {
    setContextState({ newValue: true, type: ActionTypes.setLoading });

    getRecipesById(route.params.id)
      .then((response) => {
        
        setPlato(response);
        // Verifica si el plato está en el menú al cargar la pantalla
        setContextState({})

        const menuActual = contextState?.menu || [];
        const platoExistente = menuActual.find((item) => item.id === response.id);

        platoExistente ? setPlatoExistente(true) : setPlatoExistente(false);
          ; 
      })
      .catch((error) => {
        console.log(error);
        setContextState({ newValue: false, type: ActionTypes.setLoading });
      })
      .finally(() => {
        setContextState({ newValue: false, type: ActionTypes.setLoading });
      })

  }, []);

  const Eliminar = () => {
    const menu = contextState?.menu || [];

    const nuevoMenu =  menu.filter((item) => item.id !== plato.id);

    setContextState({ newValue: nuevoMenu, type: ActionTypes.setMenu });

    setCantidadPlatos(cantidadPlatos - 1);
    navigation.navigate("menu");
  };

  const onPressed = () => {
    const menuActual = contextState?.menu || [];
  
    const limiteVegano = menuActual.filter((item) => item.vegan).length;
    const limiteNoVegano = menuActual.filter((item) => !item.vegan).length;
    const limitePlatos = menuActual.length >= 4;
  
    if (limitePlatos) {
      Alert.alert('Error', 'Llegaste al límite de platos en el menú.');
    } else if (plato.vegan && limiteVegano >= 2) {
      Alert.alert('Error', 'Llegaste al límite de platos veganos agregados.');
    } else if (!plato.vegan && limiteNoVegano >= 2) {
      Alert.alert('Error', 'Llegaste al límite de platos no veganos agregados.');
    } else {
      console.log("Este es el plato: " + plato.title); // Debes acceder a plato.title en lugar de plato.plato
      console.log("Este es el menú actual: " + menuActual.map(item => item.title).join(', '));
      agregarPlato(menuActual);
    }
  };
  

  const agregarPlato = (menuActual) => {
    const nuevoMenu = [...menuActual, plato];

    setContextState({ newValue: true, type: ActionTypes.setLoading })
    setContextState({ newValue: nuevoMenu, type: ActionTypes.setMenu });

    setCantidadPlatos(cantidadPlatos + 1);
    navigation.navigate("menu");
  };

  return (
    <View style={styles.container}>
      {contextState.loading && <ActivityIndicator size="large" color="#00ff00" />}

      <Text style={styles.title}>{plato.title}</Text>

      <Image
        style={styles.image}
        source={{ uri: plato.image }}
      />
      <Text style={ListChildStyle.title}>Precio del plato seleccionado: ${plato.pricePerServing}</Text>
      <Text style={ListChildStyle.title}>{plato.vegan ? "Si" : "No"} es vegano</Text>

      {platoExistente ? (
        <TouchableOpacity style={styles.ButtonQuitar} onPress={() => Eliminar()}>
          <Text style={styles.ButtonTextQuitar}>Quitar plato del menú</Text>
        </TouchableOpacity>
      ) : (
        // Deshabilitar el botón "Agregar" si el plato no se ha cargado correctamente
        !contextState.loading ? (
          <TouchableOpacity style={styles.Button} onPress={() => onPressed()}>
            <Text style={styles.ButtonText}>Agregar</Text>
          </TouchableOpacity>
        ) : null
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  Button: {
    backgroundColor: '#007bff',
    borderRadius: 2,
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ButtonQuitar: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  ButtonTextQuitar: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetallePlato;