import React from "react";
import "./styles.scss";

export default function Show(props) {
  let selectedInterviewerName;
    for (let interviewers in props.interviewerList){
      if (props.interviewerList[interviewers].id === props.interviewer){
        selectedInterviewerName = props.interviewerList[interviewers].name
      }
    }
    return (
        <main className="appointment__card appointment__card--show">
  <section className="appointment__card-left">
    <h2 className="text--regular">{props.student}</h2>
    <section className="interviewer">
      <h4 className="text--light">Interviewer</h4>
      <h3 className="text--regular">{selectedInterviewerName}</h3>
    </section>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <img
        className="appointment__actions-button"
        src="images/edit.png"
        alt="Edit"
        onClick={props.onEdit}
      />
      <img
        className="appointment__actions-button"
        src="images/trash.png"
        alt="Delete"
        onClick={props.onDelete}
      />
    </section>
  </section>
</main>
    )
}
