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
      setBusinessAreaData([...businessAreaData, response.data]);
    } catch (error) {
      console.log(error);
    }
  }
  
  // Could maybe add something that checks if a user has the business area/topic being deleted
  const removeBusinessArea = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "DELETE",
        url: "http://localhost:8000/businessareas/" + e.target.businessArea.value + "/",
        headers: {
          "Content-Type": "application/json"
        }
      });
      setBusinessAreaData(businessAreaData.filter(
        businessArea => businessArea.id != e.target.businessArea.value
      ));
    } catch (error) {
      console.log(error);
    }
  }

  const addTopic = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/skills/",
        data: {
          name: e.target.topic.value
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
      setTopicData([...topicData, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  const removeTopic = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "DELETE",
        url: "http://localhost:8000/skills/" + e.target.topic.value + "/",
        headers: {
          "Content-Type": "application/json"
        }
      });
      setTopicData(topicData.filter(
        topic => topic.id != e.target.topic.value
      ));
    } catch (error) {
      console.log(error);
    }
  }

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
          <Form onSubmit={removeBusinessArea}>
            <FormGroup>
              <Label for="businessAreaRemove">Select business area to remove</Label>
              <br />
              <Input type="select" name="businessArea" id="businessAreaRemove">
                {businessAreaData.map(businessArea => 
                  <option value={businessArea.id}>
                    {businessArea.name}
                  </option>
                )}
              </Input>
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
            Add Topic
          </CardTitle>
          <Form onSubmit={addTopic}>
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
          <Form onSubmit={removeTopic}>
            <FormGroup>
              <Label for="topicRemove">Select topic to remove</Label>
              <br />
              <Input type="select" id="topicRemove" name="topic">
                {topicData.map(topic => 
                  <option value={topic.id}>
                    {topic.name}
                  </option>
                )}
              </Input>
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
