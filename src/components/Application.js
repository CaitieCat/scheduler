import React, { useState, useEffect } from "react";
import axios from "axios"
import DayList from "./DayList";
import Appointment from "./Appointments/Index"
import { getAppointmentsForDay, getInterviewersForDay} from "../helpers/selectors.js"
// import useVisualMode from "../hooks/useVisualMode";
import "components/Application.scss";
import useApplicationData from "../hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
    editInterview
  } = useApplicationData();

  // get the daily interviewers and appointments
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  //console.log(dailyAppointments);
  //const spotsRemaining = calculateSpotsRemaining(dailyAppointments);


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
        editInterview = {editInterview}
        {...appointment}/>
        )}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
