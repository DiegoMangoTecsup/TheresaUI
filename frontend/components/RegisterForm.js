import React, { useState } from 'react';
import { View, TextInput, Button, Picker, StyleSheet, ImageBackground, Platform, Dimensions , Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterForm() {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [dni, setDni] = useState('');
  const [cargo, setCargo] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Usuario Normal');
  const [area, setArea] = useState('Museo');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          numero,
          dni,
          cargo,
          password,
          tipo: tipoUsuario,
          area: tipoUsuario === 'Usuario Normal' ? area : null,
          permisos: {
            agregarDatos: true,
            accederReporte: false
          }
        })
      });
      const data = await response.json();

      if (tipoUsuario === 'Usuario Normal') {
        navigation.navigate(getFormScreenName(area));
      } else {
        navigation.navigate('MainScreen');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const getFormScreenName = (area) => {
    switch (area) {
      case 'Museo':
        return 'MuseoForm';
      case 'Pastelería':
        return 'PasteleriaForm';
      case 'Iglesia':
        return 'IglesiaForm';
      default:
        return 'MainScreen';
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://www.peru.travel/Contenido/Uploads/claustro-principal-convento-santa-rosa_637781260094823018.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <Text style={styles.title}>Vamos iniciemos con tu Registro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="DNI"
            value={dni}
            onChangeText={setDni}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Picker
            style={styles.input}
            selectedValue={tipoUsuario}
            onValueChange={(itemValue) => setTipoUsuario(itemValue)}
          >
            <Picker.Item label="Usuario Normal" value="Usuario Normal" />
            <Picker.Item label="Superusuario" value="Superusuario" />
          </Picker>
          {tipoUsuario === 'Usuario Normal' && (
            <Picker
              style={styles.input}
              selectedValue={area}
              onValueChange={(itemValue) => setArea(itemValue)}
            >
              <Picker.Item label="Museo" value="Museo" />
              <Picker.Item label="Pastelería" value="Pastelería" />
              <Picker.Item label="Iglesia" value="Iglesia" />
            </Picker>
          )}
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Register" onPress={handleRegister} color="#8B0000" />
            </View>
            <View style={styles.button}>
              <Button title="Go to Login" onPress={goToLogin}  color="#8B0000" />
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    paddingVertical: 20,
    width: Platform.OS === 'web' ? 400 : Dimensions.get('window').width * 0.8,
    maxWidth: 400,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    width: Platform.OS === 'web' ? 300 : '80%',
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#8B0000',
  },
});
