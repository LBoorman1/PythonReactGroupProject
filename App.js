import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import './App.css';

import BookMentoringMeeting from './components/BookMentoringMeeting';
import CreatePOAMentee from './components/CreatePOAMentee';
import DisplayMyMentor from './components/DisplayMyMentor';
import MyPOAMentee from './components/MyPOAMentee';
import Navbarmenu from './components/menu/Navbarmenu';
import DisplayMyMentee from './components/DisplayMyMentee';
import SetFreeHours from './components/SetFreeHours';
import CreatePOAMentor from './components/CreatePOAMentor';
import MyPOAMentor from './components/MyPOAMentor';
import OrganiseGroupSession from './components/OrganiseGroupSession';
import AddAdmin from './components/AddAdmin';
import RemoveUser from './components/RemoveUser';
import ChangeTopics from './components/ChangeTopics';
import SetSessionThreshold from './components/SetSessionThreshold';
import ViewFeedback from './components/ViewFeedback';
import DisplayCalendar from './components/DisplayCalendar';
import GiveFeedback from './components/GiveFeedback';
import MyFeedback from './components/MyFeedback';
import EditDetails from './components/EditDetails';
import Signin from './components/Signin';
import CreateAccount from './components/CreateAccount';



function App() {
  return (
    <div>
      <Router basename="/">

        {/* Add Menu Component */}
        <Navbarmenu />

        <Switch>
          <Route path="/BookMentoringMeeting" component={BookMentoringMeeting}/>
          <Route path="/CreatePOAMentee" component={CreatePOAMentee}/>
          <Route path="/DisplayMyMentor" component={DisplayMyMentor}/>
          <Route path="/MyPOAMentee" component={MyPOAMentee}/>
          <Route path="/MyPOAMentor" component={MyPOAMentor}/>
          <Route path="/DisplayMyMentee" component={DisplayMyMentee}/>
          <Route path="/SetFreeHours" component={SetFreeHours}/>
          <Route path="/CreatePOAMentor" component={CreatePOAMentor}/>
          <Route path="/OrganiseGroupSession" component={OrganiseGroupSession}/>
          <Route path="/AddAdmin" component={AddAdmin}/>
          <Route path="/RemoveUser" component={RemoveUser}/>
          <Route path="/ChangeTopics" component={ChangeTopics}/>
          <Route path="/SetSessionThreshold" component={SetSessionThreshold}/>
          <Route path="/ViewFeedback" component={ViewFeedback}/>
          <Route path="/DisplayCalendar" component={DisplayCalendar}/>
          <Route path="/GiveFeedback" component={GiveFeedback}/>
          <Route path="/MyFeedback" component={MyFeedback}/>
          <Route path="/EditDetails" component={EditDetails}/>
          <Route path="/Signin" component={Signin}/>
          <Route path="/CreateAccount" component={CreateAccount}/>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
