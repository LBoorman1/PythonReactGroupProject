import React, { useEffect, useState } from 'react'
import axios from 'axios';
import FeedbackCard from './FeedbackCard';

const ViewFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { feedbackData: response } = await axios({
          method: "GET",
          url: "http://localhost:8000/ApplicationFeedbackView"
        });
        setFeedbackData(response);
      } catch(error) {
        console.log(error);
      }
    };
    fetchFeedback();
  }, []);
  
  return (
    <div className="view_feedback sec__one">
      <h1> View Feedback </h1>
      {feedbackData.map(feedback => (
        <FeedbackCard text={feedback.feedback} />
      ))}
      <FeedbackCard text="This app is amazing!" />
    </div>
  )
}

export default ViewFeedback
