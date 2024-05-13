import React, { useState } from 'react';import { View, TextInput, Button, StyleSheet, ImageBackground, Platform, Dimensions, Text } from 'react-native';

export default function IngresosForm() {
  const [fecha, setFecha] = useState('');
  const [area, setArea] = useState('');
  const [venta, setVenta] = useState('');
  const [monto, setMonto] = useState('');

  const handleGuardarIngreso = async () => {
    try {
      const response = await fetch('http://localhost:3000/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numeroUsuario: '123', // Debes reemplazar 'aquí_debes_pasar_el_numero_del_usuario' con el número de usuario correspondiente
          ingreso: {
            fecha,
            area,
            venta,
            monto
          }
        })
      });
      const data = await response.json();
      console.log(data);
      // Aquí puedes manejar la respuesta del backend, como mostrar un mensaje de éxito o redireccionar a otra pantalla
    } catch (error) {
      console.error('Error al guardar ingreso:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://www.peru.travel/Contenido/General/Imagen/es/762/1.1/santa-teresa-convento.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <Text style={styles.title}>Registro de Ingresos</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Area"
            value={area}
            onChangeText={setArea}
          />
          <TextInput
            style={styles.input}
            placeholder="Venta"
            value={venta}
            onChangeText={setVenta}
          />
          <TextInput
            style={styles.input}
            placeholder="Monto"
            value={monto}
            onChangeText={setMonto}
          />
          <Button
            title="Guardar Ingreso"
            onPress={handleGuardarIngreso}
            color="#8B0000" // Color vino
          />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo transparente negro
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff', // Fondo blanco para los inputs
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%', // Ajuste para ocupar toda la pantalla horizontalmente
    height: '100%', // Ajuste para ocupar toda la pantalla verticalmente
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff', // Color blanco para el título
  },
});
