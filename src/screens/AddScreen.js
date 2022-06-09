import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};

const AddInput = props => {
  const [loading, setLoading] = useState(false);

  const [imgAdded, setImgAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imgUri, setImgUri] = useState('');
  const [imgType, setImgType] = useState('');
  const [imgName, setImgName] = useState('');

  const openGallery = async () => {
    const image = await launchImageLibrary(options);
    console.log('open gallery' + image.assets[0]);
    if (image.assets[0]) {
      setImgSrc(image.assets[0].uri);
      setImgUri(image.assets[0].uri);
      setImgType(image.assets[0].type);
      setImgName(image.assets[0].fileName);
      setImgAdded(true);
    }
  };

  const onChangeName = input => {
    setName(input);
  };

  const onChangeDescription = input => {
    setDescription(input);
  };

  const onChangePrice = input => {
    setPrice(input);
  };

  const onRegister = async () => {
    setLoading(true);
    let url = 'https://smartsalesapidev.zotefamily.com/v1/product/create';
    let token = props.token;

    try {
      const formdata = new FormData();
      formdata.append('product_type', 1);
      formdata.append('product_name', name);
      formdata.append('product_description', description);
      formdata.append('product_sku', null);
      formdata.append('product_price', price);
      formdata.append('file', {
        uri: imgUri,
        type: imgType,
        name: imgName,
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });

      let result = await response.json();
      console.log(result);
      setLoading(false);
      setImgAdded(false);
      setImgName('');
      setImgType('');
      setImgUri('');
      setPrice('');
      setDescription('');
      setName('');
      setImgSrc('');
      props.offShowHandler();
    } catch (err) {
      console.log(err);
    }
  };

  const imgBody = imgAdded ? (
    <Image source={{uri: imgSrc}} style={styles.image} />
  ) : (
    <Pressable onPress={openGallery} style={styles.imageBox}>
      <View style={styles.imageBoxContainer}>
        <Text style={styles.addImgText}>Click here to add image</Text>
      </View>
    </Pressable>
  );

  return (
    <Modal visible={props.show} animationType="slide">
      <View style={styles.containerBox}>
        <TextInput
          value={name}
          onChangeText={onChangeName}
          placeholder="add product name here"
          style={styles.inputText}
        />
        <TextInput
          value={description}
          onChangeText={onChangeDescription}
          multiline={true}
          numberOfLines={4}
          placeholder="add product description here"
          style={styles.inputText}
        />
        <TextInput
          value={price}
          onChangeText={onChangePrice}
          placeholder="add product price"
          style={styles.inputText}
          keyboardType="decimal-pad"
        />
        <View style={styles.imageContainer}>{imgBody}</View>
        <View style={styles.buttonsContainer}>
          <Button
            color="#a065ec"
            title={loading ? 'Loading...' : 'Register this product'}
            onPress={onRegister}
          />
          <Button
            color="#DA251D"
            title="Cancel"
            onPress={() => {
              props.offShowHandler();
              setImgAdded(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddInput;

const styles = StyleSheet.create({
  addImgText: {
    fontSize: 21,
    textAlign: 'center',
  },
  inputText: {
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 20,
    backgroundColor: '#EEEEEE',
    color: '#120438',
  },
  containerBox: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#2B2B2B',
  },
  image: {
    alignSelf: 'center',
    height: 200,
    width: 200,
  },
  imageBox: {
    alignSelf: 'center',
    height: 200,
    width: 200,
    backgroundColor: '#EEEEEEEE',
  },
  imageBoxContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    paddingVertical: 7,
    paddingBottom: 28,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
