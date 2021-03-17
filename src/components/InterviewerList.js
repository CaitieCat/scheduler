import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {
    const { interviewers } = props;
    const parsedInterviewers = interviewers.map(interviewer => 
        <InterviewerListItem
        name= {interviewer.name}
        avatar= {interviewer.avatar}
        setInterviewer = {() => props.setInterviewer(interviewer.id)}
        selected= {interviewer.id === props.interviewer}
        />
    )
    return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
    )
}