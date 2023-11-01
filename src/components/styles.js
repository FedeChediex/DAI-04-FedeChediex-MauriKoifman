import { StyleSheet, StatusBar } from 'react-native';

export const ListComponentStyle = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: '#E389B9',
      paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
    searchBarContainer: {
      borderWidth: 2, // Ajusta el ancho de los bordes
      borderColor: '#FFF', // Bordes blancos
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    searchBar: {
      color: '#333',
    },
  });
export const ListChildStyle = StyleSheet.create({
  item: {
    width: '30%', // Ajusta el ancho como desees
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#FFCE30', 
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    marginLeft: '34%',
    
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tinyLogo: {
    width: 200, // Ajusta el tamaño de la imagen como desees
    height: 200, // Ajusta el tamaño de la imagen como desees
    borderRadius: 10,
  },
  button:{
    width: 200,
    
  }
});