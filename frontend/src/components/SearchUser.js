import React from 'react';
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const SearchUser = () => {
    return (
        <div className="search_user sec__one">
          <h2> Search for User </h2>
          <br />
          <Card>
            <CardBody> 
              <Form>
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