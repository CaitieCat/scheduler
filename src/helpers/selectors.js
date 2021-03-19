function getAppointmentsForDay(state, day){
    // state.days is an array of day objects
    // day object has id, name, appointments array of ids
    // and interviews array of ids and spots remaining as number
    const chosenDay = state.days.find((dayContainer) => {
        return dayContainer.name === day;
    });
    if (chosenDay) {
        const relevantAppointments = chosenDay.appointments.map((appointmentID) => state.appointments[appointmentID]);
        return relevantAppointments;

    } else {
        return [];
    }

}

function getInterview(state, interview){
    if(interview !== null){
        const selectedInterview = {
            student: interview.student,
            interviewer: state.interviewers[`${interview.interviewer}`]
        }
        return selectedInterview;
    } else {
        return null;
    }
}

module.exports = { getAppointmentsForDay, getInterview }