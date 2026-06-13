import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import {
  collection,
  getDocs
} from 'firebase/firestore';

import { db } from '../services/firebaseConfig';

export default function LoginScreen({ navigation }) {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const iniciarSesion = async () => {

    if (!usuario || !password) {

      alert('Complete todos los campos.');
      return;

    }

    try {

      const querySnapshot = await getDocs(collection(db, 'usuarios'));

      let acceso = false;

      querySnapshot.forEach((documento) => {

        const datos = documento.data();

        if (
          datos.usuario === usuario &&
          datos.password === password
        ) {

          acceso = true;

        }

      });

      if (acceso) {

        navigation.replace('Inicio');

      } else {

        alert('El usuario o la contraseña son incorrectos.');

      }

    } catch (error) {

      console.log(error);

      alert('No se pudo iniciar sesión.');

    }

  };

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.icon}>
          🔐
        </Text>

        <Text style={styles.title}>
          Iniciar Sesión
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
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
          onPress={iniciarSesion}
        >
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Registrarse')}
        >
          <Text style={styles.registerText}>
            ¿No tienes cuenta? Regístrate
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
    marginBottom: 20,
    fontSize: 16
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },

  registerText: {
    color: '#2563EB',
    textAlign: 'center',
    fontSize: 16
  }

});