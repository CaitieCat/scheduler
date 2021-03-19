import React, { useState, useEffect } from "react";
import axios from "axios"
import DayList from "./DayList";
import Appointment from "./Appointments"
import { getAppointmentsForDay, getInterview } from "../helpers/selectors.js"
import "components/Application.scss";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  
  useEffect(() => {
    Promise.all([axios.get("http://localhost:8001/api/days"),
     axios.get("http://localhost:8001/api/appointments"), 
     axios.get("http://localhost:8001/api/interviewers")])
     .then(response => 
      setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
      )
    }, [])

    
    // const interview = getInterview(state, )
    // const schedule = appointments.map((appointment) => {
    //   const interview = getInterview(state, appointment.interview);
    
    //   return (
    //     <Appointment
    //       key={appointment.id}
    //       id={appointment.id}
    //       time={appointment.time}
    //       interview={interview}
    //     />
    //   );
    // });
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
        {...appointment}/>
        )}
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
