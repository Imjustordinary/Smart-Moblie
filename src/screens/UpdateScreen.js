import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    FlatList,
    Modal,
    Image,
    TouchableOpacity
  } from "react-native";
  import React, { useEffect, useState } from 'react';
  import { useNavigation } from "@react-navigation/native";
  
import { launchImageLibrary } from "react-native-image-picker";
  
const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  }
  }

  const UpdateInput=(props)=> {

    
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const [imgUri, setImgUri] = useState('')
    const [imgType, setImgType] = useState('')
    const [imgName, setImgName] = useState('')
    const [imgAdded, setImgAdded] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  
    const onChangeNameHandler=(input)=>{
      setName(input)
    }

    const onChangePriceHandler=(input)=>{
      setPrice(input)
    }

    const openGallery = async()=>{
      const image = await launchImageLibrary(options)
      console.log('open gallery'+image.assets[0])
      
      setImgUri(image.assets[0].uri)
      setImgType(image.assets[0].type)
      setImgName(image.assets[0].fileName)
      setImgAdded(true)
    }

    const onEditedHandler =async()=>{
      
    let url = 'https://smartsalesapidev.zotefamily.com/v1/product/update';
    // console.log(TOKEN)
    
    try {
      const formdata = new FormData();
      formdata.append('product_id',props.productId)
      formdata.append('product_type',props.productType)
      formdata.append('product_name',name)
      formdata.append('product_description',props.productDescription)
      formdata.append('product_sku',null)
      formdata.append('product_price',price)
      
      if(imgName.length > 1){
      formdata.append('file',{
        uri:imgUri,
        type:imgType,
        name:imgName
      })
      }
      console.log(formdata)
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: props.token,
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });

      let result = await response.json();
      console.log('on update '+result.data)
     
      // console.log(result.data.data_list)
      setLoading(false)
      props.offShowHandler()
    } catch (err) {
      console.log('Login Error', err);
      setLoading(false)
      props.offShowHandler()
    }
      props.navigation.navigate('Product',{
        response:true
      })
    }

    

    useEffect(()=>{
      setName(props.nameUpdate)
      setPrice(props.priceUpdate)
      setImgSrc(props.imageUpdate)
      
    },[])
    
    return (
      <Modal visible={props.showUpdate} animationType='slide'>
        <View style={styles.containerBox}>
        <View style={styles.container}>
      <View><Text style={styles.titleText}>Edit</Text></View></View>
      <View style={styles.detailImgContainer}>
        <Image style={styles.detailImg}  source={{uri: imgAdded!==true?props.imageUpdate:imgUri}} />
      </View>
      <View>
        <TouchableOpacity onPress={openGallery}>
      <Text style={styles.showTextBold}>Update image</Text>
      </TouchableOpacity>
      </View>
          {/* <Image source={require('../assets/goal.png')} style={styles.image} /> */}
          
          <TextInput
          value={name}
            onChangeText={onChangeNameHandler}
            placeholder="edit name"
            style={styles.inputText}
          />
          {/* <TextInput
          value={props.desUpdate}
            onChangeText={props.onChangeDesHandler}
            multiline={true}
            numberOfLines={4}
            placeholder="add description here"
            style={styles.inputText}
          /> */}
          <View style={styles.priceContainer}>
          <TextInput
        value={price}
          onChangeText={onChangePriceHandler}
          placeholder="edit price"
          style={styles.piceInput}
          keyboardType='decimal-pad'
        />
        <Text style={styles.showText}>MMK</Text>
          </View>

          <View style={styles.buttonsContainer}>
            
            <Button 
            color="#a065ec"
            title={loading?"Loading...":"Update this text"}
            onPress={onEditedHandler} 
            />
            <Button 
            color="#DA251D"
            title="Cancel"
            onPress={props.offShowHandler} 
            />
          </View>
        </View>
      </Modal>
        )}
  
  export default UpdateInput
  
  const styles = StyleSheet.create({
    detailImgContainer: {
      padding: 9,
      height: 250,
      // maxHeight: 300,
      // overflow: 'hidden',
      borderRadius: 12,
    },
    detailImg: {
      height: '100%',
      borderRadius: 12,
    },
    priceContainer:{
      flexDirection:'row'
    },
    showTextBold:{
      color: '#EEEEEE',
      marginVertical:12,
      fontSize: 20,
      marginLeft:12,
      textAlign:'center',
      fontWeight:"600"
    },
    showText:{
      color: '#EEEEEE',
      marginVertical:12,
      fontSize: 20,
      marginLeft:12
    },
      inputText: {
          padding: 12,
          borderRadius:5,
          marginBottom:15,
          fontSize: 20,
          backgroundColor:'#EEEEEE',
          color:"#120438"
        },
        piceInput:{
          padding: 12,
          borderRadius:5,
          marginBottom:15,
          fontSize: 20,
          backgroundColor:'#EEEEEE',
          color:"#120438",
          width:'30%'
        },
        containerBox: {
          flex:1,
          paddingTop: 20,
          paddingBottom:15,
          paddingHorizontal: 10,
          backgroundColor: "#2B2B2B",
        },
        image:{
          alignSelf:'center',
          height:150,
          width:150
        },
        buttonsContainer:{
          flexDirection:'row',
          justifyContent:'space-evenly'
        },
        titleText:{
          fontSize: 25,
          color: '#EEEEEE',
          textAlign:'center',
          fontWeight:'bold',
          marginVertical:17
        },

  
  })