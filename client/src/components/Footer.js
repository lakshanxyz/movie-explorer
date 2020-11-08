import React from 'react';

import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const AppFooter = () => {
    return (
        <>
            <Container fluid className="text-light page-footer d-flex pt-3 bg-dark">
                <Container>
                    <div className="d-flex justify-content-between">
                        <p><a href="https://vanessalane.herokuapp.com/" className="footer-link">© 2020 Vanessa Lane</a></p>
                        <div>
                            <a href="mailto:vlane0593@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="m-3 footer-link">
                                <FaEnvelope />
                            </a>
                            <a href="https://www.linkedin.com/in/vanessa-lane/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="m-3 footer-link">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/vanessalane"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="m-3 footer-link">
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </Container>
            </Container>
        </>
    )
};
export default AppFooter;