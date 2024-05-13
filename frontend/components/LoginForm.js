import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Platform, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [numero, setNumero] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numero,
          password
        })
      });
      const data = await response.json();
      if (response.ok) {
        const userData = data.usuario;
        if (userData.tipo === 'Superusuario') {
          // Si el usuario es un superusuario, redirige a MainScreen
          navigation.navigate('MainScreen', { userTipo: 'Superusuario' });
        } else {
          // Si el usuario no es un superusuario, redirige al formulario correspondiente
          navigateBasedOnUserRole(userData.area);
        }
      } else {
        console.error('Error al iniciar sesión:', data.mensaje);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const navigateBasedOnUserRole = (area) => {
    switch (area) {
      case 'Museo':
        navigation.navigate('MuseoForm');
        break;
      case 'Pastelería':
        navigation.navigate('PasteleriaForm');
        break;
      case 'Iglesia':
        navigation.navigate('IglesiaForm');
        break;
      default:
        console.error('Área no reconocida:', area);
        break;
    }
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground source={{ uri: 'https://hotelreginabolivia.com/wp-content/uploads/2019/04/santa-teresa-cba-650x350.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <Text style={styles.title}>Bienvenido a Santa Theresa </Text>
          <TextInput
            style={styles.input}
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Login" onPress={handleLogin} color="#8B0000" />
            </View>
            <View style={styles.button}>
              <Button title="Register" onPress={goToRegister} color="#8B0000" />
            </View>
          </View>
          
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Contenedor transparente con opacidad
    borderRadius: 10,
    paddingVertical: 20,
    width: Platform.OS === 'web' ? 400 : Dimensions.get('window').width * 0.8, // Ajuste para la plataforma web y dispositivos móviles
    maxWidth: 400, // Máximo ancho para la versión web
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff', // Fondo blanco para los inputs
  },
  buttonContainer: {
    flexDirection: 'column', // Organiza los elementos verticalmente
    marginTop: 10,
    alignItems: 'center', // Centra los elementos horizontalmente
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 10, // Margen inferior para separar los botones
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%', // Ajuste para ocupar toda la pantalla horizontalmente
    height: '100%', // Ajuste para ocupar toda la pantalla verticalmente
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#8B0000',
  },
});
