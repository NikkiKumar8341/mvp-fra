import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ResetPassword = () => {

    // State variables for success and error modals
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [message, setMessage] = useState('');

    // Function to toggle the success and error modal
    const toggleSuccessModal = () => setShowSuccessModal(!showSuccessModal);
    const toggleErrorModal = () => setShowErrorModal(!showErrorModal);

    // React Router hooks for navigation and api url
    const navigate = useNavigate();
    const location = useLocation();
    const initialEmail = location.state ? location.state.email || '' : '';
    const RESET_URL = 'https://usermanagement-jav.motivitylabs.com/api/user/resetpassword'

    // Function to handle form submission
    const handleSubmit = async (values) => {
        const data = {
            email: values.email,
            changePasswordId: values.changePasswordId,
            newPassword: values.newPassword,
        }
        try {
            const response = await fetch(RESET_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            // Check the response status and show modals accordingly
            if (response.status === 200) {
                const message = await response.text();
                setMessage(message);
                setShowSuccessModal(true);
            } else {
                setShowErrorModal(true);
                console.error('Password reset failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container-fluid px-0 overflow-x-hidden'>
            <div className='login-bg'>
                <div className="mt-4 login">
                    <div className="row justify-content-center">
                        <div className="col-md-4 mb-4">
                            <div className="border rounded bg-white shadow-lg p-3">
                                <h1 className="text-center mt-2">Reset Password</h1>
                                <Formik
                                    initialValues={{
                                        email: initialEmail,
                                        changePasswordId: '',
                                        newPassword: '',
                                        confirmPassword: '',
                                    }}
                                    onSubmit={handleSubmit}
                                >
                                    <Form>
                                        <div className="row">
                                            <div className="col-9 form-group my-2 mx-auto">
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Enter Email"
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-9 form-group my-2 mx-auto">
                                                <Field
                                                    type="changePasswordId"
                                                    name="changePasswordId"
                                                    id="changePasswordId"
                                                    className="form-control"
                                                    placeholder="Enter Change Password Id"
                                                />
                                            </div>
                                            <div className="col-9 form-group my-2 mx-auto">
                                                <Field
                                                    type="password"
                                                    name="newPassword"
                                                    id="newPassword"
                                                    className="form-control"
                                                    placeholder="Enter New Password"
                                                />
                                            </div>
                                            <div className="col-9 form-group my-2 mx-auto">
                                                <Field
                                                    type="password"
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    className="form-control"
                                                    placeholder="Enter Confirm Password"
                                                />
                                            </div>
                                            <div className="col-9 form-group my-2 mx-auto">
                                                <button type="submit" className="btn-sm login-button rounded border-0 text-light w-100 py-1 mx-auto">Submit</button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={showSuccessModal} toggle={toggleSuccessModal}>
                <ModalHeader toggle={toggleSuccessModal}>Success</ModalHeader>
                <ModalBody>Password reset successful.</ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn-sm login-button rounded border-0 text-light w-100 py-1 mx-auto" onClick={() => {
                            toggleSuccessModal();
                            navigate('/login');
                        }}
                        >
                            Ok
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
            <Modal isOpen={showErrorModal} toggle={toggleErrorModal}>
                <ModalHeader toggle={toggleErrorModal}>Error</ModalHeader>
                <ModalBody>Password reset failed.</ModalBody>
                <ModalFooter>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn-sm login-button rounded border-0 text-light w-100 py-1 mx-auto" onClick={() => {
                            toggleErrorModal();
                            navigate('/login')
                        }}
                        >
                            Close
                        </button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ResetPassword