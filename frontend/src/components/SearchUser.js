import React from 'react';
import axios from 'axios';
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const SearchUser = () => {
    
    const performSearch = async (e) => {
      e.preventDefault();
      try {
        const response = await axios({
            method: "GET",
            url: "http://localhost:8000/SearchUserView?name=" + e.target.name.value,
            headers: {
                "Content-Type": "application/json"
            }
        })
        // Updates frontend
        handleUpdate(response);
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <div className="search_user sec__one">
          <h2> Search for User </h2>
          <br />
          <Card>
            <CardBody> 
              <Form onSubmit="performSearch">
                <FormGroup>
                  <Label for="userSearch">Enter user name</Label>
                  <br />
                  <Input id="userSearch" name="search" />
                  <br />
                  <Button>Search</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
    )
}

export default SearchUser;