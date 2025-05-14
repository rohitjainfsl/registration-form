import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Spinner } from "react-bootstrap";
import instance from "../axiosConfig";

function StudentDetails() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        instance.get(`/students/getStudents/${id}`, { withCredentials: true })
            .then(res => {
                setStudent(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch student", err);
                setLoading(false);
            });
    }, [id]);

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
         <Container className="text-center" style={{ marginTop: "10rem" }}>
            <h3>{student.name}'s Details</h3>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>DOB:</strong> {student.dob}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Aadhar Front:</strong><br />
                <Image src={student.aadharFront} alt="Aadhar Front" thumbnail width={150} />
            </p>
            <p><strong>Aadhar Back:</strong><br />
                <Image src={student.aadharBack} alt="Aadhar Back" thumbnail width={150} />
            </p>
        </Container>
    );
}

export default StudentDetails;
