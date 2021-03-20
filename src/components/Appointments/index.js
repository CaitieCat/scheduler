import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Saving from "./Saving";
import Deleting from "./Deleting";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
    console.log(props.interview)
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

    function deleting() {
        transition("DELETING");
        props.deleteInterview(props.id);
        transition("EMPTY");
    }
    return (
    <article className="appointment">
        <Header 
        time={props.time}
        />
        {mode === CONFIRM && <Confirm />}
        {mode === SAVING && <Saving />}
       {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
       {mode === CREATE && <Form interviewers={props.interviewers} onCancel = {back} onSave = {save}/>}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewerList = {props.interviewers}
    interviewer={props.interview.interviewer}
    onDelete = {deleting}
  />
)}
    </article>
    )
}