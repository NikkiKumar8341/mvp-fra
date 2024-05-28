import * as Yup from 'yup';

const mailRegEx = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const registrationSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^[A-Za-z]+$/, 'First name should only contain Alphabets and no spaces')
        .min(3, 'First name must be at least 3 characters')
        .max(50, 'First name cannot be longer than 50 characters')
        .required('First name is required'),
    lastName: Yup.string()
        .matches(/^[A-Za-z]+$/, 'First name should only contain Alphabets and no spaces')
        .min(3, 'Last name must be at least 3 characters')
        .max(50, 'Last name cannot be longer than 50 characters')
        .required('Last name is required'),
    emailAddress: Yup.string().email('Invalid Email').matches(mailRegEx, 'Invalid Email').required('Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Phone number is required'),
    countryCode: Yup.string().required('Country Code is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
            'Password must contain one lowercase letter, one uppercase letter, one number, one special character, and be 8-12 characters long.'
        )
        .min(8, 'Password cannot be more than 8 characters long')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .min(8, 'Password cannot be more than 8 characters long')
        .required('Confirm password is required'),
});

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').matches(mailRegEx, 'Invalid Email').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password cannot be more than 8 characters long')
        .required('Password is required'),
});

export { registrationSchema, loginSchema };