import { useState, useEffect } from "react";
import axios from "axios"

export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
      })
      const setDay = day => setState({ ...state, day });

      useEffect(() => {
        Promise.all([axios.get("http://localhost:8001/api/days"),
         axios.get("http://localhost:8001/api/appointments"), 
         axios.get("http://localhost:8001/api/interviewers")])
         .then((response) => 
            //console.log("Response:...", response)
           // console.log(response)
          setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }))
          )
        }, [])
        

        //function to calculate spots remaining 
        function updateSpots(day, updatedSpots){
            for(const each in state.days){
                if(each.name === day){
                   
                }
            }
        }
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
          return Promise.all([axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})])
          .then(response => 
            setState({
              ...state,
              appointments
            })
           ).catch(e =>
            console.log("Error message:", e)
           )
        }
        //function to edit appointments 
        function editInterview(id, interview){
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
          return Promise.all([axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})])
          .then(response => 
            setState({
              ...state,
              appointments
            })
           ).catch(e =>
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
          return Promise.all([axios.delete(`http://localhost:8001/api/appointments/${id}`)])
          .then(response => 
            setState({
              ...state,
              appointments
            })
           ).catch(e =>
            console.log("Error message:", e)
           )
        }
    return {state, setDay, bookInterview, editInterview, deleteInterview}
}
