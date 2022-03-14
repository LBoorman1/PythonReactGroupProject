import React, { useState, useEffect } from 'react';

import UserCard from './UserCard';
import boolToStr from "./BoolToStringNice";
import axios from "axios";
import endRelationship from "./EndRelationship";

const DisplayMyMentor = () => {
    const [mentorDetails, setMentorDetails] = useState([]);
    // Makes sure user cannot request another mentor if they already have requested one
    const [userHasRequest, setUserHasRequest] = useState(false);
    const [potentialMentorsData, setPotentialMentorsData] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.user.id;

    let content;

    const requestMentor = async (menteeId, mentorId) => {
        try {
            const response = await axios({
                method: "POST",
                url: `http://localhost:8000/mentorrequests/`,
                data: {
                    "mentee_id": menteeId,
                    "mentor_id": mentorId
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setUserHasRequest(true);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPotentialMentors = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: `http://localhost:8000/possiblementors/?user_id=${userId}`,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setPotentialMentorsData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchUserMentorRequests = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: `http://localhost:8000/mentorrequestsbymentee/?user_id=${userId}`,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (Object.keys(response.data).length === 0) {
                fetchPotentialMentors();
            } else {
                setUserHasRequest(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchMentorDetails = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: `http://localhost:8000/menteementor/?user_id=${userId}`,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (Object.keys(response.data).length !== 0) {
                setMentorDetails([response.data]);
            } else {
                fetchUserMentorRequests();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMentorDetails();
    }, []);

    const handleEndRelationship = relationshipId => {
        endRelationship(relationshipId)
            .then(res => {
                setMentorDetails([]);
                fetchMentorDetails();
            });
    }

    if (mentorDetails.length == 0 && !userHasRequest) {
        if (potentialMentorsData.length == 0) {
            content = (
                <div style={{ textAlign: "center" }}>
                    Sorry, we could not find any mentors that suit your interests right now.
                </div>
            )
        } else {
            content = (
                <div style={{ textAlign: "center" }} className="display_my_mentor sec__one">
                    Looks like you don't currently have a mentor. Here is a list of potential mentors that may suit your interests:
                    {potentialMentorsData.map(mentor => (
                        <UserCard
                            id={mentor.user.id}
                            firstName={mentor.user.first_name}
                            lastName={mentor.user.last_name}
                            email={mentor.user.email}
                            businessArea={mentor.business_area.name}
                            active={boolToStr(mentor.user.is_active)}
                            admin={boolToStr(mentor.is_admin)}
                            mentee={boolToStr(mentor.is_mentee)}
                            mentor={boolToStr(mentor.is_mentor)}
                            topicsOfInterest={mentor.topics_of_interest.map(topic => topic.skill.name)}
                            topicsOfExpertise={mentor.topics_of_expertise.map(topic => topic.skill.name)}
                            type="potentialMentor"
                            menteeId={userId}
                            onRequest={requestMentor}
                        />
                    ))}
                </div>
            )
        }
    } else if (userHasRequest) {
        content = (
            <div style={{ textAlign: "center" }} className="display_my_mentor sec__one">
                Thanks for sending a request to a mentor! They should consider it shortly.
            </div>
        )
    } else {
        content = (
            <div className="display_my_mentor sec__one">
                {mentorDetails.map(mentor => (
                    <UserCard
                        id={mentor.user.id}
                        firstName={mentor.user.first_name}
                        lastName={mentor.user.last_name}
                        email={mentor.user.email}
                        businessArea={mentor.business_area.name}
                        active={boolToStr(mentor.user.is_active)}
                        admin={boolToStr(mentor.is_admin)}
                        mentee={boolToStr(mentor.is_mentee)}
                        mentor={boolToStr(mentor.is_mentor)}
                        topicsOfInterest={mentor.topics_of_interest.map(topic => topic.skill.name)}
                        topicsOfExpertise={mentor.topics_of_expertise.map(topic => topic.skill.name)}
                        type="mentoringRelationship"
                        menteeId={userId}
                        relationshipId={mentor.relationship}
                        onEndRel={handleEndRelationship}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="display_my_mentor sec__one">
            <h1>My Mentor</h1>

            {content}

        </div>
    )
}

export default DisplayMyMentor;
