# Introduction 
usermanagement - Field Reperesentative Allocation 

To design and implement a system that facilitates the efficient allocation of field representatives to travel to sites located within a 3 miles proximity, enhancing service speed, and reducing travel costs. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
<!-- 1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references -->

1. Installation 

 

Before you begin, ensure you have met the following prerequisites: 


- Node.js: v18.17.1

- npm (Node Package Manager) 


To install the project and its dependencies, follow these steps: 


1. Clone this repository to your local machine: 

   ```bash 

   git clone https://mlmvps@dev.azure.com/mlmvps/Proximity-based%20Field%20Representative%20Allocation%20System/_git/FRA-SSO-React-Webapp 

   ``` 
 

2. Navigate to the project directory: 

   ```bash 
   cd FRA-SSO-React-Webapp>


3. Install the required dependencies: 

   ``` 
   npm install reactstrap 
   npm install bootstrap
   npm install react-native-paper 
   npm install formik
   npm install react-router-dom
   npm install sass
   npm install yup
   npm install @react-google-maps/api

   ``` 

 

2. Usage 
### Sprint 1 Features 


#### 1. Sign-In Screen (src/screens/SignInScreen) 

- Description: Users can sign in to the application using their credentials. 

- Usage: Provides a secure login for authorized users. 

 

#### 2. Sign-Up Screen (src/screens/SignUpScreen) 

- Description: New users can sign up by providing their information. 

- Usage: Expands the user base and enables new users to access the system. 

 

#### 3. Forgot Password Screen (src/screens/ForgotPasswordScreen) 

- Description: Users can reset their password if they forget it. 

- Usage: Provides a recovery option for users who have lost their password. 

 

#### 4. Google Maps Screen with Location Search 

- Description: Users can view a map and search for locations. 

- Usage: Facilitates the allocation of field representatives to specific locations. 


3. Contact Information 

If you have any questions or need assistance, please contact us at: 

- Lakshumaiah Korrapati: lakshumaiah.korrapati@motivitylabs.com 

- Sharath Sudarshanam: sharath.sudarshanam@motivitylabs.com 

- Sushmitha Gopari: sushmitha.gopari@motivitylabs.com 

- Nikhil Kumar Goud Kakkerla: nikhil.kakkerla@motivitylabs.com


4. Reference and Benchmarking 

During the development process, we referred to the following sources for inspiration and benchmarking: 

1. [React Google Maps](https://github.com/react-native-maps/react-native-maps): Provided insights for the map implementation. 

2. [Reactstrap bootstrap](https://reactstrap.github.io/ , https://getbootstrap.com/): Influenced the UI components and design. 

 

5. Reusable Components 

In Sprint 1, we have developed reusable screens that you can use in your own projects: 

1. **Sign-In Screen (src/Registration/Registration)** 

   - Description: A screen for user sign-in with authentication. 

2. **Sign-Up Screen (src/Login/Login)** 

   - Description: A screen for new user sign-up. 

3. **Reset Password Screen (src/ResetPassword/ResetPassword)** 

   - Description: A screen for users to reset their password.  

4. **Google Maps Component** 

   - Description: A reusable Google Maps component with location search functionality. 

   - Usage: You can find the component in the `src/components/Dahsboard` directory. 

Feel free to explore and use these screens to enhance your React Native projects. The application's secure login functionality is backed by Java server APIs and Fusion Auth for added security and authentication. 
