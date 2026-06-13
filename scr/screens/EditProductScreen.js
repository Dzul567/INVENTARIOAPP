import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

import DropDownPicker from 'react-native-dropdown-picker';

export default function EditProductScreen({ route, navigation }) {

  const { producto } = route.params;

  const [nombre, setNombre] = useState(producto.nombre);
  const [categoria, setCategoria] = useState(producto.categoria);
  const [cantidad, setCantidad] = useState(producto.cantidad.toString());
  const [precio, setPrecio] = useState(producto.precio.toString());

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: 'Bebidas', value: 'Bebidas' },
    { label: 'Alimentos', value: 'Alimentos' },
    { label: 'Limpieza', value: 'Limpieza' },
    { label: 'Papelería', value: 'Papelería' },
    { label: 'Enlatados', value: 'Enlatados' },
    { label: 'Hogar', value: 'Hogar' },
    { label: 'Lácteos y Derivados', value: 'Lácteos y Derivados' },
    { label: 'Otros', value: 'Otros' }
  ]);

  const actualizarProducto = async () => {

    if (!nombre || !categoria || !cantidad || !precio) {

      Alert.alert(
        'Error',
        'Complete todos los campos'
      );

      return;

    }

    try {

      const productoRef = doc(db, 'productos', producto.id);

      await updateDoc(productoRef, {
        nombre: nombre,
        categoria: categoria,
        cantidad: Number(cantidad),
        precio: Number(precio)
      });

      Alert.alert(
        'Éxito',
        'Producto actualizado correctamente'
      );

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo actualizar el producto'
      );

    }

  };

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.icon}>
          ✏️
        </Text>

        <Text style={styles.title}>
          Editar Producto
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          value={nombre}
          onChangeText={setNombre}
        />

        <DropDownPicker
          open={open}
          value={categoria}
          items={items}
          setOpen={setOpen}
          setValue={setCategoria}
          setItems={setItems}
          listMode="SCROLLVIEW"
          placeholder="Categoría"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />

        <TextInput
          style={styles.input}
          placeholder="Precio"
          keyboardType="numeric"
          value={precio}
          onChangeText={setPrecio}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={actualizarProducto}
        >
          <Text style={styles.buttonText}>
            Actualizar Producto
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
    padding: 20
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    elevation: 8,
    zIndex: 1000
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

  dropdown: {
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
    borderRadius: 15,
    marginBottom: 20
  },

  dropdownContainer: {
    borderColor: '#D1D5DB',
    borderRadius: 15
  },

  button: {
    backgroundColor: '#F59E0B',
    padding: 18,
    borderRadius: 15
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }

});