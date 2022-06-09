import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Test = () => {
  const onLoad = async () => {
    // setIsLoading(true);
    // let url = `${APP_CONFIG.url}login`;
    let token =
      'Bearer 9vE-#EluFzH-h1GP^yyA^&WQoj7PpYPWS7I)$51Pr%zM7pV8ysYr)EP9O(5RW(bldm^$$H*Iq2^HpMh-*i4_HQCrUdf@pMW&91m^';
    let url = 'https://smartsalesapidev.zotefamily.com/v1/product/getlist';
    let body = [
      {page: '1', data: null},
      {name: 'password', data: null},
    ];

    try {
      const formdata = new FormData();
      formdata.append('page','1')
      formdata.append('keyword','')
      formdata.append('agent_type','1')

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      });

      let result = await response.json();
      console.log(result.data);
    } catch (err) {
      // setIsLoading(false);
      console.log('Login Error', err);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <View>
      <Text>Smth</Text>
    </View>
  );
};

export default Test;
