import React,{useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Hoshi } from 'react-native-textinput-effects';
import {LogBox} from "react-native";
import {TOKEN, tokenChanger} from '../ultis/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])

LogBox.ignoreLogs([
"exported from 'deprecated-react-native-prop-types'.",
])

export const Login =({navigation})=>{

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selection, setSelection] = useState(false)
  

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
      await AsyncStorage.setItem('@remember', 'true')
    } catch (e) {
      // saving error
    }
  }

  const onChangeNameHandler =(input)=>{
    setName(input)

  }

  const onChangePasswordHandler =(input)=>{
    setPassword(input)

  }

  const onSubmitHandler = async()=>{
    setLoading(true)
    let url = 'https://smartsalesapidev.zotefamily.com/v1/login';

    try {
      const formdata = new FormData();
      formdata.append('user_name',name)
      formdata.append('password',password)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });

      let result = await response.json();
      navigation.navigate('Product')
      tokenChanger(result.data.token)
      storeData(result.data.token)
      setLoading(false)
  }
  catch(err){
    console.log(err)
  }

  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@remember')
      // console.log('screen',value)
      if(value === null) {
        // value previously stored
        
        navigation.navigate('Login')
        
        return 
      }
      
      navigation.navigate('Product')
      
      return 
      
    } catch(e) {
      // error reading value
    }
    
  }

  useEffect(()=>{
    getData()
  },[])

  return(
    <View style={styles.container}>
      <View><Text style={styles.titleText}>Login</Text></View>
      <View  style={styles.inputText}>
      <Hoshi
      onChangeText={onChangeNameHandler}
      value={name}
    labelStyle={{color:'#EEEEEE'}}
    label={'Name'}
    borderColor={'#423F3E'}
    borderHeight={3}
    inputPadding={16}
    
    backgroundColor={'#423F3E'}
  />
  </View>
  <View  style={styles.inputText}>
  <Hoshi
      onChangeText={onChangePasswordHandler}
      value={password}
    labelStyle={{color:'#EEEEEE'}}
    label={'Password'}
    borderColor={'#423F3E'}
    borderHeight={3}
    inputPadding={16}
    backgroundColor={'#423F3E'}
  secureTextEntry={showPassword?false:true}
  />
  <TouchableOpacity onPress={()=>setShowPassword(prev=> !prev)}>
  <Text style={styles.showText}>{showPassword?'Hide password':'Show password'}</Text>
  </TouchableOpacity>
  </View>
  <View style={styles.checkboxContainer}>
  <CheckBox
          value={selection}
          onValueChange={()=>setSelection(prev=>!prev)
          }
          onAnimationDidStop={() => console.log('onAnimationDidStopEvent')}
          lineWidth={2}
          hideBox={false}
          boxType={'circle'}
          tintColors={'#9E663C'}
          onCheckColor={'#6F763F'}
          onFillColor={'#4DABEC'}
          onTintColor={'#F4DCF8'}
          animationDuration={0.5}
          disabled={false}
          onAnimationType={'bounce'}
          offAnimationType={'stroke'}
        />
        <Text style={styles.label}>Remember me?</Text>
      </View>
  <View style={styles.submitBut}>
  <Button onPress={onSubmitHandler} title={loading?'Loading':'Login'} />
  </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'stretch',
    marginTop:80,
  },
  inputText: {
    marginHorizontal: 30,
    marginVertical:16,
    
  },
  submitBut:{
    marginHorizontal: 30,
    marginVertical:30,
  },
  titleText:{
    fontSize: 25,
    color: '#EEEEEE',
    textAlign:'center',
    fontWeight:'bold'
  },
  showText:{
    color: '#EEEEEE',
    marginVertical:12,
   
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginHorizontal:26
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color:'#EEEEEEEE'
  },

});

export default Login;