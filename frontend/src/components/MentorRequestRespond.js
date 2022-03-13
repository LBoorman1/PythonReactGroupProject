import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import boolToStr from "./BoolToStringNice";
import axios from "axios";

const MentorRequestRespond = () => {
    const [requestData, setRequestData] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.user.id;

    useEffect(() => {
        const fetchMentorRequests = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `http://localhost:8000/mentorrequests/?user_id=${userId}`,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setRequestData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMentorRequests();
    }, []);

    const addRelationship = async (menteeId) => {
        try {
            const response = await axios({
                method: "POST",
                url: `http://localhost:8000/addmentoringrelationship/`,
                data: {
                    "mentee_id": menteeId,
                    "mentor_id": userId,
                    "group": false,
                    "advertising_for_group": false 
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Removes mentor request from DB and updates frontend
    const removeRequest = async (requestId) => {
        console.log(requestId);
        try {
            const response = await axios({
                method: "DELETE",
                url: `http://localhost:8000/mentorrequests/${requestId}`,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log(error);
        }
        setRequestData(requestData.filter(
             request => request.id != requestId
        ));
    }

    const handleAccept = (menteeId, requestId) => {
        addRelationship(menteeId);
        removeRequest(requestId);
    }

    const handleDeny = requestId => {
        removeRequest(requestId);
    }

    return (
        <div className="display_my_mentees sec__one">
            <h1>Mentor Requests</h1>
            <br />
            {requestData.map(request => (
                    <UserCard
                        id={request.mentee.user.id}
                        firstName={request.mentee.user.first_name}
                        lastName={request.mentee.user.last_name}
                        email={request.mentee.user.email}
                        businessArea={request.mentee.business_area.name}
                        active={boolToStr(request.mentee.user.is_active)}
                        admin={boolToStr(request.mentee.is_admin)}
                        mentee={boolToStr(request.mentee.is_mentee)}
                        mentor={boolToStr(request.mentee.is_mentor)}
                        topicsOfInterest={request.mentee.topics_of_interest.map(topic => topic.skill.name)}
                        topicsOfExpertise={request.mentee.topics_of_expertise.map(topic => topic.skill.name)}
                        type="mentorRequest"
                        requestId={request.id}
                        onAccept={handleAccept}
                        onDeny={handleDeny}
                    />
            ))}
        </div>
    )
}

export default MentorRequestRespond;