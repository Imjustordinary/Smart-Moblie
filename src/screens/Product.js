import React, { useLayoutEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TextInput,
  Image,
  Button,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useState} from 'react';
import {TOKEN, tokenChanger} from '../ultis/Store'

import AddInput from './AddScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Product = ({navigation, route}) => {
  // const [response, setResponse] = useState()

  const response = route.params?.response;
  // route.params&&setResponse(route.params.response);
  // console.log(route)

  // route.params && console.log(route.params);

  const [initialProducts, setInitial] = useState();

  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1)
  const [loadMore, setLoadMore] = useState(false)
  const [products, setProducts] = useState(initialProducts);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [des, setDes] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);
  const [nameUpdate, setNameUpdate] = useState('');
  const [desUpdate, setDesUpdate] = useState('');
  const [noProduct, setNoProduct] = useState(false);
  const [tokenn, setTokenn] = useState('')

  
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
    }
    setTOKEN(value)
  } catch(e) {
    // error reading value
  }
}


  const onLoad = async () => {
    let token
    if(!TOKEN){
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      const remember = await AsyncStorage.getItem('@remember')
      if(remember === null) {
        // navigation.navigate('Login')
      }
      token = 'Bearer '+ value
    } catch(e) {
      // error reading value
    }
  }
  else{
    token = 'Bearer '+TOKEN
  }
    let url = 'https://smartsalesapidev.zotefamily.com/v1/product/getlist';
    // console.log(TOKEN)

    try {
      const formdata = new FormData();
      formdata.append('page',1)
      formdata.append('keyword','')

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });

      let result = await response.json();
      setInitial(result.data.data_list)
      setProducts(result.data.data_list)
      // console.log(result.data.data_list)
      setLoading(false)
      setTokenn(token)
    } catch (err) {
      // setIsLoading(false);
      // console.log('Login Error', err);
      setLoading(false)
    }
  };

  const fetchMoreHandler =async()=>{
   if( products.length > 1) {
    let token
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
      }
      console.log('asyncStorage', value)
      token = 'Bearer '+ value
    } catch(e) {
      // error reading value
    }
    setLoadMore(true)
    // let token = 'Bearer '+TOKEN
  let url = 'https://smartsalesapidev.zotefamily.com/v1/product/getlist';


  try {
    setPageNo(prev=>prev+1)
    const formdata = new FormData();

    formdata.append('page',pageNo+1)
    formdata.append('keyword','')
    // formdata.append('agent_type','1')

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });

    let result = await response.json();
    
    setInitial(prev=> prev.concat(result.data.data_list))
    setProducts(prev=> prev.concat(result.data.data_list))
    // console.log(result.data.data_list)
    setLoadMore(false)
  } catch (err) {
    // setIsLoading(false);
    console.log('Login Error', err);
    setLoadMore(false)
  }
}
  }

  useLayoutEffect(() => {
    setLoading(true)
    onLoad();
    
  }, []);

  useLayoutEffect(()=>{
    onLoad();
  },[response, offShowHandler])




  

  const setShowHandler = () => {
    setShow(true);
  };

  const offShowHandler = () => {
    setShow(false);
  };
  const onChangeTextHandler = enteredText => {
    console.log(enteredText);
    setName(prev => enteredText);
  };

  const onChangeDesHandler = enteredText => {
    console.log(enteredText);
    setDes(prev => enteredText);
  };

  const onPressHandler = item => {
    console.log(item)
    navigation.navigate('ProductDetail', {
      item: item,
      token:tokenn
    });
  };

  const onAddHandler = () => {
    const newCake = {
      id: Math.random().toString(),
      name: name,
      image:
        'https://static.onecms.io/wp-content/uploads/sites/43/2022/03/23/8095-black-forest-cake-kim-2000.jpg',
      des: des,
    };
    setProducts(prev => prev.concat(newCake));
    setInitial(prev => prev.concat(newCake));
    offShowHandler();
  };

  const onFilter = input => {
    setNoProduct(false);
    const productsFinder = product => {
      if (product.name) {
        return product.name.includes(input);
      }
    };
    setLoading(false);
    const newProducts = products.find(productsFinder);
    if (input.length < 1) {
      setProducts([...initialProducts]);
    } else if (!newProducts) {
      setNoProduct(true);
    } else {
      setProducts([{...newProducts}]);
    }
  };

  const onFinder = async (input) =>{
    let token
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
      }
      token = 'Bearer '+ value
    } catch(e) {
      // error reading value
    }
  let url = 'https://smartsalesapidev.zotefamily.com/v1/product/getlist';

  try {
    const formdata = new FormData();

    formdata.append('page','1')
    formdata.append('keyword',input)
    
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });

    let result = await response.json();
    
    setProducts([...result.data.data_list])

    // console.log(result.data.data_list)
    
  } catch (err) {
    // console.log('Login Error', err);
  }
  setLoading(false);
  
}
  let myTimeout;
  const onSearchHandler = input => {
    setNoProduct(false);
    setLoading(true);
    clearTimeout(myTimeout);
    myTimeout = setTimeout(() => onFinder(input), 700);
  };

  const eachItem = item => {
    return (
      <View style={styles.eachContainer}>
        <Pressable
          onPress={() => onPressHandler(item.item)}
          style={({pressed}) =>
            !pressed ? styles.eachContainer : [styles.eachContainer, styles.op]
          }>
          <View style={styles.eachItem}>
            <Image style={styles.eachImage} source={{uri: item.item.product_image}} />
            <View style={styles.eachTextView}>
              <Text style={styles.eachText}>{item.item.product_name}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const displayBody =
    loading 
    // || noProduct 
    ? (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Loading
        </Text>
      </View>
    ) : (
      
      <FlatList
        data={products}
        renderItem={eachItem}
        keyExtractor={item => Math.random().toString()}
        numColumns={2}
        
        onEndReached={fetchMoreHandler}
        onEndReachedThreshold={0.2}
      />
      
    );

    const loadingBody = 
    <View>
      <Text style={styles.loadMoreText}>Loading</Text>
      </View>
    

  return (
    <View style={styles.container}>
      <AddInput
        onAddHandler={onAddHandler}
        show={show}
        onChangeDesHandler={onChangeDesHandler}
        onChangeTextHandler={onChangeTextHandler}
        setShowHandler={setShowHandler}
        offShowHandler={offShowHandler}
        token={tokenn}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={setShowHandler}
          title="click to add product"
          style={styles.buttonStyle}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Search smth"
          style={styles.textInput}
          onChangeText={onSearchHandler}
        />
      </View>
      <View style={styles.container}>
      {displayBody}
      </View>
      {loadMore&&loadingBody}
    </View>
  );
};

const styles = StyleSheet.create({
  loadMoreContainer:{
    paddingVertical: 3,
    paddingHorizontal: 10,
    alignContent:'center',
    
  },
  buttonStyle: {},
  buttonContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
  },
  loadMoreText:{
    fontSize:20,
    color:'white',
    textAlign:'center'
  },
  loadingText: {
    paddingHorizontal: 12,
    fontSize: 25,
    color: '#EEEEEE',
  },
  loadingContainer: {
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  op: {
    opacity: 0.75,
  },
  textInputContainer: {
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  textInput: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 21,
  },
  container: {
    flex: 1,
  },
  eachContainer: {
    flex: 1,
  },
  eachItem: {
    height: 185,
    flex: 1,
    backgroundColor: 'black',
    minHeight: 120,
    margin: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  eachImage: {
    height: '75%',
    resizeMode: 'cover',
  },
  eachText: {
    color: 'white',
    padding: 10,
    fontSize: 15,
  },
  eachTextView: {
    flex: 1,
    backgroundColor: '#2B2B2B',
  },
});

export default Product;
