import React, { useEffect, useState } from 'react'
import './Registration.scss'
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { registrationSchema } from '../ValidationSchema';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const Registration = () => {
  // State variables for form fields, modals, and other UI elements
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEmailExistsModal, setShowEmailExistsModal] = useState(false);
  const [userNameExistsModal, setUserNameExistsModal] = useState(false);
  const [countryCodes, setCountryCodes] = useState([]);

  const navigate = useNavigate();
  const REGISTRATION_URL = 'https://usermanagement-jav.motivitylabs.com/api/user/register';
  const COUNTRY_CODE_URL = 'https://usermanagement-jav.motivitylabs.com/api/user/fetchcountrycode';

  // Function to toggle the success modal and email exists modal
  const toggleSuccessModal = () => {
    setShowSuccessModal(!showSuccessModal);
  };

  const toggleEmailExistsModal = () => {
    setShowEmailExistsModal(!showEmailExistsModal);
  };

  // const toggleUserNameExistsModal = () => {
  //   setUserNameExistsModal(!userNameExistsModal);
  // }


  const handleSubmit = async (values, formikBag) => {
    const data = {
      firstName: values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1),
      lastName: values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1),
      emailAddress: values.emailAddress,
      password: values.password,
      confirmPassword: values.password === values.confirmPassword,
      countryCode: values.countryCode,
      role: values.role,
      contactNumber: values.phoneNumber
    };
    try {
      const response = await fetch(REGISTRATION_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Check the response status and show modals accordingly
      if (response.status === 409) {
        const errorMessage = await response.text();
        setShowEmailExistsModal(true);
      } else if (response.status === 500) {
        const errorMessage = await response.text();
        // setUserNameExistsModal(true)
      }
      else if (response.status === 201) {
        formikBag.resetForm();
        setShowSuccessModal(true);
      } else {
        // const responseData =  await response.json();
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  // Function to fetch country codes on component mount
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch(COUNTRY_CODE_URL);
        if (response.ok) {
          const responseData = await response.json();
          const data = responseData.responseData;
          const countryCodes = data.map((country) => country.countryCode);
          setCountryCodes(countryCodes);
        } else {
          console.error('Failed to fetch country codes');
        }
      } catch (error) {
        console.error('Error fetching country codes:', error);
      }
    };

    fetchCountryCodes();
  }, []);


  return (
    <div className='container-fluid px-0 overflow-x-hidden'>
      <div className='login-bg'>
        <div className="mt-4 login">
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="border rounded bg-white shadow-lg p-3">
                <h3 className="text-center mt-2">Registration</h3>
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    emailAddress: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                    countryCode: '+91',
                    role: 'CUSTOMER',
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={registrationSchema}
                >
                  {({ isValid, dirty, touched, errors }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-5 col-xs-12 col-sm-5 form-group my-2">
                          <label className="form-check-label" htmlFor="roleAdmin">
                            USER
                          </label>
                          <Field
                            type="radio"
                            className="form-check-input custom-radio-color"
                            id="roleAdmin"
                            name="role"
                            value="USER"
                            checked
                          />
                          {touched.role && errors.role && (
                            <div className="text-danger">{errors.role}</div>
                          )}
                        </div>
                        <div className="col-md-6 col-xs-12 col-sm-6 form-group my-2 ">
                          <label className="form-check-label" htmlFor="roleRepresentative">
                            REPRESENTATIVE
                          </label>
                          <Field
                            type="radio"
                            className="form-check-input"
                            id="roleRepresentative"
                            name="role"
                            value="REPRESENTATIVE"
                          />
                          {touched.role && errors.role && (
                            <div className="text-danger">{errors.role}</div>
                          )}
                        </div>
                        <div className="col-9 form-group my-2 mx-auto">
                          <Field
                            type="text"
                            name="firstName"
                            id="firstName"  
                            className="form-control"
                            placeholder="Enter First Name"
                            style={{ textTransform: 'capitalize' }}
                          />
                          {touched.firstName && errors.firstName && (
                            <div className="text-danger">{errors.firstName}</div>
                          )}
                        </div>
                        <div className="col-9 form-group my-2 mx-auto">
                          <Field
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="form-control"
                            placeholder="Enter Last Name"
                            style={{ textTransform: 'capitalize' }}
                          />
                          {touched.lastName && errors.lastName && (
                            <div className="text-danger">{errors.lastName}</div>
                          )}
                        </div>
                        <div className="col-9 form-group my-2 mx-auto">
                          <Field
                            type="text"
                            name="emailAddress"
                            id="emailAddress"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                          {touched.emailAddress && errors.emailAddress && (
                            <div className="text-danger">{errors.emailAddress}</div>
                          )}
                        </div>
                        <div className="col-9 form-group my-2 mx-auto">
                          <div className="input-group">
                            <Field
                              as="select"
                              name="countryCode"
                              id="countryCode"
                              className="custom-select"
                            >
                              {countryCodes.map((code) => (
                                <option key={code} value={code}>
                                  {code}
                                </option>
                              ))}
                            </Field>

                            <ErrorMessage
                              name="countryCode"
                              component="div"
                              className="text-danger"
                            />
                            <Field
                              type="tel"
                              pattern="[0-9]*"
                              maxLength={10}
                              name="phoneNumber"
                              className="form-control"
                              placeholder="Enter Phone Number"
                              id="phoneNumber"
                              onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                              }}
                            />
                          </div>
                          {touched.phoneNumber && errors.phoneNumber && (
                            <div className="text-danger">{errors.phoneNumber}</div>
                          )}
                        </div>
                        <div className="col-9 form-group my-2 mx-auto">
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            maxLength={12}
                            className="form-control"
                            placeholder="Enter Password"
                          />
                          {touched.password && errors.password && (
                            <div className="text-danger">{errors.password}</div>
                          )}
                        </div>
                        <div className="col-9 form-group my-2 mx-auto">
                          <Field
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="form-control"
                            placeholder="Enter Confirm Password"
                            maxLength={12}
                          />
                          {touched.confirmPassword && errors.confirmPassword && (
                            <div className="text-danger">{errors.confirmPassword}</div>
                          )}
                        </div>
                        <div className="col-9 form-group my-2 mx-auto">
                          <button type="submit" className="btn-sm login-button rounded border-0 text-light w-100 py-1 mx-auto" disabled={!isValid || !dirty}>Register</button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
                <Modal isOpen={showSuccessModal} toggle={toggleSuccessModal}>
                  <ModalHeader toggle={toggleSuccessModal}>Registration Successful</ModalHeader>
                  <ModalBody>
                    Registered successfully!!.
                  </ModalBody>
                  <ModalFooter>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn-sm login-button rounded border-0 text-light w-100 py-1  mx-auto"
                        onClick={() => {
                          toggleSuccessModal();
                          navigate('/login');
                        }}>
                        OK
                      </button>
                    </div>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={showEmailExistsModal} toggle={toggleEmailExistsModal}>
                  <ModalHeader toggle={toggleEmailExistsModal}>Email Already Exists</ModalHeader>
                  <ModalBody>
                    The email address you provided already exists. Please use a different email address.
                  </ModalBody>
                  <ModalFooter>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn-sm login-button rounded border-0 text-light w-100 py-1  mx-auto" onClick={toggleEmailExistsModal}>
                        OK
                      </button>
                    </div>
                  </ModalFooter>
                </Modal>
                {/* <Modal isOpen={userNameExistsModal} toggle={toggleUserNameExistsModal}>
                  <ModalHeader toggle={toggleUserNameExistsModal}>UserName Already Exists</ModalHeader>
                  <ModalBody>
                    The User Name you provided already exists. Please use a different User Name.
                  </ModalBody>
                  <ModalFooter>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn-sm login-button rounded border-0 text-light w-100 py-1  mx-auto" onClick={toggleUserNameExistsModal}>
                        OK
                      </button>
                    </div>
                  </ModalFooter>
                </Modal> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration;