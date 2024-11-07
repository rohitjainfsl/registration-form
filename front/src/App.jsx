import { useForm } from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

export default function RegistrationForm() {
  const [validated, setValidated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await axios.post("http://localhost:8080/register", data);
    console.log(response);
  };

  // const onInvalid = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };
  // const onInvalid = (data, e) => {
  //   setValidated(true);
  // };

  return (
    <Container fluid>
      <Row>
        <Col sm={12}>
          <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Card>
              <Card.Header>Personal Details</Card.Header>
              <Card.Body>
                <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Name
                  </Form.Label>
                  <div className="col-sm-10">
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      id="name"
                      name="name"
                      isInvalid={!!errors.name}
                      autoFocus
                      {...register("name", {
                        required: "Full name is required",
                        pattern: {
                          value: /^[A-Za-z ]+$/,
                          message:
                            "Full name can only contain letters and spaces",
                        },
                        minLength: {
                          value: 4,
                          message:
                            "Full name must be at least 4 characters long",
                        },
                        maxLength: {
                          value: 30,
                          message:
                            "Full name must be at most 30 characters long",
                        },
                      })}
                    />
                    {errors.name && (
                      <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Email
                  </Form.Label>
                  <div className="col-sm-10">
                    <Form.Control
                      type="text"
                      placeholder="Enter your email address"
                      id="email"
                      name="email"
                      {...register("email", {
                        required: true,
                      })}
                    />
                    {errors.email && (
                      <Form.Control.Feedback type="invalid">
                        Enter a valid email
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Phone
                  </Form.Label>
                  <div className="col-sm-10">
                    <Form.Control
                      type="text"
                      placeholder="Enter your phone number"
                      id="phone"
                      name="phone"
                      {...register("phone", {
                        required: true,
                        pattern: /^[0-9]+$/,
                        minLength: 10,
                        maxLength: 10,
                      })}
                    />
                    {errors.phone && (
                      <Form.Control.Feedback type="invalid">
                        Enter a proper phone number with 10 digits
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Date of Birth
                  </Form.Label>
                  <div className="col-sm-10">
                    <Form.Control
                      type="date"
                      placeholder="Enter your date of birth"
                      id="dob"
                      name="dob"
                      {...register("dob", {
                        required: true,
                      })}
                    />
                    {errors.dob && (
                      <Form.Control.Feedback type="invalid">
                        Enter your Date of Birth
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Gender
                  </Form.Label>
                  <div className="col-sm-10">
                    {["radio"].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Male"
                          name="gender"
                          type={type}
                          id="male"
                          {...register("gender", { required: true })}
                          value="male"
                        />
                        <Form.Check
                          inline
                          label="Female"
                          name="gender"
                          type={type}
                          id="female"
                          {...register("gender", { required: true })}
                          value="female"
                        />
                        <Form.Check
                          inline
                          label="Other"
                          name="gender"
                          type={type}
                          id="other"
                          {...register("gender", { required: true })}
                          value="other"
                        />
                      </div>
                    ))}
                  </div>
                </Form.Group>

                <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Aadhaar Card
                  </Form.Label>
                  <div className="col-sm-10 row">
                    <div className="col-sm-6">
                      <Form.Control
                        type="file"
                        placeholder="Aadhaar Card Front"
                        id="aadharFront"
                        name="aadharFront"
                        {...register("aadharFront", {
                          required: true,
                        })}
                      />
                      {errors.aadharFront && (
                        <Form.Control.Feedback type="invalid">
                          Upload Aadhaar Card Back Side Photo
                        </Form.Control.Feedback>
                      )}
                      <small className="form-text text-muted">
                        Upload a jpeg/jpg/png file of size not exceeding 1 MB.
                      </small>
                    </div>
                    <div className="col-sm-6">
                      <Form.Control
                        type="file"
                        placeholder="Aadhaar Card Back"
                        id="aadharBack"
                        name="aadharBack"
                        {...register("aadharBack", {
                          required: true,
                        })}
                      />
                      {errors.aadharBack && (
                        <Form.Control.Feedback type="invalid">
                          Upload Aadhaar Card Back Side Photo
                        </Form.Control.Feedback>
                      )}
                      <small className="form-text text-muted">
                        Upload a jpeg/jpg/png file of size not exceeding 1 MB.
                      </small>
                    </div>
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>Parent / Guardian Details</Card.Header>
              <Card.Body>
                <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Parent / Guardian / Spouse Name
                  </Form.Label>
                  <div className="col-sm-10">
                    <Form.Control
                      type="text"
                      placeholder="Enter your parent / guardian / spouse name"
                      id="fname"
                      name="fname"
                      autoFocus
                      {...register("fname", {
                        required: true,
                        pattern: /^[A-Za-z ]+$/,
                        minLength: 4,
                        maxLength: 30,
                      })}
                    />
                    {errors.fname && (
                      <Form.Control.Feedback type="invalid">
                        Parent name is required
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="form-group row mb-3">
                  <Form.Label className="col-sm-2 col-form-label">
                    Parent / Guardian / Spouse Phone
                  </Form.Label>
                  <div className="col-sm-10">
                    <Form.Control
                      type="text"
                      placeholder="Enter your parent / guardian / spouse phone number"
                      id="fphone"
                      name="fphone"
                      autoFocus
                      {...register("fphone", {
                        required: true,
                        pattern: /^[0-9]+$/,
                        minLength: 10,
                        maxLength: 10,
                      })}
                    />
                    {errors.fname && (
                      <Form.Control.Feedback type="invalid">
                        Parent phone number is required
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>

        {/* <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: true,
              pattern: /^[A-Za-z ]+$/,
              minLength: 4,
              maxLength: 30,
            })}
            autoFocus
          />
          {errors.fullName && <p role="alert">Full name is required</p>}
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <p role="alert">Enter a valid email</p>}
          <input
            type="text"
            placeholder="Enter your phone number"
            {...register("phone", {
              required: true,
              pattern: /^[0-9]+$/,
              minLength: 10,
              maxLength: 10,
            })}
          />
          {errors.phone && (
            <p role="alert">Enter a proper phone number with 10 digits</p>
          )}
          <input
            type="date"
            placeholder="Enter your Date of Birth"
            {...register("dob", { required: true })}
          />
          {errors.dob && <p role="alert">Enter your Date of Birth</p>}
          <div>
            <input
              id="genderMale"
              type="radio"
              name="gender"
              value="male"
              {...register("gender", { required: true })}
            />
            <label htmlFor="genderMale">Male</label>
          </div>

          <div>
            <input
              id="genderFemale"
              type="radio"
              name="gender"
              value="female"
              {...register("gender", { required: true })}
            />
            <label htmlFor="genderFemale">Female</label>
          </div>

          <div>
            <input
              id="genderOther"
              type="radio"
              name="gender"
              value="other"
              {...register("gender", { required: true })}
            />
            <label htmlFor="genderOther">Other</label>
          </div>
          {errors.gender && <p role="alert">Select your gender</p>}

          <input
            type="text"
            placeholder="Enter your parent / guardian / spouse name"
            {...register("fname", {
              required: true,
              pattern: /^[A-Za-z ]+$/,
              minLength: 4,
              maxLength: 30,
            })}
          />
          {errors.fname && <p role="alert">Parent&quot;s name is required</p>}

          <input
            type="text"
            placeholder="Enter your parent / guardian / spouse phone number"
            {...register("fphone", {
              required: true,
              pattern: /^[0-9]+$/,
              minLength: 10,
              maxLength: 10,
            })}
          />
          {errors.fname && (
            <p role="alert">Enter a proper phone number with 10 digits</p>
          )}

          <textarea
            placeholder="Enter your local address (where you stay in Jaipur)"
            {...register("laddress", { required: true })}
          ></textarea>
          {errors.laddress && <p role="alert">Enter your local address</p>}

          <div>
            <input
              id="same"
              type="checkbox"
              name="same"
              value="same"
              {...register("same")}
            />
            <label htmlFor="same">Same as Permanent Address</label>
          </div>

          <div>
            <input
              id="student"
              type="radio"
              name="areyoua"
              value="student"
              {...register("areyoua")}
              checked={true}
            />
            <label htmlFor="student">Student</label>
          </div>

          <div>
            <input
              id="working"
              type="radio"
              name="areyoua"
              value="working"
              {...register("areyoua")}
            />
            <label htmlFor="working">Working Professional</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="Your latest educational degree / diploma"
              {...register("qualification", {
                required: true,
                minLength: 2,
                maxLength: 30,
              })}
            />
            {errors.qualification && (
              <p role="alert">Qualification is required</p>
            )}

            <input
              type="text"
              placeholder="Completion Year"
              {...register("qualificationYear", {
                required: true,
              })}
            />
            {errors.qualificationYear && (
              <p role="alert">Qualification Year is required</p>
            )}

            <input
              type="text"
              placeholder="College / University"
              {...register("college", {
                required: true,
              })}
            />
            {errors.college && <p role="alert">College is required</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Designation"
              {...register("designation", {
                required: true,
              })}
            />
            {errors.designation && <p role="alert">Designation is required</p>}

            <input
              type="text"
              placeholder="Company"
              {...register("company", {
                required: true,
              })}
            />
            {errors.company && <p role="alert">Company name is required</p>}
          </div>

          <div>
            <select
              defaultValue="Course you opted for"
              name="course"
              id="course"
              {...register("course", { required: true })}
            >
              <option disabled="" value="">
                Course you opted for
              </option>
              <option value="advanced java">Advance Java</option>
              <option value="android">Android</option>
              <option value="computer basics">Computer Basics</option>
              <option value="core java">Core Java</option>
              <option value="digital marketing">Digital Marketing</option>
              <option value="full stack">Full Stack Development</option>
              <option value="graphic design">Graphic Design</option>
              <option value="node js">Node JS</option>
              <option value="photoshop">Photoshop</option>
              <option value="php">PHP</option>
              <option value="python">Python</option>
              <option value="react js">React JS</option>
              <option value="web design">Web Design</option>
              <option value="otherCourse">Other Course</option>
            </select>
          </div>

          <input type="submit" value="Register" />
        </form> */}
      </Row>
    </Container>
  );
}
