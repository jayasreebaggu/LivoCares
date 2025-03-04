import {
    Text,
    View,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Image,
    Alert,
  } from 'react-native';
  import React, { useRef, useState } from 'react';
  import { SvgXml } from 'react-native-svg';
  import styles from './style';
  import Loginlogo from '../../assets/Images/SVG/Loginlogo';
  import Background from '../../assets/Images/Temp/background_image.png';
  import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
  import PHONE_ICON from '../../assets/Images/Temp/phone.png';
  import ButtonDy from '../../common/Components/ButtonDy';
  import TextField from '../../common/Components/TextField';
  import { ErrorMessage, Formik } from 'formik';
  import { loginValues } from '../../utils/formixInitials';
  import { LoginSchema } from '../../utils/validationSchema';
  import ErrorTextDY from '../../common/Components/ErrorTextDY';
  import { sendOtp } from '../../services/userService';

  
  const Login = ({ navigation }) => {
    const [error, setError] = useState('');
    const windowHeight = Dimensions.get('window').height;

    const onSendOTP = async (values) => {
        try {
          console.log('Sending OTP for:', values.phoneNumber); // Add this line
          await sendOtp(values.phoneNumber);
          console.log('OTP sent successfully'); // Add this line
          navigation.navigate('OTPScreen', { phoneNumber: values.phoneNumber });
        } catch (error) {
          console.error('Send OTP error:', error);
          
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
                            initialValues={loginValues}
                            // validationSchema={LoginSchema}
                            // validateOnMount
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



// import React, { useState } from 'react';
// import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
// import styles from './style';
// import { sendOtp } from '../../services/apiService';

// const Login = ({ navigation }) => {
//     const [phoneNumber, setPhoneNumber] = useState('');

//     const handleLogin = async () => {
//         try {
//             const response = await sendOtp(phoneNumber);
//             if (response.success) {
//                 navigation.navigate('OTPScreen', { phoneNumber });
//             }
//         } catch (error) {
//             console.error('OTP send failed:', error);
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <Text style={styles.title}>Login</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter phone number"
//                 keyboardType="phone-pad"
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleLogin}>
//                 <Text style={styles.buttonText}>Send OTP</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// export default Login;





// import {
//   Text,
//   View,
//   ImageBackground,
//   SafeAreaView,
//   ScrollView,
//   Dimensions,
//   Image
// } from 'react-native';
// import React, { useRef, useState } from 'react';
// import { SvgXml } from 'react-native-svg';
// import styles from './style';
// import Loginlogo from '../../assets/Images/SVG/Loginlogo';
// import Background from '../../assets/Images/Temp/background_image.png';
// import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
// import EMAIL_ICON from '../../assets/Images/Temp/email.png';
// import PASSWORD_ICON from '../../assets/Images/Temp/password.png';
// import ButtonDy from '../../common/Components/ButtonDy';
// import TextField from '../../common/Components/TextField';
// import { ErrorMessage, Formik } from 'formik';
// import { CommonActions } from '@react-navigation/native';
// import { loginValues } from '../../utils/formixInitials';
// import { LoginSchema } from '../../utils/validationSchema';
// import ErrorTextDY from '../../common/Components/ErrorTextDY';
// // import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import Horizontalline from './Components/Horizontalline';
// import Facebook from '../../assets/Images/SVG/Facebook';
// import GOOGLE_ICON from '../../assets/Images/Temp/Google_Icon.png'


// const Login = ({ navigation }) => {

//   const passwordRef = useRef(null);
//   const windowHeight = Dimensions.get('window').height;




//   return (
//     <SafeAreaView style={styles.safeContainer}>
//       <KeyboardAwareView animated={true}>
//         <ImageBackground
//           source={Background}
//           resizeMode="stretch"
//           style={styles.imagebackgroundstyle}>
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//             {/* logo image */}
//             <View style={{ alignSelf: "center", top: windowHeight / 4.5 }}>
//               <Loginlogo />
//             </View>
//             {/* hightview */}
//             <View style={{ height: windowHeight / 4 }} />

//             {/* login text */}
//             <Text style={styles.logintext}>Welcome to</Text>
//             <Text style={styles.doctortext}>LivoCares</Text>

//             <View style={styles.container}>
//               <Formik
//                 initialValues={loginValues}
//                 validationSchema={LoginSchema}
//               // onSubmit={__onLoginPress}
//               >
//                 {({ handleChange, handleBlur, handleSubmit, values }) => (
//                   <>
//                     {/* Number validation parts */}
//                     <TextField
//                       onChangeText={handleChange('email')}
//                       onBlur={handleBlur('email')}
//                       value={values.email}
//                       placeholder={'Email'}
//                       keyboardType={"email-address"}
//                       mainplaceholder={"johndoe@gmail.com"}
//                       autoCapitalize="none"
//                       iconPath={EMAIL_ICON}
//                       returnKeyType={"next"}
//                       onSubmitEditing={() => passwordRef.current.focus()}
//                     />

//                     <ErrorMessage
//                       render={msg => <ErrorTextDY title={msg} />}
//                       name="email"
//                     />
//                     <View height={20} />
//                     {/* password validation parts */}
//                     <TextField
//                       ref={passwordRef}
//                       onChangeText={handleChange('password')}
//                       onBlur={handleBlur('password')}
//                       mainplaceholder={"Enter password"}
//                       value={values.password}
//                       iconPath={PASSWORD_ICON}
//                       placeholder={'Password'}
//                       isPassword
//                       isvisible
//                     />
//                     <ErrorMessage
//                       render={msg => <ErrorTextDY title={msg} />}
//                       name="password"
//                     />

//                     {/* forgot password text */}
//                     <Text
//                       onPress={() => navigation.navigate("Forgotpassword")}
//                       style={styles.forgorText}
//                     >
//                       {'ForgotPassword ?'}
//                     </Text>

//                     <ButtonDy
//                       onPress={() => navigation.navigate("HomeTab")}
//                       title={'Sign In'}
//                       style={styles.button}
//                       textStyle={styles.buttontext}
//                     // processing={signinProcess}
//                     />

//                     <Horizontalline />
//                     <View style={styles.googleview}>
//                       <Image
//                         source={GOOGLE_ICON}
//                         style={{ height: 50, width: 50 }}
//                         resizeMode="contain"
//                       />
//                       <View width={30} />
//                       <Facebook />
//                     </View>
//                     <View height={20} />

//                     <Text style={styles.dontHaveText}>
//                       {'Don’t have an account?'}
//                       {`  `}
//                       <Text style={styles.signup}
//                         onPress={() => navigation.navigate('Signup')}
//                       >
//                         {'Create New'}
//                       </Text>
//                     </Text>

//                   </>
//                 )}
//               </Formik>
//             </View>

//           </ScrollView>
//         </ImageBackground>
//       </KeyboardAwareView>
//     </SafeAreaView>
//   );
// };

// export default Login;

