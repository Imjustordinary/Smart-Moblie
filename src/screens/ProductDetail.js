import React, { useEffect, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  Button,
  Alert
} from 'react-native';
import {useState} from 'react';

import UpdateInput from './UpdateScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductDetail = ({navigation, route},props) => {


  const [showUpdate, setShowUpdate] = useState(false);
  const [nameUpdate, setNameUpdate] = useState('');
  const [priceUpdate, setpriceUpdate] = useState('');

  const {item, token} = route.params;
  // console.log(item.image);

  const deleteAlertHandler = () =>
  Alert.alert(
    "Information",
    "Are you sure do you want to delete this?",
    [
      {
        text: "Delete",
        onPress: onDeleteHandler,
        style: 'destructive'
      },
      { text: "No", onPress: () => {},
      style: "cancel"
    }
    ]
  );

  const onUpdateHandler = () => {
    
    setShowUpdate(true);
    setNameUpdate(item.name);
    setpriceUpdate(item.des);
  };

  const onDeleteHandler =async()=>{
    let url = 'https://smartsalesapidev.zotefamily.com/v1/product/delete';
    let token
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
     
      token = 'Bearer '+ value
    } catch(e) {
      // error reading value
    }
   
    try {
      const formdata = new FormData();
      formdata.append('product_id', item.id);
      

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });

      let result = await response.json();
     
    } catch (err) {
      console.log(err);
    }
    navigation.navigate('Product',{
      response:true
    })
  }

  const offShowHandler = () => {
    setShowUpdate(false);
  };

  const onChangeNameHandler = enteredText => {
    
    setNameUpdate(prev => enteredText);
  };

  const onChangePriceHandler = enteredText => {
    
    setpriceUpdate(prev => enteredText);
  };

  const onEditedHandler = () => {
    navigation.navigate('Product', {
      response: {
        id: item.id,
        name: nameUpdate,
        des: priceUpdate,
        image:item.image,
        action:'ADD'
      },
    });
  };

  

  return (
    <View style={styles.container}>
      <UpdateInput
        offShowHandler={offShowHandler}
        showUpdate={showUpdate}
        nameUpdate={item.product_name}
        priceUpdate={item.product_price}
        imageUpdate={item.product_image}
        productId={item.id}
        productType={item.product_type}
        productDescription={item.product_description}
        onChangePriceHandler={onChangePriceHandler}
        onChangeNameHandler={onChangeNameHandler}
        onEditedHandler={onEditedHandler}
        token={token}
        navigation={navigation}
      />
      <View style={styles.detailImgContainer}>
        <Image style={styles.detailImg} source={{uri: item.product_image}} />
      </View>
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailText}>{item.product_name}</Text>
      </View>
      <View style={styles.detailDesContainer}>
        <Text style={styles.detailDes}>Price : {item.product_price} MMK</Text>
      </View>
      <View style={styles.editButContainer}>
        <Button color="#a065ec" title="Edit this product" onPress={onUpdateHandler} />
         </View>
      <View style={styles.editButContainer}>
        <Button 
            color="#DA251D"
            title="Delete"
            onPress={deleteAlertHandler} />
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  editButContainer: {
    paddingBottom: 12,
    paddingHorizontal:12
    
  },
  detailImgContainer: {
    padding: 12,
    height: 250,
    maxHeight: 300,
    overflow: 'hidden',
    borderRadius: 12,
  },
  detailImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  container: {
    flex: 1,
  },
  detailTextContainer: {},
  detailDesContainer: {
    paddingBottom:30
  },
  detailText: {
    paddingHorizontal: 12,
    fontSize: 25,
    color: '#EEEEEE',
    
  },
  detailDes: {
    fontSize: 21,
    paddingHorizontal: 10,
    color: 'grey',
  },
});
