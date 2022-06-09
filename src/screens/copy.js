const onPressLogin = () => {
    if (!onValidate()) {
        return;
    }

    setIsLoading(true);
    // let url = `${APP_CONFIG.url}login`;
    let token = 'Bearer 9vE-#EluFzH-h1GP^yyA^&WQoj7PpYPWS7I)$51Pr%zM7pV8ysYr)EP9O(5RW(bldm^$$H*Iq2^HpMh-*i4_HQCrUdf@pMW&91m^';
    let url = 'https://smartsalesapidev.zotefamily.com/v1/login';
    let body = [
        { name: 'user_name', data: userName },
        { name: 'password', data: password },
    ];

    RNFetchBlob.fetch(
        'POST',
        url,
        {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        },
        body
    )
        .then((res) => {
            setIsLoading(false);
            let result = JSON.parse(res.data);
            let returnData = result.data;
            let status = result.status_code ? result.status_code : result.status;
            let message = result.message ? result.message : '';
            if (status == 200 || status == 201) {
                if (isRemember) {
                    rememberMe(returnData);
                }
                navigation.push('Home', {
                    token: returnData.token,
                    user: returnData.data,
                });
            } else {
                setMessage(message);
            }
        })
        .catch((err) => {
            setIsLoading(false);
            console.log('Login Error', err);
        });
};