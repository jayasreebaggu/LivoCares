import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, ScrollView, Alert } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './style';
import HeaderDy from '../../common/Components/HeaderDy';
import ButtonDy from '../../common/Components/ButtonDy';
import { login, sendOtp } from '../../services/userService';

const OTPScreen = ({ navigation, route }) => {
  const { phoneNumber } = route.params; 
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [timer, setTimer] = useState(29);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOTP = async () => {
    if (value.length !== CELL_COUNT) {
      Alert.alert("Invalid OTP", "Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await login(phoneNumber, value); // Use login from UserService
      console.log("LOGIN Response:", response);

      // Navigate to HomeTab on successful login
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTab' }],
      });
    } catch (error) {
      console.error("Verify OTP error:", error);
      Alert.alert("Error", error.message || "Failed to verify OTP. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    try {
      if (resendDisabled) return; // Prevent multiple resends

      await sendOtp(phoneNumber);
      setTimer(29);
      setResendDisabled(true);
      setValue('');
      Alert.alert('OTP Resent', 'A new OTP has been sent to your phone.');
    } catch (error) {
      console.error('Resend OTP error:', error);
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeaderDy isBack istitle iconstylestyles={{ paddingLeft: -100 }} />
        <Text style={styles.verifytext}>{'OTP'}</Text>
        <Text style={styles.subtextgray}>
          {`Enter the OTP sent to ${phoneNumber}`}
        </Text>

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <Text style={styles.bottomtext}>
          {`Resend in 0:${timer < 10 ? '0' + timer : timer}`}
          {'  '}
          <Text
            style={[styles.mobiletext, resendDisabled && { color: 'gray' }]}
            onPress={handleResendOTP}
          >
            {'Resend code'}
          </Text>
        </Text>

        <ButtonDy
          onPress={handleVerifyOTP}
          title={'Verify OTP'}
          style={styles.button}
          textStyle={styles.buttontext}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OTPScreen;




// import React, { useState } from 'react';
// import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
// import styles from './style';
// import { login } from '../../services/apiService';

// const OTPScreen = ({ route, navigation }) => {
//     const { phoneNumber } = route.params;
//     const [otp, setOtp] = useState('');

//     const handleVerifyOTP = async () => {
//         try {
//             const response = await login(phoneNumber, otp);
//             if (response.token) {
//                 navigation.navigate('HomeTab');
//             } else if (response.failure_code === "PARTNER_ACCOUNT_DOESNOT_EXIST") {
//                 navigation.navigate('Signup', { phoneNumber });
//             } else {
//                 console.error('Invalid OTP');
//             }
//         } catch (error) {
//             console.error('OTP verification failed:', error);
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <Text style={styles.title}>Enter OTP</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter OTP"
//                 keyboardType="number-pad"
//                 value={otp}
//                 onChangeText={setOtp}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
//                 <Text style={styles.buttonText}>Verify</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// export default OTPScreen;




// import React, { useState } from 'react';
// import { SafeAreaView, Text, ScrollView } from 'react-native';
// import {
//     CodeField,
//     Cursor,
//     useBlurOnFulfill,
//     useClearByFocusCell,
// } from 'react-native-confirmation-code-field';
// import styles from './style';
// import HeaderDy from '../../common/Components/HeaderDy';
// import ButtonDy from '../../common/Components/ButtonDy';

// const OTPScreen = ({ navigation }) => {
//     const CELL_COUNT = 4;
//     const [value, setValue] = useState('');
//     const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
//     const [props, getCellOnLayoutHandler] = useClearByFocusCell({
//         value,
//         setValue,
//     });

//     return (
//         <SafeAreaView style={styles.safeContainer}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 {/* header Ip */}
//                 <HeaderDy isBack istitle  iconstylestyles={{paddingLeft:-100}}/>

//                 {/* verify text */}
//                 <Text style={styles.verifytext}>{'OTP'}</Text>

//                 {/* send code textview */}
//                 <Text style={styles.subtextgray}>{'Put the OTP number below sent to your number+254 5684 586 942'}</Text>

//                 {/* otp code text field */}
//                 <CodeField
//                     ref={ref}
//                     {...props}
//                     value={value}
//                     onChangeText={setValue}
//                     cellCount={CELL_COUNT}
//                     rootStyle={styles.codeFieldRoot}
//                     keyboardType="number-pad"
//                     textContentType="oneTimeCode"
//                     renderCell={({ index, symbol, isFocused }) => (
//                         <Text
//                             key={index}
//                             style={[styles.cell, isFocused && styles.focusCell]}
//                             onLayout={getCellOnLayoutHandler(index)}>
//                             {symbol || (isFocused ? <Cursor /> : null)}
//                         </Text>
//                     )}
//                 />

//                 {/* Resend Code Text */}
//                 <Text style={styles.bottomtext}>
//                     {'Code send in 0:29'}
//                     {`  `}
//                     <Text style={styles.mobiletext}>{'Resend code'}</Text>
//                 </Text>

//                 {/* Verify button */}
//                 <ButtonDy
//                     onPress={() => navigation.navigate('NewPassword')}
//                     title={'Change Password'}
//                     style={styles.button}
//                     textStyle={styles.buttontext}
//                 />
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default OTPScreen;