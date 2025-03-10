import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Alert } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import { setProfileValues } from '../../utils/formixInitials';
import { setProfileSchema } from '../../utils/validationSchema';
import styles from './style';
import TextField from '../../common/Components/TextField';
import ErrorTextDY from '../../common/Components/ErrorTextDY';
import ButtonDy from '../../common/Components/ButtonDy';
import HeaderDy from '../../common/Components/HeaderDy';
import { signup} from '../../services/userService';

const SetUpProfile = ({ navigation }) => {
    const [testValue, setTestValue] = useState("");

    const handleComplete = async (values) => {
        try {
            // Prepare the data for the signup API
            const profileData = {
                address: values.address,
                // Add other profile fields as needed
            };

            // Call your signup API here
            const response = await signup(profileData);
            if (response.success) {
                // Navigate to HomeTab on success
                navigation.navigate('HomeTab');
            } else {
                Alert.alert("Error", response.error_message || "Failed to set up profile.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            Alert.alert("Error", "An error occurred while setting up your profile.");
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <HeaderDy isBack istitle />
                <Text style={styles.forgotPasswordText}>{"Set up your profile"}</Text>
                <Text style={styles.sendingYouOTPText}>
                    {'Update your profile to connect your doctor with better impression.'}
                </Text>

                <Formik
                    initialValues={setProfileValues}
                    validationSchema={setProfileSchema}
                    onSubmit={handleComplete}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <>
                            <View style={{ marginHorizontal: "3%" }}>
                                <TextField
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                    placeholder={'Address'}
                                    mainplaceholder={"Lal Darwaja, Surat"}
                                    autoCapitalize="none"
                                />
                                <ErrorMessage render={msg => <ErrorTextDY title={msg} />} name="address" />

                                <ButtonDy
                                    onPress={handleSubmit}
                                    title={'Complete'}
                                    style={styles.continueButton}
                                    textStyle={styles.buttontext}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SetUpProfile;





// import React, { useRef, useState } from 'react';
// import { SafeAreaView, ScrollView, View, Text } from 'react-native';
// import { Formik, ErrorMessage } from 'formik';
// import { setProfileValues } from '../../utils/formixInitials';
// import { setProfileSchema } from '../../utils/validationSchema';
// import styles from './style';
// import TextField from '../../common/Components/TextField';
// import ErrorTextDY from '../../common/Components/ErrorTextDY';
// import ButtonDy from '../../common/Components/ButtonDy';
// import HeaderDy from '../../common/Components/HeaderDy';
// import Editmain from '../../assets/Images/SVG/Editmain';
// import CameraIcon from '../../assets/Images/SVG/CameraIcon';
// import GENDER_ICON from '../../assets/Images/Temp/gender.png';
// import CALENDER_ICON from '../../assets/Images/Temp/calender.png';
// import LOCATION_ICON from '../../assets/Images/Temp/location.png';


// const SetUpProfile = ({ navigation }) => {

//     const passwordRef = useRef(null);
//     const [testValue, setTestValue] = useState("");

//     return (
//         <SafeAreaView style={styles.safeContainer}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>

//                 {/* header Ip */}
//                 <HeaderDy isBack istitle />
//                 {/* Forgot Password Text */}
//                 <Text style={styles.forgotPasswordText}>{"Set up your profile"}</Text>
//                 <Text style={styles.sendingYouOTPText}>
//                     {'Update  your profile to connect your doctor with better impression.'}
//                 </Text>
//                 <View style={styles.iconmainview}>
//                     <Editmain />
//                     <View style={styles.iconview}>
//                         <CameraIcon />
//                     </View>

//                 </View>

//                 <Formik
//                     initialValues={setProfileValues}
//                     validationSchema={setProfileSchema}
//                     onSubmit={values => {
//                         __onSubmitPress(values)
//                         console.log(values);
//                     }}>
//                     {({ handleChange, handleBlur, handleSubmit, values }) => (
//                         <>
//                             <View style={{ marginHorizontal: "3%" }}>
//                                 <View height={40} />

//                                 <TextField
//                                     iconPath={GENDER_ICON}
//                                     placeholder={'Gender'}
//                                     genderValue
//                                 />
//                                 <View height={20} />
//                                 <TextField
//                                     iconPath={CALENDER_ICON}
//                                     placeholder={'Date of birth'}
//                                     value={testValue}
//                                     changeValue={setTestValue}
//                                     datepickerValue
//                                 />
//                                 <View height={20} />



//                                 <TextField
//                                     onChangeText={handleChange('address')}
//                                     onBlur={handleBlur('address')}
//                                     value={values.address}
//                                     placeholder={'Address'}
//                                     mainplaceholder={"Lal Darwaja, Surat"}
//                                     autoCapitalize="none"
//                                     iconPath={LOCATION_ICON}
//                                     returnKeyType={"next"}
//                                     onSubmitEditing={() => passwordRef.current.focus()}
//                                 />

//                                 <ErrorMessage
//                                     render={msg => <ErrorTextDY title={msg} />}
//                                     name="address"
//                                 />

//                             </View>
//                             <ButtonDy
//                                 onPress={() => navigation.navigate('HomeTab')}
//                                 title={'Complete'}
//                                 style={styles.continueButton}
//                                 textStyle={styles.buttontext}
//                             />

//                         </>
//                     )}
//                 </Formik>

//             </ScrollView>

//         </SafeAreaView>
//     );
// };

// export default SetUpProfile;