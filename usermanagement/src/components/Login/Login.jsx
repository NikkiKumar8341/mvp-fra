import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Field, Form, Formik, replace } from "formik";
import { loginSchema } from "../ValidationSchema";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import useAuth from "../routing/useAuth";
import { da } from "date-fns/locale";

const Login = () => {
  // State variables for managing form input, modals, and messages
  const [email, setEmail] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const inactivityTimeout = 2 * 60 * 1000;

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location, "login");

  // Function to toggle the success and error modal
  const toggleSuccessModal = () => setShowSuccessModal(!showSuccessModal);
  const toggleErrorModal = () => setShowErrorModal(!showErrorModal);

  // Define the 'navigate' function to enable navigation in the application and api urls
  const FORGET_URL = `https://usermanagement-jav.motivitylabs.com/api/user/forgotpassword?loginId=${email}`;
  const LOGIN_URL =
    "https://usermanagement-jav.motivitylabs.com/api/user/signin";

  // Function to toggle the OTP modal
  const toggleOtpModal = () => {
    setOtpModalOpen(!otpModalOpen);
  };

  // Function to toggle the "Forgot Password" modal
  const toggleForgotPasswordModal = () => {
    setForgotPasswordModalOpen(!forgotPasswordModalOpen);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle the "Forgot Password" functionality and making a POST request to the server to initiate the password reset process
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(FORGET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      // Check the response status
      if (response.status === 200) {
        const responseData = await response.json();
        const data = responseData.responseData;
        setMessage(data);
        setIsModalOpen(true);
      } else {
        const responseData = await response.json();
        const data = responseData.errorMessages;
        setError(data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error: Unable to process the request.");
    }
  };

  // Function to close the modal and navigate to the password reset page
  const closeModal = () => {
    setIsModalOpen(false);
    if (message) {
      navigate("/resetpassword", { state: { email } });
    }
  };

  // Function to handle the form submission and Make a POST request to the server for user login
  const handleSubmit = async (values, formikBag) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const responseData = await response.json();
        const data = responseData.responseData;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("role", data.role);

        // formikBag.resetForm();
        // setShowSuccessModal(true);
        setUsername(data.userName);
        setAuth({
          user: data.userName,
          role: data.role,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        if (data.role === "CUSTOMER") {
          console.log(navigate("/dashboard"), {replace:true});
          navigate("/dashboard", { replace: true });
        } else if (data.role === "REPRESENTATIVE") {
          navigate("/representative", { replace: true });
        } else if (data.role === "ADMIN") {
          navigate("/admin/", { replace: true });
        }
      } else {
        const errorMessage = await response.text();
        setErrorText(errorMessage);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorText("An error occurred. Please try again.");
      setShowErrorModal(true);
    }
  };

  

  return (
    <div className="container-fluid px-0 overflow-x-hidden">
      <div className="login-bg">
        <div className="mt-7 login">
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="border rounded bg-white shadow-lg p-3">
                <h3 className="text-center mt-2">Login</h3>
                <h6 className="text-center py-1 px-5">
                  Hey, Enter your details to get sign in into the account
                </h6>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isValid, dirty, touched, errors }) => (
                    <div className="row">
                      <Form>
                        <div className="col-10 form-group my-4 mx-auto">
                          <Field
                            type="text"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                          {touched.email && errors.email && (
                            <div className="text-danger">{errors.email}</div>
                          )}
                        </div>
                        <div className="col-10 form-group my-4 mx-auto">
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter Password"
                          />
                          {touched.password && errors.password && (
                            <div className="text-danger">{errors.password}</div>
                          )}
                          <a
                            className="text-end"
                            onClick={toggleForgotPasswordModal}
                          >
                            <small>Forgot Password?</small>
                          </a>
                        </div>
                        <div className="col-10 form-group my-4 mx-auto">
                          <button
                            type="submit"
                            className="btn-sm login-button rounded border-0 text-light w-100 py-1  mx-auto"
                            disabled={!isValid || !dirty}
                          >
                            Login
                          </button>
                        </div>
                      </Form>
                      <p className="text-center p-2">
                        <small>
                          Don't have an account?{" "}
                          <Link to="/register" className="fw-bold p-1">
                            Create new
                          </Link>
                        </small>
                      </p>
                      <p className="text-center">Or</p>
                      <div className="row justify-content-center">
                        <div className="col-2 text-center">
                          <img
                            src="/images/googleIcon.png"
                            alt="Logo 1"
                            className="img-thumbnail rounded-circle"
                          />
                        </div>
                        <div className="col-2 text-center">
                          <img
                            src="/images/facebook.png"
                            alt="Logo 2"
                            className="img-thumbnail rounded-circle"
                          />
                        </div>
                        <div className="col-2 text-center">
                          <img
                            src="/images/appleImage.png"
                            alt="Logo 3"
                            className="img-thumbnail rounded-circle "
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Formik>
                <Modal isOpen={otpModalOpen} toggle={toggleOtpModal}>
                  <ModalHeader toggle={toggleOtpModal}>Enter OTP</ModalHeader>
                  <ModalBody>
                    <Input type="text" placeholder="OTP" maxLength={6} />
                  </ModalBody>
                  <ModalFooter>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn-sm login-button rounded border-0 text-light w-100 py-1 mx-auto"
                        onClick={toggleOtpModal}
                      >
                        Verify OTP
                      </button>
                      <button
                        type="submit"
                        className="btn-sm login-button rounded border-0 text-light w-100 py-1  mx-auto"
                        onClick={toggleOtpModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </ModalFooter>
                </Modal>
                <Modal
                  isOpen={forgotPasswordModalOpen}
                  toggle={toggleForgotPasswordModal}
                >
                  <ModalHeader toggle={toggleForgotPasswordModal}>
                    Forgot Password
                  </ModalHeader>
                  <ModalBody>
                    <p>Enter your email to verify and reset your password</p>
                    <Input
                      type="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn-sm login-button rounded border-0 text-light py-1 mx-2"
                        onClick={handleForgetPassword}
                      >
                        Submit
                      </button>
                      <button
                        type="submit"
                        className="btn-sm login-button rounded border-0 text-light py-1 mx-2"
                        onClick={toggleForgotPasswordModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={showSuccessModal} toggle={toggleSuccessModal}>
                  <ModalHeader>Success</ModalHeader>
                  <ModalBody>Login successful!</ModalBody>
                  <ModalFooter>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn-sm login-button rounded border-0 text-light w-100 py-1  mx-auto"
                        onClick={() => {
                          toggleSuccessModal();
                          // navigate('/dashboard', { state: { username, email } });
                        }}
                      >
                        OK
                      </button>
                    </div>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={showErrorModal} toggle={toggleErrorModal}>
                  <ModalHeader>Error</ModalHeader>
                  <ModalBody>Invalid username or password.</ModalBody>
                  <ModalFooter>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn-sm login-button rounded border-0 text-light w-100 py-1  mx-auto"
                        onClick={toggleErrorModal}
                      >
                        OK
                      </button>
                    </div>
                  </ModalFooter>
                </Modal>
                <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                  <ModalHeader>
                    {message ? "Success Modal" : "Error Modal"}
                  </ModalHeader>
                  <ModalBody>{message || error}</ModalBody>
                  <ModalFooter>
                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn-sm login-button rounded border-0 text-light w-100 py-1  mx-auto"
                        onClick={closeModal}
                      >
                        Ok
                      </button>
                    </div>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
