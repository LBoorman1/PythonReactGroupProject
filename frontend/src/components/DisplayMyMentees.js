import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import Requests from './Request';
import { Card, Button } from 'reactstrap';
import boolToStr from "./BoolToStringNice";
import axios from "axios";

const DisplayMyMentees = () => {
  const [menteeDetails, setMenteeDetails] = useState([]);
  
  // user ID 3 user with mentees example
  // user ID 2 user without mentees example
  const userId = 3;
  let content;

  useEffect(() => {
    const fetchMenteeDetails = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://localhost:8000/mentormentees/?user_id=${userId}`,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setMenteeDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenteeDetails();
  }, []);

  if (menteeDetails.length == 0) {
    content = (
      <div style={{ textAlign: "center" }}>
        Looks like you don't currently have any mentees. Check your requests from mentees for you to mentor them.
      </div>
    )
  } else {
    content = (
      <div>
        {menteeDetails.map(mentee => (
          <UserCard
            id={mentee.user.id}
            firstName={mentee.user.first_name}
            lastName={mentee.user.last_name}
            email={mentee.user.email}
            businessArea={mentee.business_area.name}
            active={boolToStr(mentee.user.is_active)}
            admin={boolToStr(mentee.is_admin)}
            mentee={boolToStr(mentee.is_mentee)}
            mentor={boolToStr(mentee.is_mentor)}
            topicsOfInterest={mentee.topics_of_interest.map(topic => topic.skill.name)}
            topicsOfExpertise={mentee.topics_of_expertise.map(topic => topic.skill.name)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="display_my_mentees sec__one">
      <h1>My Mentees</h1>
      <br />

      {content}
    </div>
  )
}

export default DisplayMyMentees;
