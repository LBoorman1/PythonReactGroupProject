import React from 'react'
import { Button, Card, CardBody, CardText, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';

const ChangeTopics= () => {
    return (
        <div className="change_topics sec__one">
          <h1>Add or Remove Business Areas or Topics</h1>
          <br />
          <Card>
            <CardBody>
              <CardTitle tag="h4">
                Business Areas
              </CardTitle>
              <CardTitle tag="h5">
                Current Business Areas in Use
              </CardTitle>
              <CardText>
                Business Area 1, Business Area 2, Business Area 3
              </CardText>

              <CardTitle tag="h5">
                Add Business Area
              </CardTitle>
              <Form>
                <FormGroup>
                  <Label for="businessAreaAdd">Enter business area to add</Label>
                    <br />
                    <Input id="businessAreaAdd" name="businessArea" />
                    <br />
                    <Button color="primary">Add</Button>
                </FormGroup>
              </Form>

              <CardTitle tag="h5">
                Remove Business Area
              </CardTitle>
              <Form>
                <FormGroup>
                  <Label for="businessAreaRemove">Enter business area to remove</Label>
                    <br />
                    <Input id="businessAreaRemove" name="businessArea" />
                    <br />
                    <Button color="primary">Remove</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
          
          <br/>
          
          <Card>
            <CardBody>
              <CardTitle tag="h4">
                Topics
              </CardTitle>
              <CardTitle tag="h5">
                Current Topics in Use
              </CardTitle>
              <CardText>
                Topic 1, Topic 2, Topic 3
              </CardText>

              <CardTitle tag="h5">
                Add Topic
              </CardTitle>
              <Form>
                <FormGroup>
                  <Label for="topicAdd">Enter topic to add</Label>
                    <br />
                    <Input id="topicAdd" name="topicArea" />
                    <br />
                    <Button color="primary">Add</Button>
                </FormGroup>
              </Form>
             
              <CardTitle tag="h5">
                Remove Topic
              </CardTitle>
              <Form>
                <FormGroup>
                  <Label for="topicRemove">Enter topic to remove</Label>
                    <br />
                    <Input id="topicRemove" name="topic" />
                    <br />
                    <Button color="primary">Remove</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
    )
}
export default ChangeTopics
