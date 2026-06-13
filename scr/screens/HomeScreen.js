import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function HomeScreen({ navigation }) {

  const cerrarSesion = () => {

    navigation.replace('Iniciar Sesión');

  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.icon}>
          📦
        </Text>

        <Text style={styles.title}>
          Sistema de Inventario
        </Text>

        <Text style={styles.subtitle}>
          Administración de Productos
        </Text>

        <TouchableOpacity
          style={styles.inventoryButton}
          onPress={() => navigation.navigate('Productos')}
        >
          <Text style={styles.buttonText}>
            📋 Ver Inventario
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Agregar Producto')}
        >
          <Text style={styles.buttonText}>
            ➕ Agregar Producto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={cerrarSesion}
        >
          <Text style={styles.buttonText}>
            🚪 Cerrar Sesión
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 8
  },

  icon: {
    fontSize: 60,
    marginBottom: 15
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10
  },

  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 40
  },

  inventoryButton: {
    width: '100%',
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 15,
    marginBottom: 20
  },

  addButton: {
    width: '100%',
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 15,
    marginBottom: 20
  },

  logoutButton: {
    width: '100%',
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 15
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }

});