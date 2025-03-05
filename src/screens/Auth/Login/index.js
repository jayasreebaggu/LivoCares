import {
    Text,
    View,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';
import { ErrorMessage, Formik } from 'formik';
import React from 'react';
import styles from './style';
import Loginlogo from '../../../assets/Images/SVG/Loginlogo';
import Background from '../../../assets/Images/Temp/background_image.png';
import PHONE_ICON from '../../../assets/Images/Temp/phone.png';
import ButtonDy from '../../../common/Components/ButtonDy';
import TextField from '../../../common/Components/TextField';
import { SendOtpValues } from '../../../utils/formixInitials';
import { SendOtpSchema } from '../../../utils/validationSchema';
import ErrorTextDY from '../../../common/Components/ErrorTextDY';
import { sendOtp } from '../../../services/userService';


const Login = ({ navigation }) => {
    const windowHeight = Dimensions.get('window').height;

    const onSendOTP = async (values) => {
        try {
            console.log('Sending OTP for:', values.phoneNumber); // Add this line
            const response = await sendOtp(values.phoneNumber);
            console.log('OTP sent successfully'); // Add this line
            if (response.success) {
                navigation.navigate('OTPScreen', { phoneNumber: values.phoneNumber });
            }
        } catch (error) {
            console.log('Send OTP error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ImageBackground source={Background} resizeMode="stretch" style={styles.imagebackgroundstyle}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={{ alignSelf: 'center', top: windowHeight / 4.5 }}>
                        <Loginlogo />
                    </View>

                    <View style={{ height: windowHeight / 4 }} />

                    <Text style={styles.logintext}>Welcome to</Text>
                    <Text style={styles.doctortext}>LivoCares</Text>

                    <View style={styles.container}>
                        <Formik
                            initialValues={SendOtpValues}
                            validationSchema={SendOtpSchema}
                            validateOnMount
                            onSubmit={onSendOTP}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <>
                                    <TextField
                                        onChangeText={handleChange('phoneNumber')}
                                        onBlur={handleBlur('phoneNumber')}
                                        value={values.phoneNumber}
                                        placeholder={'Phone Number'}
                                        keyboardType={'phone-pad'}
                                        autoCapitalize="none"
                                        iconPath={PHONE_ICON}
                                        returnKeyType={'next'}
                                    />
                                    <ErrorMessage render={(msg) => <ErrorTextDY title={msg} />} name="phoneNumber" />
                                    <ButtonDy
                                        onPress={handleSubmit}
                                        title={'Send OTP'}
                                        style={styles.button}
                                    />
                                </>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Login;
