import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Form, Button } from "react-bootstrap";
import instance from "../../axiosConfig";
import { getPNGUrl, getPublicIdFromUrl } from "../Cloudinary/cloudinary";

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fees, setFees] = useState("");
  const [startDate, setStartDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    instance
      .get(`/students/getStudents/${id}`, { withCredentials: true })
      .then((res) => {
        setStudent(res.data);
        setFees(res.data.fees || "");
        setStartDate(res.data.startDate || "");
        setRemarks(res.data.remarks || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch student", err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = () => {
    instance
      .put(
        `/students/updateStudent/${id}`,
        { fees, startDate, remarks },
        { withCredentials: true }
      )
      .then(() => {
        setMessage("Student details updated successfully.");
        setStudent((prev) => ({
          ...prev,
          fees,
          startDate,
          remarks,
        }));
      })
      .catch((err) => {
        console.error("Update error", err);
        setMessage("Failed to update student.");
      });
  };

  if (loading) {
    return (
      <Container className="text-center" style={{ marginTop: "10rem" }}>
        <Spinner animation="border" />
        <p>Loading student details...</p>
      </Container>
    );
  }

  if (!student) return <Container>No student found</Container>;

  return (
    <Container style={{ marginTop: "5rem" }}>
      <h3 className="text-center mb-4">{student.name}'s Details</h3>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Phone:</strong> {student.phone}</p>
      <p><strong>DOB:</strong> {student.dob}</p>
      <p><strong>Gender:</strong> {student.gender}</p>
      <p><strong>Father's Name:</strong> {student.fname}</p>
      <p><strong>Father's Phone:</strong> {student.fphone}</p>
      <p><strong>Local Address:</strong> {student.laddress}</p>
      <p><strong>Permanent Address:</strong> {student.paddress}</p>
      <p><strong>Role:</strong> {student.role}</p>
      <p><strong>Qualification:</strong> {student.qualification}</p>
      <p><strong>Qualification Year:</strong> {student.qualificationYear}</p>
      <p><strong>College:</strong> {student.college}</p>
      <p><strong>Designation:</strong> {student.designation}</p>
      <p><strong>Company:</strong> {student.company}</p>
      <p><strong>Course:</strong> {student.course}</p>
      <p><strong>Other Course:</strong> {student.otherCourse}</p>
      <p><strong>Referral:</strong> {student.referral}</p>
      <p><strong>Friend's Name:</strong> {student.friendName}</p>

      {/* Aadhar Front Image (PNG) */}
      <p>
        <strong>Aadhar Front:</strong><br />
        {student.aadharFront ? (
          <img
            src={getPNGUrl(getPublicIdFromUrl(student.aadharFront))}
            alt="Aadhar Front"
            width={150}
            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          />
        ) : (
          "Not uploaded"
        )}
      </p>

      {/* Aadhar Back Image (PNG) */}
      <p>
        <strong>Aadhar Back:</strong><br />
        {student.aadharBack ? (
          <img
            src={getPNGUrl(getPublicIdFromUrl(student.aadharBack))}
            alt="Aadhar Back"
            width={150}
            style={{ border: "1px solid #ccc", borderRadius: "5px" }}
          />
        ) : (
          "Not uploaded"
        )}
      </p>

      <hr />
      <h5 className="mb-3">Additional Details</h5>
      <p><strong>Fees:</strong> {student.fees}</p>
      <p><strong>Start Date:</strong> {student.startDate}</p>
      <p><strong>Remarks:</strong> {student.remarks}</p>

      <hr />
      <h5>Update Additional Details</h5>
      <Form.Group className="mb-3">
        <Form.Label>Fees</Form.Label>
        <Form.Control
          type="text"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Remarks</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </Form.Group>

      <Button onClick={handleUpdate}>Update</Button>

      {message && (
        <p className="mt-3" style={{ color: message.includes("Failed") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </Container>
  );
}

export default StudentDetails;
