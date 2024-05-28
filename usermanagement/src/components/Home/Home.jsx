import React from "react";
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="wrapper">
            <div className="Home-page px-4">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 image">
                        <img
                            src="/images/HomeImage.png"
                            alt="Field Representative Allocation"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 text">
                        <h5>Welcome to Proximity Field Representative Allocation</h5>
                        <p>Proximity-Based Field Representative Allocation System has been meticulously designed to deliver efficient resource allocation, optimize response times, and prioritize data security and compliance. The adoption of a microservices architecture, coupled with robust security practices, positions the system to excel in the challenging landscape of field service management.
                        </p>
                        <h5>Key highlights of the system include: </h5>
                        <ul>
                            <li><b>Microservices for Modularity:</b> The microservices-based approach ensures modularity, flexibility, and reusability of core functionalities. These microservices, such as user authentication, proximity calculations, allocation, and reporting, can be seamlessly integrated into future projects, enhancing maintainability and adaptability.</li>
                            <li><b>Security and Compliance:</b> The system prioritizes security and compliance. By integrating FusionAuth for authentication and authorization, the system guarantees robust identity management. It also aligns with the requirements of HIPAA and GDPR, safeguarding health data and user privacy.</li>
                            <li><b>Location Tracking:</b> Compliance with location tracking regulations is implemented transparently. Users are informed, consent is sought, and data is anonymized where necessary to protect privacy and adhere to legal requirements.</li>
                            <li><b>High Availability:</b> The system is designed with redundancy and failover mechanisms to ensure uninterrupted service availability.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <h5>Contact Us</h5>
                <p>If you have any questions or need assistance, please don't hesitate to <Link to="/">contact us</Link>. Our dedicated support team is here to help you make the most of our application.</p>
                <p>Get started today and experience the benefits of Proximity Field Representative Allocation!</p>
            </footer>
        </div>
    )
}

export default Home;
