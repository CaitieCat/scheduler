import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

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
      transition("SHOW");
    }
    //function to edit interview
    function editing(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition("SAVING");
        props.editInterview(props.id, interview);
        transition("SHOW");
    }
    //function to delete interview
    function deleting() {
        transition("DELETING");
        props.deleteInterview(props.id);
        transition("CONFIRM");
        transition("EMPTY");
    }
    return (
    <article className="appointment">
        <Header 
        time={props.time}
        />

        {mode === CONFIRM && <Confirm  message="Delete the appointment?"/>}
        {mode === SAVING && <Status message="Saving"/>}
        {mode === DELETING && <Status message="Deleting"/>}
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