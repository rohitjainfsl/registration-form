import { Container, Row, Col, Button } from 'react-bootstrap';
// import './styles/HomeSection.css';\
import '../styles/HomeSection.css';
import student from '../assets/studentPicture.png'


const Home = () => {
  document.title = "Full Stack Learning | Become a FSD the correct way";

  return (
    <section className="home-section">
      <Container className="home-section-children">
        <Row>
          <Col className='col-parent-home'>
          <div className='background-image-home-section1'>
          {/* <img src="src/assets/hero.png" alt="" /> */}
          <div className='home-text-area'>
            <h1 className="become">Become A</h1>
            <h1 className="full-stack-class">Full Stack Developer</h1>
            <hr className="underline" />
            <h2 className="heading-in-two-parts">
              in just <span className="highlighted-text">6</span> Months
            </h2>
            <p className="fs-tagline">
              That's all the time it takes..
            </p>
            <Button
              href="/registration"
              className="cta-button"
            >
              Join Now
            </Button>
            </div>
            </div>
          </Col>

          {/* Second Section */}

        <Container className="second-section-students">
          <Col>
            <h1 className="heading-h2">
              FSL - A LEARNING PLATFORM TO HELP YOU JUMP INTO TECH
            </h1>
          </Col>
          <Col className='parent-section-img'>
          <Row className='student-section'>
            <h3>CS DEGREE IS NO MORE A ROADBLOCK TO WORK IN
            YOUR DREAM TECH BASED JOBS</h3>
            <p>A CS degree is no longer a barrier to landing your dream tech job. Companies today prioritize skills, hands-on experience, and problem-solving abilities over formal education. With the rise of online courses, coding bootcamps, and open-source contributions, anyone with dedication and the right skill set can break into the tech industry. Many successful developers have built their careers without a traditional degree, proving that real-world experience and a strong portfolio matter more than a diploma. If you're passionate about tech, start learning, building projects, and networking—your dream job is within reach! </p>
            <button> Explore More</button>
          </Row>
          <Row className='student-image'>
            <img src={student} alt="" />
          </Row>
          </Col>
        </Container>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
