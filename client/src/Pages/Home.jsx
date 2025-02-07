import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

// import './styles/HomeSection.css';\
import "../styles/HomeSection.css";
import student from "../assets/studentPicture.png";
import { FaStar } from "react-icons/fa";
import web from "../assets/web_layout.webp";

const testimonials = [
  {
    name: "RANVEER SINGH",
    role: "UI/UX Designer, Microsoft",
    feedback:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, numquam explicabo itaque enim natus aliquid voluptatum minus. Doloremque delectus deserunt et modi doloribus debitis vel cum mollitia tempore. Amet, perspiciatis!",
    rating: 5,
  },
  {
    name: "RANVEER SINGH",
    role: "UI/UX Designer, Microsoft",
    feedback:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas, numquam explicabo itaque enim natus aliquid voluptatum minus. Doloremque delectus deserunt et modi doloribus debitis vel cum mollitia tempore. Amet, perspiciatis!",
    rating: 4,
  },
];

const Home = () => {
  document.title = "Full Stack Learning | Become a FSD the correct way";

  return (
    <section className="home-section">
      <Container className="home-section-children">
        <Row>
          <Col className="col-parent-home">
            <div className="background-image-home-section1">
              {/* <img src="src/assets/hero.png" alt="" /> */}
              <div className="home-text-area">
                <h1 className="become">Become A</h1>
                <h1 className="full-stack-class">Full Stack Developer</h1>
                <hr className="underline" />
                <h2 className="heading-in-two-parts">
                  in just <span className="highlighted-text">6</span> Months
                </h2>
                <p className="fs-tagline">That's all the time it takes..</p>
                <Button href="/registration" className="cta-button">
                  Join Now
                </Button>
              </div>
            </div>
          </Col>

          {/* Second Section */}

          <Container className="second-section-students">
            <Row>
              <Col>
                <h1 className="heading-h2">
                  FSL - A LEARNING PLATFORM TO HELP YOU JUMP INTO TECH
                </h1>
              </Col>
            </Row>

            <Row className="parent-section-img">
              <Col md={6} className="student-section">
                <h3>
                  CS DEGREE IS NO MORE A ROADBLOCK TO WORK IN YOUR DREAM TECH
                  BASED JOBS
                </h3>
                <p>
                  A CS degree is no longer a barrier to landing your dream tech
                  job. Companies today prioritize skills, hands-on experience,
                  and problem-solving abilities over formal education. With the
                  rise of online courses, coding bootcamps, and open-source
                  contributions, anyone with dedication and the right skill set
                  can break into the tech industry. Many successful developers
                  have built their careers without a traditional degree, proving
                  that real-world experience and a strong portfolio matter more
                  than a diploma. If you're passionate about tech, start
                  learning, building projects, and networking—your dream job is
                  within reach!
                </p>
                <button className="explore-btn">Explore More</button>
              </Col>
              <Col md={6} className="student-image">
                <img src={student} alt="Student Learning" />
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>

      {/* success stories */}

      <div className="success-stories">
        <Container fluid>
          <h2 className="section-title">Success Stories</h2>
          <Row className="justify-content-center">
            {testimonials.map((testimonial, index) => (
              <Col md={5} className="testimonial-box" key={index}>
                <div className="testimonial-content">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <p className="testimonial-feedback">{testimonial.feedback}</p>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < testimonial.rating ? "filled" : "unfilled"
                        }
                      />
                    ))}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <div className="pagination">
            <FaStar className="active" />
            <FaStar className="inactive" />
          </div>
        </Container>
      </div>

      {/* What we offer  */}

      <div className="offer-section">
        <Container>
          {/* Section Title */}
          <h2 className="section-title">What We Offer</h2>

          {/* Category Tabs */}
          <Row className="category-tabs">
            <Col>
              <span className="active-tab">Frontend</span> |{" "}
              <span>Backend</span> | <span>Full Stack</span>
            </Col>
          </Row>

          {/* Course Content */}

          <Row className="offer-content">
            <Col md={6} className="course-details">
              <h3 className="course-title">Front Web Development</h3>
              <p className="course-description">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem voluptate deserunt, vero error nesciunt quibusdam
                cupiditate nostrum numquam ratione sunt illo, sit aliquam nobis
                sapiente totam voluptatem veritatis consequuntur odio.
              </p>
              <ul className="skills-list">
                <li>HTML5</li>
                <li>CSS</li>
                <li>Bootstrap</li>
                <li>JQuery</li>
                <li>Javascript (ES6 Basic)</li>
                <li>Angular JS</li>
                <li>React JS (Components, Redux, Routing)</li>
              </ul>
              <Button className="view-all">View All</Button>
            </Col>

            <Col md={6} className="cards-container">
              <div className="course-card">
                <img src={web} alt="Coding" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <Button className="enroll-btn">Enroll Now</Button>
              </div>
              <div className="course-card">
                <img src={web} alt="Coding" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <Button className="enroll-btn">Enroll Now</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* join us section */}

      <div className="join-us-section">
        <Container>
          <Row className="align-items-center">
            {/* Left Section - Heading & Description */}
            <Col md={7} className="text-section">
              <h2 className="section-title">How To Join Us?</h2>
              <h3 className="sub-title">
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit
                Cumque
              </h3>
              <p className="section-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium, sapiente quia iure illum voluptate quod unde
                pariatur vero exercitationem, debitis quasi alias reprehenderit
                voluptatum, fugiat officia doloremque sunt sed dolores! Lorem
                ipsum, dolor sit amet consectetur adipisicing elit.
                Reprehenderit veniam, laboriosam explicabo consectetur totam
                deserunt consequatur, ullam suscipit alias tenetur optio
                blanditiis unde quo quam libero aut ipsam dolore!
              </p>
            </Col>

            {/* Right Section - Enquiry Form */}
            <Col md={5}>
              <div className="enquiry-form">
                <h3 className="form-title">Send Enquiry</h3>
                <Form>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="text" placeholder="Contact Number" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Courses</Form.Label>
                    <Form.Control as="select">
                      <option>Please Select Courses</option>
                      <option>Frontend Development</option>
                      <option>Backend Development</option>
                      <option>Full Stack Development</option>
                    </Form.Control>
                  </Form.Group>

                  <Button className="submit-btn">Submit Enquiry</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

            {/* Footer section */}


            <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Visit Us Section */}
          <div className="footer-section">
            <h5 className="footer-heading">Visit Us</h5>
            <p className="footer-text">
              A20, Murtikala Colony, Gopalpura
              <br />
              Bypass, Tonk Road
              <br />
              Jaipur, Rajasthan - 302018
            </p>
          </div>

          {/* Courses Section */}
          <div className="footer-section">
            <h5 className="footer-heading">Courses</h5>
            <ul className="footer-links">
              {["Front End Development", "Back End Development", "Graphics Designing", "UI UX Designing"].map((course, index) => (
                <li key={index} className="footer-link">
                  {course}
                </li>
              ))}
            </ul>
          </div>

          {/* More Links Section */}
          <div className="footer-section">
            <h5 className="footer-heading">More Links</h5>
            <ul className="footer-links">
              {["About Us", "Contact Us", "Terms & Condition", "Privacy Policy"].map((link, index) => (
                <li key={index} className="footer-link">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="footer-section">
            <h5 className="footer-heading">Social Links</h5>
            <div className="footer-social-icons">
              <a href="#" className="social-icon facebook">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="social-icon instagram">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="social-icon linkedin">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="social-icon youtube">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-bottom-text">Copyright © 2024 | All Rights Reserved</p>
          <p className="footer-bottom-text">Managed & Hosted by Full Stack Learning</p>
        </div>
      </div>
    </footer>



    </section>
  );
};

export default Home;
