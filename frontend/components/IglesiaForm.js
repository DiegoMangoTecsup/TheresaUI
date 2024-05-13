import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function IglesiaForm() {
  const [nombreVenta, setNombreVenta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(null);

  const handleFechaChange = (selectedDate) => {
    setFecha(selectedDate);
  };

  const handleGuardarDatoIglesia = async () => {
    try {
      const response = await fetch('http://localhost:3000/iglesias', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreVenta,
          descripcion,
          fecha
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al guardar el dato de la iglesia:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Venta"
        value={nombreVenta}
        onChangeText={setNombreVenta}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />
      <View style={styles.datePickerContainer}>
        <DatePicker
          selected={fecha}
          onChange={handleFechaChange}
          dateFormat="dd/MM/yyyy"
          style={styles.datePicker}
        />
      </View>
      <Button title="Guardar Dato de Iglesia" onPress={handleGuardarDatoIglesia} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  datePickerContainer: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  datePicker: {
    width: '100%',
  },
});
