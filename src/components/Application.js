import React, { useState, useEffect } from "react";
import axios from "axios"
import DayList from "./DayList";
import Appointment from "./Appointments/Index"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors.js"
import "components/Application.scss";


export default function Application(props) {
  // set the state initially
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({ ...state, day });

  // get the daily interviewers and appointments
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // make axios requests to grab data for days, interviews, and interviewers
  useEffect(() => {
    Promise.all([axios.get("http://localhost:8001/api/days"),
     axios.get("http://localhost:8001/api/appointments"), 
     axios.get("http://localhost:8001/api/interviewers")])
     .then(response => 
      setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
      )
    }, [])

    console.log(state);
    // function to book interviews
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
      Promise.all([axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})])
      .then(response => 
        setState({
          ...state,
          appointments
        })
       ) .catch(e =>
        console.log("Error message:", e)
       )
    }
    //function to delete appointments
    function deleteInterview(id){
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
      Promise.all([axios.delete(`http://localhost:8001/api/appointments/${id}`)])
      .then(response => 
        setState({
          ...state,
          appointments
        })
       ) .catch(e =>
        console.log("Error message:", e)
       )

    }
  return (
    <main className="layout">
      <section className="sidebar">
                <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => 
        <Appointment 
        key={appointment.id} 
        interviewers = {dailyInterviewers}
        bookInterview = {bookInterview}
        deleteInterview = {deleteInterview}
        {...appointment}/>
        )}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
