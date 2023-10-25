import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { getRecipesByName } from "../services/spoonacularService";
import { ActionTypes, useContextState } from "../contextState";
import ListChild from "./Listchild.js";

const Menu = ({ navigation }) => {
  const { contextState, setContextState } = useContextState();
  const [pressed, setPressed] = useState({});
  const [precioTotal, setPrecioTotal] = useState(0);
  const [promedioHealthScore, setPromedioHealthScore] = useState(0);
  const [hovered, setHovered] = useState(false);
  const scaleValue = new Animated.Value(1);

  const calcularPrecioTotal = () => {
    const menu = contextState?.menu ?? [];
    return menu.reduce((acc, plato) => acc + plato.pricePerServing, 0).toFixed(2);
  };

  const calcularPromedioHS = () => {
    const menu = contextState?.menu ?? [];

    if (menu.length === 0) {
      return 0;
    }

    const totalHealthScore = menu.reduce((acumulador, plato) => {
      return acumulador + plato.healthScore;
    }, 0);

    const promedio = totalHealthScore / menu.length;
    return promedio.toFixed(2);
  };

  useEffect(() => {
    const total = calcularPrecioTotal();
    const promedioHealthScore = calcularPromedioHS();
    setPromedioHealthScore(promedioHealthScore);
    setPrecioTotal(total);
  }, [contextState.menu]);

  const renderItem = ({ item, index }) => (
    <ListChild item={item} index={index} pressed={pressed} setPressed={setPressed} navigation={navigation} />
  );

  const onPressed = () => {
    navigation.navigate("Buscador");
  };

  const handleHover = () => {
    setHovered(!hovered);

    Animated.spring(scaleValue, {
      toValue: hovered ? 1 : 1.05,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Menú</Text>
        <FlatList data={contextState?.menu ?? []} renderItem={renderItem} keyExtractor={(item) => item.title} />
        <Text style={styles.total}>Precio Total: {precioTotal}</Text>
        <Text style={styles.promedio}>Promedio de HealthScore en el menú: {promedioHealthScore}</Text>

        <TouchableOpacity
          style={[styles.button, { transform: [{ scale: scaleValue }] }]}
          onPress={onPressed}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <Text style={styles.buttonText}>Ir al Buscador</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
      },
      scrollContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
      },
      total: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        color: "#27ae60",
      },
      promedio: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
        color: "#3498db",
      },
      button: {
        backgroundColor: "#e74c3c",
        padding: 12,
        borderRadius: 8,
        marginTop: 16,
      },
      buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
      },
    });


export default Menu;