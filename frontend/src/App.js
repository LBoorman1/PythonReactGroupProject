import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import './App.css';

import BookMentoringMeeting from './components/BookMentoringMeeting';
import CreatePOAMentee from './components/CreatePOAMentee';
import DisplayMyMentor from './components/DisplayMyMentor';
import MyPOAMentee from './components/MyPOAMentee';
import Navbarmenu from './components/menu/Navbarmenu';
import NavbarLogin from './components/menu/NavbarLogin';
import DisplayMyMentees from './components/DisplayMyMentees';
import AddFreeHours from './components/AddFreeHours';
import CreatePOAMentor from './components/CreatePOAMentor';
import MyPOAMentor from './components/MyPOAMentor';
import OrganiseGroupSession from './components/OrganiseGroupSession';
import ToggleAdmin from './components/ToggleAdmin';
import ToggleActive from './components/ToggleActive';
import EditBusinessAreasTopics from './components/EditBusinessAreasTopics';
import SetSessionThreshold from './components/SetSessionThreshold';
import ViewAllApplicationFeedback from './components/ViewAllApplicationFeedback';
import BecomeMentorRequest from './components/BecomeMentorRequest';
import BusinessAreaChangeRequest from './components/BusinessAreaChangeRequest';
import MyDetails from './components/MyDetails';
import GiveFeedback from './components/GiveFeedback';
import MyFeedback from './components/MyFeedback';
import EditDetails from './components/EditDetails';
import Signin from './components/Signin';
import CreateAccount from './components/CreateAccount';
import CalendarD from './components/CalendarD';
import Home from './components/Home';
import FeedbackForm from './components/FeedBackComponents/FeedbackForm'
import JoinGroupMeeting from './components/JoinGroupMeeting';

let state = {currentPath:window.location.pathname};

function App() {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div>
      <Router basename="/">

      <div  onClick={refreshPage}>
      { (state.currentPath=="/Signin" || state.currentPath=="/CreateAccount") &&<NavbarLogin />}
      { (state.currentPath=="/BookMentoringMeeting" || state.currentPath=="/CreatePOAMentee" || state.currentPath=="/DisplayMyMentor" || state.currentPath=="/MyPOAMentee" || state.currentPath=="/MyPOAMentor" || state.currentPath=="/DisplayMyMentees"
      || state.currentPath=="/AddFreeHours" || state.currentPath=="/CreatePOAMentor" || state.currentPath=="/OrganiseGroupSession" || state.currentPath=="/ToggleAdmin" || state.currentPath=="/ToggleActive" || state.currentPath=="/EditBusinessAreasTopics" || state.currentPath=="/BecomeMentorRequests" || state.currentPath=="/BusinessAreaChangeRequests"
      || state.currentPath=="/SetSessionThreshold"
      || state.currentPath=="/ViewAllApplicationFeedback"
      || state.currentPath=="/MyDetails"
      || state.currentPath=="/GiveFeedback"
      || state.currentPath=="/MyFeedback" || state.currentPath=="/EditDetails" || state.currentPath=="/Calendar" || state.currentPath=="/JoinGroupMeeting") && <Navbarmenu />}
      </div>
        
        <Switch>
          <Route path="/BookMentoringMeeting" component={BookMentoringMeeting}/>
          <Route path="/CreatePOAMentee" component={CreatePOAMentee}/>
          <Route path="/DisplayMyMentor" component={DisplayMyMentor}/>
          <Route path="/MyPOAMentee" component={MyPOAMentee}/>
          <Route path="/MyPOAMentor" component={MyPOAMentor}/>
          <Route path="/DisplayMyMentees" component={DisplayMyMentees}/>
          <Route path="/AddFreeHours" component={AddFreeHours}/>
          <Route path="/CreatePOAMentor" component={CreatePOAMentor}/>
          <Route path="/OrganiseGroupSession" component={OrganiseGroupSession}/>
          <Route path="/ToggleAdmin" component={ToggleAdmin}/>
          <Route path="/ToggleActive" component={ToggleActive}/>
          <Route path="/EditBusinessAreasTopics" component={EditBusinessAreasTopics}/>
          <Route path="/SetSessionThreshold" component={SetSessionThreshold}/>
          <Route path="/ViewAllApplicationFeedback" component={ViewAllApplicationFeedback}/>
          <Route path="/BecomeMentorRequests" component={BecomeMentorRequest}/>
          <Route path="/BusinessAreaChangeRequests" component={BusinessAreaChangeRequest}/>
          <Route path="/MyDetails" component={MyDetails}/>
          <Route path="/GiveFeedback" component={GiveFeedback}/>
          <Route path="/MyFeedback" component={MyFeedback}/>
          <Route path="/EditDetails" component={EditDetails}/>
          <Route path="/Signin" component={Signin}/>
          <Route path="/CreateAccount" component={CreateAccount}/>
          <Route path="/Calendar" component={CalendarD}/>
          <Route path="/JoinGroupMeeting" component={JoinGroupMeeting}/>
        </Switch>
        
      </Router>

    </div >
  );
}

export default App;
