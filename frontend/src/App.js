import React from 'react';
import {Redirect, BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { useLocation } from 'react-router-dom'
import './App.css';
import {PrivateRoute} from './components/Auth/PrivateRoute';
import {Role} from './components/Auth/roles';
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
import MentorRequestRespond from './components/MentorRequestRespond';
import Home from './components/Home';
import FeedbackForm from './components/FeedBackComponents/FeedbackForm'

let state = {currentPath:window.location.pathname};

function App() {
  function refreshPage() {
    window.location.reload(false);
  }

  const token = localStorage.getItem('token');
  const authenticated = (token != null) 

  return (
    <div>
      <Router basename="/">
      

      <div  onClick={refreshPage}>
      { !authenticated && (state.currentPath=="/Signin" || state.currentPath=="/CreateAccount") && <NavbarLogin />}
      { authenticated && (state.currentPath=="/BookMentoringMeeting" || state.currentPath=="/CreatePOAMentee" || state.currentPath=="/DisplayMyMentor" || state.currentPath=="/MyPOAMentee" || state.currentPath=="/MyPOAMentor" || state.currentPath=="/DisplayMyMentees" || state.currentPath == "/MentorRequestRespond"
      || state.currentPath=="/AddFreeHours" || state.currentPath=="/CreatePOAMentor" || state.currentPath=="/OrganiseGroupSession" || state.currentPath=="/ToggleAdmin" || state.currentPath=="/ToggleActive" || state.currentPath=="/EditBusinessAreasTopics" || state.currentPath=="/BecomeMentorRequests" || state.currentPath=="/BusinessAreaChangeRequests"
      || state.currentPath=="/SetSessionThreshold"
      || state.currentPath=="/ViewAllApplicationFeedback"
      || state.currentPath=="/MyDetails"
      || state.currentPath=="/GiveFeedback" || (state.currentPath=="/")
      || state.currentPath=="/MyFeedback" || state.currentPath=="/EditDetails" || state.currentPath=="/Calendar") && <Navbarmenu />}
      </div>
        
        <Switch>
          <PrivateRoute roles={[Role.Mentee]} path="/BookMentoringMeeting" component={BookMentoringMeeting}/>
          <PrivateRoute roles={[Role.Mentee]} path="/CreatePOAMentee" component={CreatePOAMentee}/>
          <PrivateRoute roles={[Role.Mentee]} path="/DisplayMyMentor" component={DisplayMyMentor}/>
          <PrivateRoute roles={[Role.Mentee]} path="/MyPOAMentee" component={MyPOAMentee}/>
          <PrivateRoute roles={[Role.Mentor]} path="/MyPOAMentor" component={MyPOAMentor}/>
          <PrivateRoute roles={[Role.Mentor]} path="/DisplayMyMentees" component={DisplayMyMentees}/>
          <PrivateRoute roles={[Role.Mentor]} path="/AddFreeHours" component={AddFreeHours}/>
          <PrivateRoute roles={[Role.Mentor]} path="/CreatePOAMentor" component={CreatePOAMentor}/>
          <PrivateRoute roles={[Role.Mentor]} path="/OrganiseGroupSession" component={OrganiseGroupSession}/>
          <PrivateRoute roles={[Role.Mentor]} path="/MentorRequestRespond" component={MentorRequestRespond}/>
          <PrivateRoute roles={[Role.Admin]} path="/ToggleAdmin" component={ToggleAdmin}/>
          <PrivateRoute roles={[Role.Admin]} path="/ToggleActive" component={ToggleActive}/>
          <PrivateRoute roles={[Role.Admin]} path="/EditBusinessAreasTopics" component={EditBusinessAreasTopics}/>
          <PrivateRoute roles={[Role.Admin]} path="/SetSessionThreshold" component={SetSessionThreshold}/>
          <PrivateRoute roles={[Role.Admin]} path="/ViewAllApplicationFeedback" component={ViewAllApplicationFeedback}/>
          <PrivateRoute roles={[Role.Admin]} path="/BecomeMentorRequests" component={BecomeMentorRequest}/>
          <PrivateRoute roles={[Role.Admin]} path="/BusinessAreaChangeRequests" component={BusinessAreaChangeRequest}/>
          <PrivateRoute path="/MyDetails" component={MyDetails}/>
          <PrivateRoute path="/GiveFeedback" component={GiveFeedback}/>
          <PrivateRoute path="/MyFeedback" component={MyFeedback}/>
          <PrivateRoute path="/EditDetails" component={EditDetails}/>
          <PrivateRoute path="/Calendar" component={CalendarD}/>
          <PrivateRoute exact path="/" component={MyDetails}/>
          <Route exact path="/">
            <Redirect to="/Signin"/>
          </Route>
          <Route path="/Signin" component={Signin}/>
          <Route path="/CreateAccount" component={CreateAccount}/>
        </Switch>
        
      </Router>

    </div >
  );
}

export default App;
