import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Saving from "./Saving";
import Deleting from "./Deleting";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

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
    return (
    <article className="appointment">
        <Header 
        time={props.time}
        />
        {mode === SAVING && <Saving/>}
       {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
       {mode === CREATE && <Form interviewers={props.interviewers} onCancel = {back} onSave = {save}/>}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewerList = {props.interviewers}
    interviewer={props.interview.interviewer}
  />
)}
    </article>
    )
}