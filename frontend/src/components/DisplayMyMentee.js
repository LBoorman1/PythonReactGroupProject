import React from 'react';
import UserCard from './UserCard';
import Requests from './Request';
import {Card, Button} from 'reactstrap';

const DisplayMyMentee= () => {
    return (
        <div className="display_my_mentee sec__one">
            <h1> Display My Mentee </h1>
            <UserCard 
              id="12345" 
              firstName="John" 
              lastName="Smith" 
              email="johnsmith@gmail.com" 
              businessArea="Business Area 1"
              inactive="False"
              mentee="True"
              mentor="False"
              admin="False"
              topicsOfInterest={["Topic 4", "Topic 2", "Topic 3"]}
              topicsOfExpertise={[]}
              type=""
            />
            <UserCard 
              id="12345" 
              firstName="John" 
              lastName="Smith" 
              email="johnsmith@gmail.com" 
              businessArea="Business Area 1"
              inactive="False"
              mentee="True"
              mentor="False"
              admin="False"
              topicsOfInterest={["Topic 4", "Topic 2", "Topic 3"]}
              topicsOfExpertise={[]}
              type=""
            />
            <UserCard 
              id="12345" 
              firstName="John" 
              lastName="Smith" 
              email="johnsmith@gmail.com" 
              businessArea="Business Area 1"
              inactive="False"
              mentee="True"
              mentor="False"
              admin="False"
              topicsOfInterest={["Topic 4", "Topic 2", "Topic 3"]}
              topicsOfExpertise={[]}
              type=""
            />

            <Card>
              <h1>My Requests:</h1>

              <Requests type="Become mentor" request="Of user X"/>
              <Requests type="Set up group session" request="for skill y"/>
              <Requests type="Set up group session" request="for skill y"/>


            </Card>
        </div>
    )
}

export default DisplayMyMentee
