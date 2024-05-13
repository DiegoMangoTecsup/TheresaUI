import React from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const navigation = useNavigation();

  const handleGoToIngresos = () => {
    navigation.navigate('Ingresos');
  };

  const handleGoToEgresos = () => {
    navigation.navigate('Egresos');
  };

  return (
    <ImageBackground source={{ uri: 'https://www.peru.travel/Contenido/General/Imagen/es/762/1.1/santa-teresa-convento.jpg' }} style={styles.backgroundImage}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Ingresos" onPress={handleGoToIngresos} color="transparent" />
        </View>
        <View style={styles.button}>
          <Button title="Egresos" onPress={handleGoToEgresos} color="transparent" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo transparente negro
  },
  button: {
    width: '48%', // Usar un valor ligeramente menor que el 50% para evitar posibles problemas de ajuste
    marginTop: 20, // Espacio entre los botones y la parte superior
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Cubrir toda la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ajuste para ocupar toda la pantalla horizontalmente
    height: '100%', // Ajuste para ocupar toda la pantalla verticalmente
  },
});
