import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import Breadcrumbs from "../../Components/Breadcrumbs";

export default function AllTests() {
    const [tests, setTests] = useState([]);
    const [testName, setTestName] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function fetchTests() {
        try {
            const res = await instance.get("/test/allTests");
            setTestName(res.data.tests);
            // console.log(res.data.tests);
        } catch (error) {
            console.error("Failed to fetch tests", error);
        }
    }

    useEffect(() => {
        setLoading(true);
        instance.get("/students/score")
            .then(res => {
                console.log("API Response:", res.data);

                const testMap = new Map();
                console.log(testMap);

                if (Array.isArray(res.data)) {
                    res.data.forEach(student => {

                        if (student.attempts && Array.isArray(student.attempts)) {
                            student.attempts.forEach(attempt => {
                                if (attempt.testId && attempt.startTime) {
                                    const testIdStr = attempt.testId.toString();
                                    if (!testMap.has(testIdStr)) {
                                        testMap.set(testIdStr, {
                                            testId: attempt.testId,
                                            date: new Date(attempt.startTime).toLocaleDateString(),
                                            time: new Date(attempt.startTime).toLocaleTimeString(),
                                        });
                                    }
                                }
                            });
                        }
                    });
                }

                setTests(Array.from(testMap.values()));
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch tests:", err);
                setError("Failed to fetch tests");
                setLoading(false);
            });
        fetchTests();

    }, []);
    console.log(testName)

    if (loading) {
        return <div>Loading tests...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <Breadcrumbs />
            <h2 className="mb-3">All Tests</h2>
            {tests.length === 0 ? (
                <p>No tests found.</p>
            ) : (
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>S. No.</th>
                            <th>Test Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((test, index) => {
                            const matchingTest = testName.find(t => t._id === test.testId);
                            const testTitle = matchingTest ? matchingTest.title : "Unknown Title";

                            return (
                                <tr key={test.testId}>
                                    <td>{index + 1}</td>
                                    <td>{testTitle}</td>
                                    <td>{test.date}</td>
                                    <td>{test.time}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => navigate(`/admin/test/${test.testId}/scores`)}
                                        >
                                            View Results
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}