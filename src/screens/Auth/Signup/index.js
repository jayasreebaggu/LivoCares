import {
    Text,
    View,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Dimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import styles from './style';
import Loginlogo from '../../../assets/Images/SVG/Loginlogo';
import Background from '../../../assets/Images/Temp/background_image.png';
import EMAIL_ICON from '../../../assets/Images/Temp/email.png';
import PHONE_ICON from '../../../assets/Images/Temp/phone.png';
import USERNAME_ICON from '../../../assets/Images/Temp/username.png';
import ButtonDy from '../../../common/Components/ButtonDy';
import TextField from '../../../common/Components/TextField';
import { ErrorMessage, Formik } from 'formik';
import { signupValues } from '../../../utils/formixInitials';
import { SignupSchema } from '../../../utils/validationSchema';
import ErrorTextDY from '../../../common/Components/ErrorTextDY';

const Signup = ({ navigation }) => {
    const windowHeight = Dimensions.get('window').height;
    const [signinProcess, setsigninProcess] = useState(false);

    const handleSignup = async (values) => {
        // Prepare the data for the signup API
        const signupData = {
            name: values.name,
            contactNumber: values.phone,
            gstn: values.gstn,
            website: values.website,
            accountType: "DOCTOR", // Assuming this is a constant value
            address: {
                street: values.street,
                area: values.area,
                city: values.city,
                state: values.state,
                latitude: values.latitude,
                longitude: values.longitude,
                country: values.country,
                postalCode: values.postalCode,
            },
            member: {
                name: values.name,
                email: values.email,
                contactNumber: values.phone,
            },
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
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            placeholder={'Email'}
                                            keyboardType={"email-address"}
                                            mainplaceholder={"johndoe@gmail.com"}
                                            autoCapitalize="none"
                                            iconPath={EMAIL_ICON}
                                            returnKeyType={"next"}
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="email" />
                                        <View height={20} />

                                        <TextField
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                            placeholder={'Name'}
                                            mainplaceholder={"Enter your full name"}
                                            autoCapitalize="none"
                                            iconPath={USERNAME_ICON}
                                            returnKeyType={"next"}
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="name" />
                                        <View height={20} />

                                        <TextField
                                            onChangeText={handleChange('phone')}
                                            onBlur={handleBlur('phone')}
                                            value={values.phone}
                                            placeholder={'Phone number'}
                                            keyboardType={"phone-pad"}
                                            autoCapitalize="none"
                                            iconPath={PHONE_ICON}
                                            returnKeyType={"next"}
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="phone" />
                                        <View height={20} />

                                        <TextField
                                            onChangeText={handleChange('gstn')}
                                            onBlur={handleBlur('gstn')}
                                            value={values.gstn}
                                            placeholder={'GSTN'}
                                            autoCapitalize="none"
                                         //   iconPath={GSTN_ICON}
                                            returnKeyType={"next"}
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="gstn" />
                                        <View height={20} />

                                        <TextField
                                            onChangeText={handleChange('website')}
                                            onBlur={handleBlur('website')}
                                            value={values.website}
                                            placeholder={'Website'}
                                            autoCapitalize="none"
                                         //   iconPath={WEBSITE_ICON}
                                            returnKeyType={"next"}
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="website" />
                                        <View height={20} />

                                        {/* Add address fields */}
                                        <TextField
                                            onChangeText={handleChange('street')}
                                            onBlur={handleBlur('street')}
                                            value={values.street}
                                            placeholder={'Street'}
                                            autoCapitalize="none"
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="street" />
                                        <View height={20} />

                                        <TextField
                                            onChangeText={handleChange('area')}
                                            onBlur={handleBlur('area')}
                                            value={values.area}
                                            placeholder={'Area'}
                                            autoCapitalize="none"
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="area" />
                                        <View height={20} />

                                        <TextField
                                            onChangeText={handleChange('city')}
                                            onBlur={handleBlur('city')}
                                            value={values.city}
                                            placeholder={'City'}
                                            autoCapitalize="none"
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="city" />
                                        <View height={20} />

                                        <TextField
                                            onChangeText={handleChange('state')}
                                            onBlur={handleBlur('state')}
                                            value={values.state}
                                            placeholder={'State'}
                                            autoCapitalize="none"
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="state" />
                                        <View height={20} />

                                        <TextField
                                            onChangeText={handleChange('postalCode')}
                                            onBlur={handleBlur('postalCode')}
                                            value={values.postalCode}
                                            placeholder={'Postal Code'}
                                            keyboardType={"numeric"}
                                            autoCapitalize="none"
                                        />
                                        <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="postalCode" />
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





// import {
//     Text,
//     View,
//     ImageBackground,
//     SafeAreaView,
//     ScrollView,
//     Dimensions,
//     Image
// } from 'react-native';
// import React, { useRef, useState } from 'react';
// import { SvgXml } from 'react-native-svg';
// import styles from './style';
// import Loginlogo from '../../assets/Images/SVG/Loginlogo';
// import Background from '../../assets/Images/Temp/background_image.png';
// import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
// import EMAIL_ICON from '../../assets/Images/Temp/email.png';
// import PASSWORD_ICON from '../../assets/Images/Temp/password.png';
// import PHONE_ICON from '../../assets/Images/Temp/phone.png';
// import USERNAME_ICON from '../../assets/Images/Temp/username.png';
// import ButtonDy from '../../common/Components/ButtonDy';
// import TextField from '../../common/Components/TextField';
// import { ErrorMessage, Formik } from 'formik';
// import { CommonActions } from '@react-navigation/native';
// import { signupValues } from '../../utils/formixInitials';
// import { SignupSchema } from '../../utils/validationSchema';
// import ErrorTextDY from '../../common/Components/ErrorTextDY';
// // import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import Horizontalline from '../Login/Components/Horizontalline';
// import Facebook from '../../assets/Images/SVG/Facebook';
// import GOOGLE_ICON from '../../assets/Images/Temp/Google_Icon.png'


// const Signup = ({ navigation }) => {

//     const passwordRef = useRef(null);
//     const windowHeight = Dimensions.get('window').height;
//     const [signinProcess, setsigninProcess] = useState(false);


//     return (
//         <SafeAreaView style={styles.safeContainer}>
//             <KeyboardAwareView animated={true}>
//                 <ImageBackground
//                     source={Background}
//                     resizeMode="stretch"
//                     style={styles.imagebackgroundstyle}>
//                     <ScrollView contentContainerStyle={styles.scrollContainer}>
//                         {/* logo image */}
//                         <View style={{ alignSelf: "center", top: windowHeight / 8 }}>
//                             <Loginlogo />
//                         </View>
//                         {/* hightview */}
//                         <View style={{ height: windowHeight / 7 }} />

//                         {/* login text */}
//                         <Text style={styles.logintext}>Welcome to</Text>
//                         <Text style={styles.doctortext}>LivoCares</Text>

//                         <View style={styles.container}>
//                             <Formik
//                                 initialValues={signupValues}
//                                 validationSchema={SignupSchema}
//                             // onSubmit={__onLoginPress}
//                             >
//                                 {({ handleChange, handleBlur, handleSubmit, values }) => (
//                                     <>
//                                         {/* Number validation parts */}
//                                         <TextField
//                                             onChangeText={handleChange('email')}
//                                             onBlur={handleBlur('email')}
//                                             value={values.email}
//                                             placeholder={'Email'}
//                                             keyboardType={"email-address"}
//                                             mainplaceholder={"johndoe@gmail.com"}
//                                             autoCapitalize="none"
//                                             iconPath={EMAIL_ICON}
//                                             returnKeyType={"next"}
//                                             onSubmitEditing={() => passwordRef.current.focus()}
//                                         />

//                                         <ErrorMessage
//                                             render={msg => <ErrorTextDY title={msg} />}
//                                             name="email"
//                                         />
//                                         <View height={20} />

//                                         <TextField
//                                             onChangeText={handleChange('name')}
//                                             onBlur={handleBlur('name')}
//                                             value={values.name}
//                                             placeholder={'Name'}
//                                             // keyboardType={"email-address"}
//                                             mainplaceholder={"Enter your full name"}
//                                             autoCapitalize="none"
//                                             iconPath={USERNAME_ICON}
//                                             returnKeyType={"next"}
//                                             onSubmitEditing={() => passwordRef.current.focus()}
//                                         />

//                                         <ErrorMessage
//                                             render={msg => <ErrorTextDY title={msg} />}
//                                             name="name"
//                                         />
//                                         <View height={20} />


//                                         <TextField
//                                             onChangeText={handleChange('phone')}
//                                             onBlur={handleBlur('phone')}
//                                             value={values.phone}
//                                             placeholder={'Phone number'}
//                                             keyboardType={"phone-pad"}
//                                             autoCapitalize="none"
//                                             iconPath={PHONE_ICON}
//                                             returnKeyType={"next"}
//                                             mainplaceholder={"Enter your phone number"}
//                                             phoneValue={"+91"}
//                                             onSubmitEditing={() => passwordRef.current.focus()}
//                                         />

//                                         <ErrorMessage
//                                             render={msg => <ErrorTextDY title={msg} />}
//                                             name="phone"
//                                         />



//                                         <View height={20} />

//                                         {/* password validation parts */}
//                                         <TextField
//                                             ref={passwordRef}
//                                             onChangeText={handleChange('password')}
//                                             onBlur={handleBlur('password')}
//                                             value={values.password}
//                                             iconPath={PASSWORD_ICON}
//                                             placeholder={'Password'}
//                                             mainplaceholder={"Enter password"}
//                                             isPassword
//                                             isvisible
//                                         />
//                                         <ErrorMessage
//                                             render={msg => <ErrorTextDY title={msg} />}
//                                             name="password"
//                                         />



//                                         <ButtonDy
//                                             // onPress={handleSubmit}
//                                             onPress={() => navigation.navigate('SetUpProfile')}
//                                             title={'Create account'}
//                                             style={styles.button}
//                                             textStyle={styles.buttontext}
//                                             processing={signinProcess}
//                                         />

//                                         <Horizontalline />
//                                         <View style={styles.googleview}>
//                                             <Image
//                                                 source={GOOGLE_ICON}
//                                                 style={{ height: 50, width: 50 }}
//                                                 resizeMode="contain"
//                                             />
//                                             <View width={30} />
//                                             <Facebook />
//                                         </View>
//                                         <View height={20} />

//                                         <Text style={styles.dontHaveText}>
//                                             {'Already have an account?'}
//                                             {`  `}
//                                             <Text style={styles.signup}
//                                                 onPress={() => navigation.navigate('Login')}
//                                             >
//                                                 {'SignIn'}
//                                             </Text>
//                                         </Text>

//                                     </>
//                                 )}
//                             </Formik>
//                         </View>
//                     </ScrollView>
//                 </ImageBackground>
//             </KeyboardAwareView>
//         </SafeAreaView>
//     );
// };

// export default Signup;
