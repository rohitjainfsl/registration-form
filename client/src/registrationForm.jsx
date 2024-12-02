import "./App.css";
import { useState } from "react";
import Modal from "./t&m_model.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function UserForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [otherCourse, setOtherCourse] = useState("");
  const [role, setRole] = useState("student");
  const [isChecked, setIsChecked] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [formElements, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadharFront: null,
  });

  const handleAgree = () => {
    setTermsAccepted(true);
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submit:", formElements); // Log current form data

    try {
      const frm = new FormData();
      frm.append("name", formElements.name);
      frm.append("email", formElements.email);
      frm.append("phone", formElements.phone);
      frm.append("dob", formElements.dob);
      frm.append("gender", formElements.gender);
      frm.append("aadharFront", formElements.aadharFront);
      frm.append("aadharBack", formElements.aadharBack);

      const response = await axios.post("http://localhost:5000/register", frm);
      alert("Form submitted successfully");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Failed to submit form");
    }
  };

  const handleRadioChange = (event) => {
    setIsChecked(event.target.value === "Friend");
    setFormData({ ...formElements, referral: event.target.value });
  };

  // const handleAgree = () => {
  //   setTermsAccepted(true); // Set the terms as accepted
  //   setShowModal(false); // Close the modal
  // };

  // const handleInputChange = (event) => {
  //   setFriendName(event.target.value);
  // };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress); // Toggle the checkbox state
    if (!isSameAddress) {
      // setPermanentAddress(localAddress); // Auto-fill Permanent Address
      setFormData({ ...formElements, paddress: formElements.laddress });
    } else {
      // setPermanentAddress(""); // Clear Permanent Address if checkbox is unchecked
      setFormData({ ...formElements, paddress: "" });
    }
  };

  const termsCondition = () => {
    console.log("Opening modal...");
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal...");
    setModalOpen(false);
  };

  // const handleCourseChange = (e) => {
  //   const { value } = e.target;
  //   setSelectedCourse(value);

  //   if (value !== "other") {
  //     setOtherCourse("");
  //   }
  // };

  // const handleTermsChange = (e) => {
  //   setTermsAccepted(e.target.checked);
  // };

  const handleInputChangeForm = (e) => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChangeForm = (e) => {
    setFormData({ ...formElements, [e.target.name]: e.target.files[0] });
  };

  return (
    <>
      <div id="wrapper">
        <div className="container-fluid">
          <div className="row">
            <div
              className="success-msg alert alert-success alert-dismissible fade hide"
              role="alert"
            >
              <strong>THANKS. Your registration is successful.</strong>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
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
                      <label htmlFor="name" className="col-sm-2 col-form-label">
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
                        <input
                          type="date"
                          className="form-control"
                          id="dob"
                          name="dob"
                          value={formElements.dob}
                          onChange={handleInputChangeForm}
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
                            onChange={handleFileChangeForm}
                            required
                          />
                        </div>

                        <div className="col-sm-6">
                          <input
                            type="file"
                            className="form-control"
                            id="aadharBack"
                            name="aadharBack"
                            onChange={handleFileChangeForm}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12">
                  <input
                    type="submit"
                    name="register"
                    className="btn btn-lg btn-primary btn-block"
                    value="Register"
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
