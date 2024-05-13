import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform , DateTimePicker} from 'react-native';


export default function PasteleriaForm() {
  const [nombrePastel, setNombrePastel] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleFechaChange = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios'); // Mostrar el DatePicker solo en iOS
    setFecha(currentDate);
  };

  const handleGuardarPastel = async () => {
    try {
      const response = await fetch('http://localhost:3000/pastelerias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombrePastel,
          descripcion,
          ganancia: parseFloat(monto),
          fecha,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al guardar el pastel:', error);
    }
  };

  return (
    <View style={styles.container}>
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={handleFechaChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Nombre del pastel"
        value={nombrePastel}
        onChangeText={setNombrePastel}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />
      <Button title="Guardar Pastel" onPress={handleGuardarPastel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
});
