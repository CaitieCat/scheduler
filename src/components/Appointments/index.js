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
      props
        .bookInterview(props.id, interview)
            .then(()=> transition("SHOW"))
            .catch((error)=>transition("ERROR_SAVING", true))
    }
    //function to delete interview
    function deleting(event) {
        transition("DELETING")
        props
            .deleteInterview(props.id)
                .then(()=> transition("EMPTY"))
                .catch((error)=>transition("ERROR_DELETING", true))
    }
    return (
    <article className="appointment" data-testid="appointment">
        <Header 
        time={props.time}
        />

        {mode === CONFIRM && <Confirm  message="Delete the appointment?" onConfirm={deleting} onCancel = {back}/>}
        {mode === SAVING && <Status message="Saving"/>}
        {mode === DELETING && <Status message="Deleting"/>}
        {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClick = {back}/>}
        {mode === ERROR_SAVING && <Error message="Could not save appointment" onClick = {back}/>}
       {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
       {mode === CREATE && <Form interviewers={props.interviewers} onCancel = {back} onSave = {save}/>}
        {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer} onCancel = {back} onSave = {save}/> }
{mode === SHOW && (
      <Show
    student={props.interview.student}
    interviewerList = {props.interviewers}
    interviewer={props.interview.interviewer}
    onDelete = {() => transition("CONFIRM")}
    onEdit = {() => transition("EDIT")}
  />
)}
    </article>
    )
}