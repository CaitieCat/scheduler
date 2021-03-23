import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETING";
const ERROR_SAVING= "ERROR_SAVING";

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );

        // function to save an interview
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition("SAVING");
      props.bookInterview(props.id, interview);
      //transition(interviewSaved)
    }
    //function to delete interview
    function deleting() {
        transition("CONFIRM");
        props.deleteInterview(props.id)
        //transition("EMPTY")       
    }
    return (
    <article className="appointment">
        <Header 
        time={props.time}
        />

        {mode === CONFIRM && <Confirm  message="Delete the appointment?" onConfirm={() => transition("DELETING")} onCancel = {back}/>}
        {mode === SAVING && <Status message="Saving"/>}
        {mode === DELETING && <Status message="Deleting"/>}
        {mode === ERROR_DELETE && <Error message="Could not delete appointment"/>}
        {mode === ERROR_SAVING && <Error message="Could not save appointment"/>}
       {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
       {mode === CREATE && <Form interviewers={props.interviewers} onCancel = {back} onSave = {save}/>}
        {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer} onCancel = {back} onSave = {save}/> }
{mode === SHOW && (
      <Show
    student={props.interview.student}
    interviewerList = {props.interviewers}
    interviewer={props.interview.interviewer}
    onDelete = {deleting}
    onEdit = {() => transition("EDIT")}
  />
)}
    </article>
    )
}