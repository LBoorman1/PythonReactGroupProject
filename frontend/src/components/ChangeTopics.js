import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardText, CardTitle, Form, FormGroup, Input, Label } from "reactstrap";
import { fetchBusinessAreas, fetchTopics } from "./GetTopicsBusinessAreas";

const ChangeTopics = () => {
  const [businessAreaData, setBusinessAreaData] = useState([]);
  const [topicData, setTopicData] = useState([]);

  useEffect(() => {
    const fetchBusinessAreas = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:8000/businessareas",
          headers: {
            "Content-Type": "application/json"
          }
        });
        setBusinessAreaData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBusinessAreas();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://localhost:8000/skills",
          headers: {
            "Content-Type": "application/json"
          }
        });
        setTopicData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopics();
  }, []);

  const addBusinessArea = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/businessareas/",
        data: {
          name: e.target.businessArea.value
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response.data);
      setBusinessAreaData([...businessAreaData, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  const addTopic = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/SkillView",
        data: {
          name: e.target.topic.value
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
      setTopicData([...topicData, response]);
    } catch (error) {
      console.log(error);
    }
  }

  // Likely not to implement removing business areas and topics due to issues if a user has that business area or topic

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
            {businessAreaData.map(businessArea => businessArea.name + ", ")}
          </CardText>

          <CardTitle tag="h5">
            Add Business Area
          </CardTitle>
          <Form onSubmit={addBusinessArea}>
            <FormGroup>
              <Label for="businessAreaAdd">Enter business area to add</Label>
              <br />
              <Input id="businessAreaAdd" name="businessArea" />
              <br />
              <Button type="submit" color="primary">Add</Button>
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
              <Button color="danger">Remove</Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>

      <br />

      <Card>
        <CardBody>
          <CardTitle tag="h4">
            Topics
          </CardTitle>
          <CardTitle tag="h5">
            Current Topics in Use
          </CardTitle>
          <CardText>
            {topicData.map(topic => topic.name + ", ")}
          </CardText>

          <CardTitle tag="h5">
            Add Topic
          </CardTitle>
          <Form onSubmit="addTopic">
            <FormGroup>
              <Label for="topicAdd">Enter topic to add</Label>
              <br />
              <Input id="topicAdd" name="topic" />
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
              <Button color="danger">Remove</Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}
export default ChangeTopics;
