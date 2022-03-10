import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import Card from 'reactstrap';
import RequestMentor from './RequestMentor';
import boolToStr from "./BoolToStringNice";
import axios from "axios";

const DisplayMyMentor = () => {
    const [mentorDetails, setMentorDetails] = useState([]);
    
    // user ID 4 user with mentor example
    // user ID 11 user without mentor example
    const userId = 11;
    let content;

    useEffect(() => {
        const fetchMentorDetails = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `http://localhost:8000/menteementor/?user_id=${userId}`,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.data);
                console.log(response.data != {});
                if (Object.keys(response.data).length !== 0) {
                    console.log('test');
                    setMentorDetails([response.data]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchMentorDetails();
        console.log(mentorDetails);
    }, []);

    if (mentorDetails.length == 0) {
        content = (
            <div>
                <h2>Request a Mentor</h2>
            </div>
        )
    } else {
        content = (
            <div className="display_my_mentor sec__one">
                <h1>My Mentor</h1>
                {mentorDetails.map(mentor => (
                    <UserCard
                        id={mentor.user.id}
                        firstName={mentor.user.first_name}
                        lastName={mentor.user.last_name}
                        email={mentor.user.email}
                        businessArea={mentor.business_area.name}
                        active={boolToStr(mentor.is_active)}
                        admin={boolToStr(mentor.is_admin)}
                        mentee={boolToStr(mentor.is_mentee)}
                        mentor={boolToStr(mentor.is_mentor)}
                        topicsOfInterest={mentor.topics_of_interest.map(topic => topic.skill.name)}
                        topicsOfExpertise={mentor.topics_of_expertise.map(topic => topic.skill.name)}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="display_my_mentor sec__one">
            {content}

            <RequestMentor array={["user 1", "user 2"]} />

        </div>
    )
}

export default DisplayMyMentor;
