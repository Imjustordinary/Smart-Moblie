import * as React from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from '../screens/Product';
import ProductDetail from '../screens/ProductDetail';
import Login from '../screens/Login';
import LogOut from '../screens/LogOut';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


const Navigations =()=>{
  

return(
  <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'#2B2B2B'}, contentStyle:{backgroundColor:'#423F3E'}, headerTintColor:'#EDEDED', headerRight:()=><LogOut />}} 
      initialRouteName='Login'
      >
        <Stack.Screen name="Product" component={Product} options={{title:'Products',  headerLeft: ()=> <View></View>}} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen options={{
    headerShown: false
  }} name="Login" component={Login} />
        {/* <Stack.Screen name="Test" component={Test} /> */}
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigations

const styles = StyleSheet.create({
  showTextBold:{
    color: '#F2EBE9',
    marginVertical:12,
    fontSize: 20,
    marginLeft:12,
    textAlign:'center',
    fontWeight:"600"
  },
})