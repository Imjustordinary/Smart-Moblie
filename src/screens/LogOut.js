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



import AsyncStorage from '@react-native-async-storage/async-storage';

const LogOut =()=>{
    const navigationFun = useNavigation()
  
    const storeData = async () => {
        try {
         AsyncStorage.clear();
        } catch (e) {
          // saving error
        }
      }

    const logOut =()=>{
        storeData()
    navigationFun.navigate('Login')
    }
    
  
  return(
      <View>
    <TouchableOpacity onPress={logOut}>
        <Text style={styles.showTextBold}>Log out</Text>
        </TouchableOpacity>
        </View> 
  )

}

export default LogOut

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