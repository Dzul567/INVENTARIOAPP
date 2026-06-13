import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductListScreen from '../screens/ProductListScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Iniciar Sesión"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Registrarse"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Productos"
          component={ProductListScreen}
        />

        <Stack.Screen
          name="Agregar Producto"
          component={AddProductScreen}
        />

        <Stack.Screen
          name="Editar Producto"
          component={EditProductScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}