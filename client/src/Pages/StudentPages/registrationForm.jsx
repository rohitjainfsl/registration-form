import { useEffect, useState } from "react";
import Modal from "./t&m_model.jsx"
import instance from "../../axiosConfig.js";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserForm() {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [role, setRole] = useState("student");
  const [isChecked, setIsChecked] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [aadharDisplay, setAadharDisplay] = useState({
    front: "",
    back: "",
  });
  const [showMessage, setShowMessage] = useState(false);

  const [formElements, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadharFront: null,
    fname: "",
    fphone: "",
    laddress: "",
    paddress: "",
    role: "",
    qualification: "",
    qualificationYear: "",
    college: "",
    designation: "",
    company: "",
    course: "",
    otherCourse: "",
    referral: "",
    friendName: "",
  });
  const [loading, setLoading] = useState(false);

  const [DOB, setDOB] = useState("");


  useEffect(() => {
    const options = new URLSearchParams(window.location.search);
    if (options.has("success")) setShowMessage(true);
  }, []);

  const handleAgree = () => {
    setTermsAccepted(true);
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submit:", formElements); // Log current form data

    try {
      setLoading(true);
      const frm = new FormData();
      frm.append("name", formElements.name);
      frm.append("email", formElements.email);
      frm.append("phone", formElements.phone);
      frm.append("dob", DOB);
      frm.append("gender", formElements.gender);
      frm.append("aadharFront", formElements.aadharFront);
      frm.append("aadharBack", formElements.aadharBack);
      frm.append("fname", formElements.fname);
      frm.append("fphone", formElements.fphone);
      frm.append("laddress", formElements.laddress);
      frm.append("paddress", formElements.paddress);
      frm.append("role", formElements.role);
      frm.append("qualification", formElements.qualification);
      frm.append("qualificationYear", formElements.qualificationYear);
      frm.append("college", formElements.college);
      frm.append("designation", formElements.designation);
      frm.append("company", formElements.company);
      frm.append("course", formElements.course);
      frm.append("otherCourse", formElements.otherCourse);
      frm.append("referral", formElements.referral);
      frm.append("friendName", formElements.friendName);

      const response = await instance.post("/students/register", frm);

      if (
        response.status === 201 &&
        response.data.message === "Registration Successful"
      )
        // window.location.href = backendPath + "/registration?success=true";
        navigate("/login");
    } catch (error) {
      setShowMessage(false);
      console.error("Error submitting form", error);
      alert("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  const handleRadioChange = (event) => {
    setIsChecked(event.target.value === "Friend");
    setFormData({ ...formElements, referral: event.target.value });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress); 
    if (!isSameAddress) {
      // setPermanentAddress(localAddress); // Auto-fill Permanent Address
      setFormData({ ...formElements, paddress: formElements.laddress });
    } else {
      // setPermanentAddress(""); // Clear Permanent Address if checkbox is unchecked
      setFormData({ ...formElements, paddress: "" });
    }
  };

  const termsCondition = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };


  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChangeForm = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChangeForm = (e, imageKey) => {
    setFormData({ ...formElements, [e.target.name]: e.target.files[0] });
    const reader = new FileReader();
    reader.onload = () => {
      setAadharDisplay((prev) => ({
        ...prev,
        [imageKey]: reader.result,
      }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {loading && (
        <div id="loading">
          <h3>Loading...</h3>
        </div>
      )}
      <div id="wrapper" style={{marginTop:"80px"}}>
        <div className="container-fluid">
          <div className="row">
            <div
              className={`success-msg alert alert-success alert-dismissible ${
                showMessage
                  ? "d-flex gap-4 items-center justify-content-center"
                  : "hide fade"
              }`}
              role="alert"
            >
              <h3 className="mb-0">THANKS. Your registration is successful.</h3>
              <button
                type="button"
                className="close fs-2"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setShowMessage(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="col-sm-12">
              <form
                className="registration-form mb-3"
                onSubmit={handleSubmit}
                method="post"
                encType="multipart/form-data"
                
              >
                <div className="card">
                  <div className="card-header">Personal Details</div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label htmlFor="name" className="col-sm-2 col-form-label" >
                        Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formElements.name}
                          onChange={handleInputChangeForm}
                          required
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="email"
                        className="col-sm-2 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={formElements.email}
                          onChange={handleInputChangeForm}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="phone"
                        className="col-sm-2 col-form-label"
                      >
                        Phone
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formElements.phone}
                          onChange={handleInputChangeForm}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="dob" className="col-sm-2 col-form-label">
                        Date of Birth
                      </label>
                      <div className="col-sm-10">
                        <DatePicker
                          id="dob"
                          name="dob"
                          selected={DOB}
                          onChange={(date) => setDOB(date)}
                          dateFormat="dd-MM-yyyy"
                          className="form-control"
                          placeholderText="dd-mm-yyyy"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="gender"
                        className="col-sm-2 col-form-label"
                      >
                        Gender
                      </label>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked={formElements.gender === "male"}
                            onChange={handleInputChangeForm}
                            required
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            checked={formElements.gender === "female"}
                            onChange={handleInputChangeForm}
                            required
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="other"
                            value="other"
                            checked={formElements.gender === "other"}
                            onChange={handleInputChangeForm}
                            required
                          />
                          <label className="form-check-label" htmlFor="other">
                            Other
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="aadharFront"
                        className=" col-sm-2 col-form-label"
                      >
                        Aadhaar Card
                      </label>
                      <div className="col-sm-10 row">
                        <div className="col-sm-6">
                          <input
                            type="file"
                            className="form-control"
                            id="aadharFront"
                            name="aadharFront"
                            onChange={(e) => handleFileChangeForm(e, "front")}
                            required
                          />
                        </div>

                        <div className="col-sm-6">
                          <input
                            type="file"
                            className="form-control"
                            id="aadharBack"
                            name="aadharBack"
                            onChange={(e) => handleFileChangeForm(e, "back")}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="offset-sm-2 col-sm-10 row">
                        <div className="col-6">
                          {aadharDisplay.front && (
                            <img
                              className="aadharDisplay"
                              src={aadharDisplay.front}
                              alt="Aadhaar Front"
                            />
                          )}
                        </div>
                        <div className="col-6">
                          {aadharDisplay.back && (
                            <img
                              className="aadharDisplay"
                              src={aadharDisplay.back}
                              alt="Aadhaar Back"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">Parent / Guardian Details</div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="fname"
                        className="col-sm-2 col-form-label"
                      >
                        Parent / Guardian Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="fname"
                          name="fname"
                          placeholder="Enter your parent / guardian name"
                          value={formElements.fname}
                          onChange={handleInputChangeForm}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="fphone"
                        className="col-sm-2 col-form-label"
                      >
                        Parent / Guardian Phone
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="fphone"
                          name="fphone"
                          placeholder="Enter your parent / guardian phone number"
                          value={formElements.fphone}
                          onChange={handleInputChangeForm}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">Residential Details</div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="laddress"
                        className="col-sm-2 col-form-label"
                      >
                        Local Address
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          name="laddress"
                          id="laddress"
                          placeholder="Enter your local address (Where you stay in jaipur)"
                          value={formElements.laddress}
                          onChange={handleInputChangeForm}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-10 offset-sm-2">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="sameAddress"
                            checked={isSameAddress}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="sameAddress"
                          >
                            Permanent address is the same as local address
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="paddress"
                        className="col-sm-2 col-form-label"
                      >
                        Permanent Address
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          name="paddress"
                          id="paddress"
                          placeholder="Enter your permanent address (address of your hometown)"
                          value={formElements.paddress}
                          onChange={handleInputChangeForm}
                          readOnly={isSameAddress}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">Educational Details</div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">
                        Are you a:
                      </label>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="student"
                            onChange={handleRoleChange}
                            checked={role === "student"}
                          />
                          <label className="form-check-label">Student</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="workingProfessional"
                            checked={role === "workingProfessional"}
                            onChange={handleRoleChange}
                          />
                          <label className="form-check-label">
                            Working Professional
                          </label>
                        </div>
                      </div>
                    </div>

                    {role === "student" && (
                      <>
                        <div className="form-group row">
                          <label
                            htmlFor="qualification"
                            className="col-sm-2 col-form-label"
                          >
                            Last Attained Qualification
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="qualification"
                              name="qualification"
                              value={formElements.qualification}
                              onChange={handleInputChangeForm}
                              placeholder="Enter your qualification"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="qualificationYear"
                            className="col-sm-2 col-form-label"
                          >
                            Year
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="qualificationYear"
                              name="qualificationYear"
                              value={formElements.qualificationYear}
                              onChange={handleInputChangeForm}
                              placeholder="Enter your completion year"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="college"
                            className="col-sm-2 col-form-label"
                          >
                            College / University
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="college"
                              name="college"
                              value={formElements.college}
                              onChange={handleInputChangeForm}
                              placeholder="College / University"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {role === "workingProfessional" && (
                      <>
                        <div className="form-group row">
                          <label
                            htmlFor="designation"
                            className="col-sm-2 col-form-label"
                          >
                            Designation
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="designation"
                              name="designation"
                              value={formElements.designation}
                              onChange={handleInputChangeForm}
                              placeholder="Enter your designation"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="company"
                            className="col-sm-2 col-form-label"
                          >
                            Company
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="company"
                              name="company"
                              value={formElements.company}
                              onChange={handleInputChangeForm}
                              placeholder="Enter your company name"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">Course Details</div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label
                        htmlFor="course"
                        className="col-sm-2 col-form-label"
                      >
                        Course
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-control"
                          name="course"
                          id="course"
                          value={formElements.course}
                          onChange={handleInputChangeForm}
                          required
                        >
                          <option value="">Select a course</option>
                          <option value="advanced java">Advanced Java</option>
                          <option value="android">Android</option>
                          <option value="computer basics">
                            Computer Basics
                          </option>
                          <option value="core java">Core Java</option>
                          <option value="digital marketing">
                            Digital Marketing
                          </option>
                          <option value="full stack">
                            Full Stack Development
                          </option>
                          <option value="graphic design">Graphic Design</option>
                          <option value="node js">Node JS</option>
                          <option value="photoshop">Photoshop</option>
                          <option value="php">PHP</option>
                          <option value="python">Python</option>
                          <option value="react js">React JS</option>
                          <option value="web design">Web Design</option>
                          <option value="other">Other Course</option>
                        </select>
                      </div>
                    </div>
                    {formElements.course === "other" && (
                      <div className="form-group row">
                        <label
                          htmlFor="otherCourse"
                          className="col-sm-2 col-form-label"
                        >
                          Enter your course
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="otherCourse"
                            name="otherCourse"
                            placeholder="Enter the course name"
                            value={formElements.otherCourse}
                            onChange={handleInputChangeForm}
                            required
                          />
                        </div>
                      </div>
                    )}
                    <div className="form-group row">
                      <label
                        htmlFor="referral"
                        className="col-sm-2 col-form-label"
                      >
                        How did you come to know about us?
                      </label>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="google"
                            value="Google"
                            required
                            onChange={handleRadioChange}
                          />
                          <label className="form-check-label" htmlFor="google">
                            Google
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="linkedin"
                            value="Linkedin"
                            required
                            onChange={handleRadioChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="linkedin"
                          >
                            Linkedin
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="instagram"
                            value="Instagram"
                            required
                            onChange={handleRadioChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="instagram"
                          >
                            Instagram
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="collegeTPO"
                            value="College TPO"
                            required
                            onChange={handleRadioChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="collegeTPO"
                          >
                            College TPO
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="referral"
                            id="friend"
                            value="Friend"
                            required
                            onChange={handleRadioChange}
                          />
                          <label className="form-check-label" htmlFor="friend">
                            Friend
                          </label>
                        </div>

                        {isChecked && (
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Friend's Name:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                name="friendName"
                                className="form-control"
                                value={formElements.friendName}
                                onChange={handleInputChangeForm}
                                placeholder="Enter friend's name"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 tnc">
                  <div className="form-check form-check-inline">
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="terms"
                        value="terms"
                        required
                        checked={termsAccepted}
                        onChange={termsCondition}
                      />
                      <span className="slider round"></span>
                    </label>
                    <label
                      className="form-check-label pl-2 text-muted"
                      htmlFor="terms"
                    >
                      By clicking submit, you agree to our {""}{" "}
                      <span
                        onClick={termsCondition}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        Terms & Conditions
                      </span>
                    </label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <input
                    type="submit"
                    name="register"
                    className="btn btn-lg btn-primary btn-block"
                    value="Register"
                    disabled={!termsAccepted}
                  />
                </div>
              </form>

              {modalOpen && (
                <Modal
                  show={modalOpen}
                  onClose={closeModal}
                  onAgree={handleAgree}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserForm;
