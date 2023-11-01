import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ActionTypes, useContextState } from '../contextState';
import { getRecipesById } from '../services/spoonacularService';

const DetallePlato = ({ navigation, route }) => {
  const [plato, setPlato] = useState({});
  const [platoExistente, setPlatoExistente] = useState(false);
  const { contextState, setContextState } = useContextState();

  useEffect(() => {
    setContextState({ newValue: true, type: ActionTypes.setLoading });

    getRecipesById(route.params.id)
      .then((response) => {
        setPlato(response);
        setContextState({});
        const platoExistente = (contextState?.menu || []).some((item) => item.id === response.id);
        setPlatoExistente(platoExistente);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setContextState({ newValue: false, type: ActionTypes.setLoading });
      });
  }, []);

  const eliminarPlato = () => {
    const nuevoMenu = (contextState?.menu || []).filter((item) => item.id !== plato.id);
    setContextState({ newValue: nuevoMenu, type: ActionTypes.setMenu });
    navigation.navigate('menu');
  };

  const agregarPlato = () => {
    const menuActual = contextState?.menu || [];
    const limiteVegano = menuActual.filter((item) => item.vegan).length;
    const limiteNoVegano = menuActual.filter((item) => !item.vegan).length;
    const limitePlatos = menuActual.length >= 4;
  
    if (limitePlatos || (plato.vegan && limiteVegano >= 2) || (!plato.vegan && limiteNoVegano >= 2)) {
      Alert.alert('Error', 'Llegaste al límite de platos en el menú.');
    } else {
      setContextState({ newValue: [...menuActual, plato], type: ActionTypes.setMenu });
      navigation.navigate('menu');
    }
  };

  return (
    <View style={styles.container}>
      {contextState.loading && <ActivityIndicator size="large" color="#3498db" />}

      <Text style={styles.title}>{plato.title}</Text>

      <Image style={styles.image} source={{ uri: plato.image }} />

      <Text style={styles.infoText}>Precio: ${plato.pricePerServing}</Text>
      <Text style={styles.infoText}>{plato.vegan ? 'Vegano' : 'No Vegano'}</Text>

      {platoExistente ? (
        <TouchableOpacity style={styles.button} onPress={eliminarPlato}>
          <Text style={styles.buttonText}>Eliminar del menú</Text>
        </TouchableOpacity>
      ) : (
        !contextState.loading && (
          <TouchableOpacity style={styles.button} onPress={agregarPlato}>
            <Text style={styles.buttonText}>Agregar al menú</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E389B9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DetallePlato;