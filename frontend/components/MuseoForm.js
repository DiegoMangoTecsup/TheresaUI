import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importar estilos por separado
import { View, TextInput, Button, StyleSheet, ImageBackground, Platform, Dimensions, Text } from 'react-native';

export default function MuseoForm() {
  const [fecha, setFecha] = useState(null);
  const [venta, setVenta] = useState('');
  const [monto, setMonto] = useState('');

  const handleGuardarIngreso = async () => {
    try {
      const response = await fetch('http://localhost:3000/museos', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          museo: {
            fecha: fecha,
            venta: venta,
            ganancia: parseFloat(monto)
          }
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al guardar el ingreso:', error);
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://www.peru.travel/Contenido/Uploads/claustro-principal-convento-santa-rosa_637781260094823018.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Registro de Ingresos en el Museo</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Fecha:</Text>
            <View style={styles.datePickerContainer}>
              <DatePicker
                selected={fecha}
                onChange={(date) => setFecha(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar fecha"
                style={styles.datePicker}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Venta:</Text>
            <TextInput
              placeholder="Venta"
              value={venta}
              onChangeText={setVenta}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Monto:</Text>
            <TextInput
              placeholder="Monto"
              value={monto}
              onChangeText={setMonto}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.button}>
            <Button title="Enviar Datos" onPress={handleGuardarIngreso} color="#8B0000" />
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    paddingVertical: 20,
    width: Platform.OS === 'web' ? 400 : Dimensions.get('window').width * 0.8,
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#8B0000',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  datePickerContainer: {
    position: 'relative',
    zIndex: 999,
  },
  datePicker: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
