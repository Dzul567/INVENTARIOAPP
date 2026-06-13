import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export default function RegisterScreen({ navigation }) {

  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const registrarUsuario = async () => {

    if (!nombre || !usuario || !password) {

      Alert.alert(
        'Error',
        'Complete todos los campos'
      );

      return;

    }

    try {

      await addDoc(collection(db, 'usuarios'), {
        nombre: nombre,
        usuario: usuario,
        password: password
      });

      Alert.alert(
        'Éxito',
        'Usuario registrado correctamente'
      );

      navigation.navigate('Iniciar Sesión');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo registrar el usuario'
      );

    }

  };

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.icon}>
          👤
        </Text>

        <Text style={styles.title}>
          Crear Cuenta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={usuario}
          onChangeText={setUsuario}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={registrarUsuario}
        >
          <Text style={styles.buttonText}>
            Registrarse
          </Text>
        </TouchableOpacity>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EAF2FF',
    padding: 20
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 20,
    elevation: 8
  },

  icon: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 10
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 30
  },

  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20
  },

  button: {
    backgroundColor: '#10B981',
    padding: 18,
    borderRadius: 15
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  }

});