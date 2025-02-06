import { Container, Row, Col, Button } from 'react-bootstrap';
import './styles/HomeSection.css'; // Import external CSS

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
          <div className='second-section'>
          <h1 className='heading-h2'>FSL- A LEARNING PLATFORM TO HELP YOU JUMP INTO TECH</h1>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
