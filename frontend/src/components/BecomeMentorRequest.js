import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import boolToStr from './BoolToStringNice';

const BecomeMentorRequest = () => {
    const [becomeMentorRequestData, setBecomeMentorRequestData] = useState([]);
    
    const fetchBecomeMentorRequests = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "http://localhost:8000/becomementors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setBecomeMentorRequestData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(fetchBecomeMentorRequests, []);

    const handleAccept = (userId, requestId) => {
        // Make user a mentor and check off the request
        setMentor(userId);
        checkOffRequest(requestId);
        fetchBecomeMentorRequests();
    }

    const handleDeny = (userId, requestId) => {
        // Check off the request and remove proposed topics of expertise from database
        checkOffRequest(requestId);
        removeTopicsOfExpertise(userId);
        fetchBecomeMentorRequests();
    }

    const setMentor = async (userId) => {
        try {
            await axios({
                method: "PATCH",
                url: "http://localhost:8000/setmentor/" + userId + "/",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const removeTopicsOfExpertise = async (userId) => {
        try {
            await axios({
                method: "DELETE",
                url: "http://localhost:8000/removetopicsofexpertise/" + userId + "/",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const checkOffRequest = async (requestId) => {
        try {
            await axios({
                method: "PATCH",
                url: "http://localhost:8000/checkoffbecomementor/" + requestId + "/",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=" sec__one">
            <h1>Become Mentor Requests</h1>
            {becomeMentorRequestData.map(request => (
                <UserCard
                    id={request.profile.user.id}
                    firstName={request.profile.user.first_name}
                    lastName={request.profile.user.last_name}
                    email={request.profile.user.email}
                    businessArea={request.profile.business_area.name}
                    active={boolToStr(request.profile.user.is_active)}
                    mentee={boolToStr(request.profile.is_mentee)}
                    mentor={boolToStr(request.profile.is_mentor)}
                    admin={boolToStr(request.profile.is_admin)}
                    topicsOfInterest={request.profile.topics_of_interest.map(topic => topic.skill.name)}
                    topicsOfExpertise={request.profile.topics_of_expertise.map(topic => topic.skill.name)}
                    type="makeMentor"
                    requestId={request.id}
                    onAccept={handleAccept}
                    onDeny={handleDeny}
                />
            ))}
        </div>
    )
}

export default BecomeMentorRequest;