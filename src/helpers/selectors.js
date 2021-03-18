function getAppointmentsForDay(state, day){
    console.log(state);
    // state.days is an array of day objects
    // day object has id, name, appointments array of ids
    // and interviews array of ids and spots remaining as number
    const chosenDay = state.days.find((dayContainer) => {
        return dayContainer.name === day;
    });
    if (chosenDay) {
        const relevantAppointments = chosenDay.appointments.map((appointmentID) => state.appointments[appointmentID]);
        console.log('relevantAppointments:', relevantAppointments);
        return relevantAppointments;

    } else {
        console.log('no chosen day');
        return [];
    }

}

module.exports = { getAppointmentsForDay }