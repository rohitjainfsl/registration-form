import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import instance from "../../axiosConfig";


export default function TestScores() {
  const { testId } = useParams();
  const [students, setStudents] = useState([]);
  const [testTitle, setTestTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all students who took this test
    instance.get(`/students/score/test/${testId}`)
      .then(res => setStudents(res.data))
      .catch(err => {
        console.error("Error fetching scores:", err);
        setStudents([]);
      });

    // Fetch test title for breadcrumb
    instance.get(`/test/getTestById/${testId}`)
      .then(res => setTestTitle(res.data.title))
      .catch(err => {
        console.error("Error fetching test title:", err);
        setTestTitle("Unknown Test");
      });
  }, [testId]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "All Tests", path: "/admin/tests" },
    { label: testTitle },
  ];

  return (
    <div className="container mt-4">
      <Breadcrumbs items={breadcrumbItems} />

      <h2>Test: {testTitle}</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/admin/tests")}>
        ← Back to All Tests
      </button>

      {students.length === 0 ? (
        <p>No students found for this test.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>College ID</th>
              <th>Score</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>StudentAnswer</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.studentName}</td>
                <td>{student.collegeId}</td>
                <td>{student.score}</td>
                <td>{new Date(student.startTime).toLocaleString()}</td>
                <td>{new Date(student.endTime).toLocaleString()}</td>
                <td><button
                  className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/admin/test/${testId}/student/${student.studentId}`)}
                  >
                    View Answer
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
