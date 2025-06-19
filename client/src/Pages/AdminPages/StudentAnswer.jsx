import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../axiosConfig";
import Breadcrumbs from "../../Components/Breadcrumbs";

export default function StudentAnswers() {
    const { testId, studentId } = useParams();
    const [answers, setAnswers] = useState([]);
    const [student, setStudent] = useState(null);
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        instance.get(`/students/admin/test/${testId}/student/${studentId}/answers`)
            .then(res => {
                setAnswers(res.data.answers);
                setStudent(res.data.student);
                setTest(res.data.test);
                setLoading(false); 
            })
            .catch(err => {
                console.error("Error fetching student answers:", err);
                setError("Failed to load answers");
                setLoading(false);
            });
    }, [testId, studentId]);

    if (loading) return <div>Loading answers...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <Breadcrumbs
                paths={[
                    { label: "All Tests", to: "/admin/all-tests" },
                    { label: test?.title || "Test", to: `/admin/test/${testId}/scores` },
                    { label: student?.name || "Student" }
                ]}
            />

            <h3>Answers of {student?.name} for "{test?.title}"</h3>

            {answers.length === 0 ? (
                <p>No answers found.</p>
            ) : (
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Q. No.</th>
                            
                            <th>Options</th>
                            <th>Selected Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answers.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                
                                <td>
                                    <ul className="list-unstyled mb-0">
                                        {item.question.options.map((opt, idx) => (
                                            <li key={idx}>
                                                <span
                                                    style={{
                                                        fontWeight: opt === item.selectedOption ? 'bold' : 'normal',
                                                        color: opt === item.selectedOption ? 'blue' : 'black'
                                                    }}
                                                >
                                                    {opt}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{item.selectedOption || "Not Attempted"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
