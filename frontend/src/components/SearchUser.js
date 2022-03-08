import React from 'react';
import axios from 'axios';
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const SearchUser = props => {
    
    const performSearch = async (e) => {
      e.preventDefault();
      console.log(e.target.search.value);
      try {
        const response = await axios({
            method: "GET",
            url: "http://localhost:8000/searchuser?name=" + e.target.search.value,
            headers: {
                "Content-Type": "application/json"
            }
        })
        // Updates frontend
        console.log(response.data);
        props.handleUpdate(response.data);
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
              <Form onSubmit={performSearch}>
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