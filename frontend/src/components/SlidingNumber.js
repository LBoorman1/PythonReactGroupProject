import React from 'react';
import Slider from 'react-input-slider';
import { useState } from 'react';
import { Card, Button } from 'reactstrap';

const SlidingNumber = props => {
  const [state, setState] = useState({ x: props.default });

  return (
    <div>
      <Card>

        <h5>Please select the minimum number of mentees required for a group session to be run: </h5>

        <h6>Previously: {props.default}</h6>

        {state.x}
        <Slider
          axis="x"
          x={state.x}
          onChange={({ x }) => setState(state => ({ ...state, x }))}
        />
        <br></br>

        <Button>Submit</Button>

      </Card>
    </div>
  );
}

export default SlidingNumber;