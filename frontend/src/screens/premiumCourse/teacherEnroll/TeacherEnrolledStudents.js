import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TeacherEnrolledStudents() {
    const navigate = useNavigate();

    const { userInfo } = useSelector(state => state.userLogin);

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
            return;
        }

        const fetchStudents = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `token ${userInfo.token}`,
                    },
                };

                const { data } = await axios.get(
                    '/razorpay/teacherEnrolledStudents/',
                    config
                );

                setStudents(data);
            } catch (err) {
            console.error("Failed to load enrolled students:", err);
            console.error("Status:", err.response?.status);
            console.error("Response:", err.response?.data);

            setError(
                `Error ${err.response?.status || ""}: ${
                err.response?.data?.detail ||
                err.response?.data?.error ||
                err.message
                }`
            );
            } finally {
            setLoading(false);
            }
        };

        fetchStudents();
    }, [userInfo, navigate]);

    if (loading) {
        return <p>Loading enrolled students...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <div className="container">
            <h3 className="headForRegister">
                Students Enrolled in Your Premium Courses
            </h3>

            <hr
                style={{
                    border: '2px solid #0ba9f2',
                    opacity: 1,
                }}
            />

            {students.length === 0 ? (
                <p>No paid enrollments found.</p>
            ) : (
                <div className="row">
                    {students.map((student, index) => (
                        <div
                            className="col-md-6"
                            key={`${student.student_id}-${student.course_id}-${index}`}
                        >
                            <div
                                style={{
                                    padding: '20px',
                                    margin: '10px 0',
                                    boxShadow: '0 0 5px -1px grey',
                                }}
                            >
                                <h5>{student.student_username}</h5>

                                <p>
                                    <strong>Email:</strong>{' '}
                                    {student.student_email}
                                </p>

                                <p>
                                    <strong>Course:</strong>{' '}
                                    {student.course_name}
                                </p>

                                <Link
                                to={`/chat/${student.student_id}`}
                                state={{ teacherName: student.student_username }}
                                >
                                    <button type="button">
                                        Chat with Student
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TeacherEnrolledStudents;