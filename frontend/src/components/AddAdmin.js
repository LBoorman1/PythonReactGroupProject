import React from 'react';
import SearchUser from './SearchUser';
import UserCard from './UserCard';
import Request from './Request';
import {Button,Card} from 'reactstrap';

const AddAdmin = () => {
    return (
        <div className="add_admin sec__one">
            <h1> Add Admin </h1>
            <SearchUser />
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
              type="toggleAdmin"
            />


            < Card>
              <h1>Requests:</h1>
              {/* Once we have the data we will get it from props.array and loop shoing the user name and request */}

              <Request type="Become mentor" request="for user X"/>
              <Request type="Become meentee" request="for user y"/>


            </Card>
        </div>
    )
}

export default AddAdmin;
