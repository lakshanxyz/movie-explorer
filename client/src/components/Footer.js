import React from 'react';

import { Container } from 'react-bootstrap';

const AppFooter = () => {
    const contactLinks = [
      {
        "name": "email",
        "url": "mailto:vlane0593@gmail.com",
        "classes": "far fa-envelope"
      },
      {
        "name": "linkedin",
        "url": "https://www.linkedin.com/in/vanessa-lane/",
        "classes": "fab fa-linkedin"
      },
      {
        "name": "github",
        "url": "https://github.com/vanessalane",
        "classes": "fab fa-github"
      }
    ]

    return (
        <>
            <Container fluid className="text-light page-footer d-flex pt-3 bg-dark">
                <Container>
                    <div className="d-flex justify-content-between">
                        <p><a href="https://vanessalane.herokuapp.com/" className="footer-link">© 2020 Vanessa Lane</a></p>
                        <div>
                            {/* <span className="m-1">Get in touch:</span> */}
                            {contactLinks.map((contactLink) => {
                                return (
                                <a href={contactLink.url}
                                    key={contactLink.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="m-3 footer-link">
                                    <span><i className={contactLink.classes}></i></span>
                                </a>
                                )
                            })}
                        </div>
                    </div>
                </Container>
            </Container>
        </>
    )
};
export default AppFooter;