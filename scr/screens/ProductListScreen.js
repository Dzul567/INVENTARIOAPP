import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

import { useFocusEffect } from '@react-navigation/native';

import { db } from '../services/firebaseConfig';

export default function ProductListScreen({ navigation }) {

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    obtenerProductos();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      obtenerProductos();
    }, [])
  );

  const obtenerProductos = async () => {

    try {

      const querySnapshot = await getDocs(collection(db, 'productos'));

      const listaProductos = [];

      querySnapshot.forEach((documento) => {

        listaProductos.push({
          id: documento.id,
          ...documento.data()
        });

      });

      let total = 0;

      listaProductos.forEach((producto) => {

        const cantidad = Number(producto.cantidad) || 0;
        const precio = Number(producto.precio) || 0;

        total += cantidad * precio;

      });

      setValorTotal(total);
      setProductos(listaProductos);

    } catch (error) {

      console.log(error);

    }

  };

  const eliminarProducto = (id) => {

    if (window.confirm('¿Deseas eliminar este producto?')) {

      deleteDoc(doc(db, 'productos', id))
        .then(() => {

          obtenerProductos();

        })
        .catch((error) => {

          console.log(error);

          alert('Error al eliminar el producto');

        });

    }

  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        📋 Inventario
      </Text>

      <View style={styles.statsContainer}>

        <View style={styles.statsCard}>

          <Text style={styles.statsNumber}>
            {productos.length}
          </Text>

          <Text style={styles.statsText}>
             Productos registrados
          </Text>

        </View>

        <View style={styles.statsCard}>

          <Text style={styles.statsNumber}>
            ${valorTotal.toLocaleString('es-MX', {
              minimumFractionDigits: 2
            })}
          </Text>

          <Text style={styles.statsText}>
             Valor del inventario
          </Text>

        </View>

      </View>

      <TextInput
        style={styles.input}
        placeholder="🔎 Buscar producto..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.nombre}>
               {item.nombre}
            </Text>

            <Text style={styles.info}>
               Categoría: {item.categoria}
            </Text>

            <Text style={styles.info}>
              Cantidad: {item.cantidad}
            </Text>

            {
              Number(item.cantidad) < 5 &&
              (
                <Text style={styles.stockBajo}>
                  ⚠️ Stock bajo
                </Text>
              )
            }

            <Text style={styles.info}>
              Precio: ${item.precio}
            </Text>

            <View style={styles.buttonsContainer}>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate('Editar Producto', {
                    producto: item
                  })
                }
              >
                <Text style={styles.buttonText}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarProducto(item.id)}
              >
                <Text style={styles.buttonText}>
                  Eliminar
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        )}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EAF2FF',
    padding: 20
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 20
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  statsCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center'
  },

  statsNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8
  },

  statsText: {
    textAlign: 'center',
    color: '#4B5563'
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB'
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    elevation: 6
  },

  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10
  },

  info: {
    fontSize: 16,
    marginBottom: 5,
    color: '#4B5563'
  },

  stockBajo: {
    color: '#DC2626',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  editButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 12,
    width: '48%'
  },

  deleteButton: {
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 12,
    width: '48%'
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }

});