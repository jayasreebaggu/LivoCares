import * as Yup from 'yup';

const phoneRegExp =
    /^[6789]\d{9}$/;

export const SendOtpSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .required('Required phone number!')
        .matches(phoneRegExp, 'Phone number is not valid'),
});

export const SignupSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .required('Required phone number!')
        .matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().email().required('Required email!').label('Email'),
    firstName: Yup.string()
        .required('Required first name')
        .min(2, 'Short!'),
    lastName: Yup.string()
        .required('Required last name'),
    height: Yup.number()
        .required('Required height'),
    weight: Yup.number()
        .required('Required weight'),
    currentLocation: Yup.string(),
    dob: Yup.string()
        .required('Required dob'),
    gender: Yup.string()
        .required('Required gender'),
});


export const ForgotPasswordSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Required phone!')
        .matches(phoneRegExp, 'Phone number is not valid'),
});

export const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(4, 'Short!')
        .required('Password Required')
        .label('Password'),
    conformpassword: Yup.string()
        .required('Required conformpassword!')
        .min(4, 'Short!')
        .label('Password')
        .when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref('password')],
                'Both password need to be the same',
            ),
        }),
});

export const HelpSchema = Yup.object().shape({
    message: Yup.string()
        .required('Required message')
        .min(2, 'Short!')
        .label('message'),
});


export const editProfileSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required name')
        .min(2, 'Short!')
        .label('name'),
    phone: Yup.string()
        .required('Required phone!')
        .matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string().email().required('Required email!').label('Email'),
    address: Yup.string()
        .required('Required address')
        .min(2, 'Short!')
        .label('address'),
});

export const PatientProfileSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required name')
        .min(2, 'Short!')
        .label('name'),
    phone: Yup.string()
        .required('Required phone!')
        .matches(phoneRegExp, 'Phone number is not valid'),
    symptoms: Yup.string()
        .required('Required symptoms')
        .min(2, 'Short!')
        .label('symptoms'),
});

export const PatientProfile4Schema = Yup.object().shape({
    Chloroquine: Yup.string()
        .required('Required Chloroquine')
        .min(2, 'Short!')
        .label('Chloroquine'),
    location: Yup.string()
        .required('Required location')
        .min(2, 'Short!')
        .label('location'),
});

export const CarddetailsSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required name')
        .min(2, 'Short!')
        .label('name'),
    cardnumber: Yup.string()
        .required('Required cardnumber')
        .min(2, 'Short!')
        .label('cardnumber'),
    expiredate: Yup.string()
        .required('Required expiredate')
        .min(2, 'Short!')
        .label('expiredate'),
    cvv: Yup.string()
        .required('Required cvv')
        .min(2, 'Short!')
        .label('cvv'),
});

export const ReviewSchema = Yup.object().shape({
    message: Yup.string()
        .required('Required message')
        .min(2, 'Short!')
        .label('message'),
});

export const setProfileSchema = Yup.object().shape({
    address: Yup.string()
        .required('Required address')
        .min(2, 'Short!')
        .label('address'),
});