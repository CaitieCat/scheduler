import React from "react";
import "./styles.scss";
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import Form from "./form";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
      );
    return (
    <article className="appointment">
        <Header 
        time={props.time}
        />
       {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
       {mode === CREATE && <Form interviewers={props.interviewers} onCancel = {back}/>}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
    </article>
    )
}