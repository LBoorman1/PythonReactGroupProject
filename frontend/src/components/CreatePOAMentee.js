import React, { useState } from 'react';
import BulletPoints from "./BulletPoints";
import { Button, Card, CardBody } from 'reactstrap';
import Calendar from "react-select-date";
import axios from 'axios';
import { format } from "date-fns";

const CreatePOAMentee = () => {
  const [fname, setFname] = useState("");
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [date, setDate] = useState(new Date());

  const user = JSON.parse(localStorage.getItem('user'))
  const profileId = user.id;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getInput(e);
    }
  }

  const handleChange = e => {
    setFname(e.target.value);
  }

  const getInput = e => {

    setItems([...items, fname]);

    e.preventDefault();
  }

  const add_targets = poa_id => {
    const target_data = {
      "poa_id": poa_id,
      "target_list": items
    }
    axios
      .post("http://localhost:8000/POATargetCreate/", target_data)
      .then(response => {
        console.log("targets added");
      });
  }

  const handleSubmit = () => {
    const poa_data = {
      "profile_id": profileId,
      "is_mentee": true,
      "is_mentor": false,
      "target_profile_id": null,
      "title": title,
      "finish_date": date
    }
    axios
      .post("http://localhost:8000/POA/", poa_data)
      .then(response => {
        const poa_id = response.data
        add_targets(poa_id);
      });
  }

  return (
    <div className="create_poa_mentee sec__one">
      <Card>
        <CardBody>
          <form>
            <label>
              Add Title: {" "}
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
          </form>
          <br></br>

          <Calendar
            onSelect={(d) => setDate(d)}
          />
          <br></br>

          <Card>
            <form>
              <br></br>
              <label>
                Add milestone:{" "}
                <input type="text" value={fname} onChange={handleChange} onKeyDown={handleKeyDown} />
                <Button onClick={getInput} type="button">Add new milestone </Button>
              </label>
            </form>

            <h2>Plan of Action: {title}</h2>
            <BulletPoints
              array={items}
            />
          </Card>
        </CardBody>
      </Card>
      <Button onClick={handleSubmit} type="button">Save and Create</Button>
    </div>
  )
}

export default CreatePOAMentee
