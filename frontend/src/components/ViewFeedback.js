import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FeedbackCard from './FeedbackCard';

const ViewFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:8000/allapplicationfeedback/",
          headers: {
            "Content-Type": "application/json"
          }
        });
        setFeedbackData(response.data);
      } catch(error) {
        console.log(error);
      }
    };
    fetchFeedback();
  }, []);
  
  return (
    <div className="view_feedback sec__one">
      <h1>Feedback Submitted on the Application</h1>
      {feedbackData.map(feedback => (
        <FeedbackCard text={feedback.feedback} />
      ))}
    </div>
  )
}

export default ViewFeedback;
