import {
    Text,
    View,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import styles from './style';
import Loginlogo from '../../../assets/Images/SVG/Loginlogo';
import Background from '../../../assets/Images/Temp/background_image.png';
import EMAIL_ICON from '../../../assets/Images/Temp/email.png';
import PHONE_ICON from '../../../assets/Images/Temp/phone.png';
import USERNAME_ICON from '../../../assets/Images/Temp/username.png';
import LOCATION_ICON from '../../../assets/Images/Temp/location.png';
import HEIGHT_WEIGHT_ICON from '../../../assets/Images/Temp/Shape.png';
import ButtonDy from '../../../common/Components/ButtonDy';
import TextField from '../../../common/Components/TextField';
import { ErrorMessage, Formik } from 'formik';
import { signupValues } from '../../../utils/formixInitials';
import { SignupSchema } from '../../../utils/validationSchema';
import ErrorTextDY from '../../../common/Components/ErrorTextDY';

const Signup = ({ navigation }) => {
    const route = useRoute();
    const { phoneNumber } = route.params || {}; // Read params safely
    const windowHeight = Dimensions.get('window').height;
    const [signinProcess, setsigninProcess] = useState(false);

    const handleSignup = async (values) => {
        const signupData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: phoneNumber,
            dob: values.dob,
            gender: values.gender,
            height: values.height,
            weight: values.weight,
            currentLocation: values.currentLocation,
            acceptTac: true,
            acceptPrivacyPol: true,
        };

        // Call your signup API here
        // await signup(signupData);
        // On success, navigate to the next screen
        navigation.navigate('SetUpProfile');
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            {/* <KeyboardAwareView animated={true}> */}
            <ImageBackground
                source={Background}
                resizeMode="stretch"
                style={styles.imagebackgroundstyle}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={{ alignSelf: "center", top: windowHeight / 8 }}>
                        <Loginlogo />
                    </View>
                    <View style={{ height: windowHeight / 7 }} />
                    <Text style={styles.logintext}>Welcome to</Text>
                    <Text style={styles.doctortext}>LivoCares</Text>

                    <View style={styles.container}>
                        <Formik
                            initialValues={signupValues}
                            validationSchema={SignupSchema}
                            onSubmit={handleSignup}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <>
                                    <TextField
                                        onChangeText={handleChange('phoneNumber')}
                                        onBlur={handleBlur('phoneNumber')}
                                        value={values.phoneNumber}
                                        placeholder={'Phone Number'}
                                        keyboardType={"phone-pad"}
                                        autoCapitalize="none"
                                        iconPath={PHONE_ICON}
                                        returnKeyType={"next"}
                                        readOnly
                                        mainplaceholder={phoneNumber}
                                    />
                                    <View height={20} />

                                    <TextField
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        placeholder={'Email'}
                                        keyboardType={"email-address"}
                                        mainplaceholder={"Enter your email"}
                                        autoCapitalize="none"
                                        iconPath={EMAIL_ICON}
                                        returnKeyType={"next"}
                                    />
                                    <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="email" />
                                    <View height={20} />

                                    <TextField
                                        onChangeText={handleChange('firstName')}
                                        onBlur={handleBlur('firstName')}
                                        value={values.firstName}
                                        placeholder={'First Name'}
                                        mainplaceholder={"Enter your first name"}
                                        autoCapitalize="none"
                                        iconPath={USERNAME_ICON}
                                        returnKeyType={"next"}
                                    />
                                    <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="firstName" />
                                    <View height={20} />

                                    <TextField
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        value={values.lastName}
                                        placeholder={'Last Name'}
                                        mainplaceholder={"Enter your last name"}
                                        autoCapitalize="none"
                                        iconPath={USERNAME_ICON}
                                        returnKeyType={"next"}
                                    />
                                    <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="lastName" />
                                    <View height={20} />

                                    <TextField
                                        onChangeText={handleChange('height')}
                                        onBlur={handleBlur('height')}
                                        value={values.height}
                                        placeholder={'Height'}
                                        mainplaceholder={"Enter your height in CM"}
                                        autoCapitalize="none"
                                        iconPath={HEIGHT_WEIGHT_ICON}
                                        returnKeyType={"next"}
                                    />
                                    <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="height" />
                                    <View height={20} />

                                    <TextField
                                        onChangeText={handleChange('weight')}
                                        onBlur={handleBlur('weight')}
                                        value={values.weight}
                                        placeholder={'Weight'}
                                        mainplaceholder={"Enter your weight in KG"}
                                        autoCapitalize="none"
                                        iconPath={HEIGHT_WEIGHT_ICON}
                                        returnKeyType={"next"}
                                    />
                                    <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="weight" />
                                    <View height={20} />

                                    <TextField
                                        onChangeText={handleChange('currentLocation')}
                                        onBlur={handleBlur('currentLocation')}
                                        value={values.currentLocation}
                                        placeholder={'Current Location'}
                                        mainplaceholder={"Enter your current location"}
                                        autoCapitalize="none"
                                        iconPath={LOCATION_ICON}
                                        returnKeyType={"next"}
                                    />
                                    <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="currentLocation" />
                                    <View height={20} />


                                    <ButtonDy
                                        onPress={handleSubmit}
                                        title={'Create account'}
                                        style={styles.button}
                                        textStyle={styles.buttontext}
                                        processing={signinProcess}
                                    />

                                    <Text style={styles.dontHaveText}>
                                        {'Already have an account?'}
                                        {`  `}
                                        <Text style={styles.signup}
                                            onPress={() => navigation.navigate('Login')}
                                        >
                                            {'SignIn'}
                                        </Text>
                                    </Text>
                                </>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </ImageBackground>
            {/* </KeyboardAwareView> */}
        </SafeAreaView>
    );
};

export default Signup;
