function getAppointmentsForDay(state, day){
    console.log(state);
    function sortDay(days) {
        const filteredDays = []
        for (const each of state.days){
            if (each["name"] === day){
                filteredDays.push(each)
            }
        }
        if (filteredDays.length > 0){
        const filteredAppointments = []
        for (const each in state.appointments){
            console.log(state.appointments[`${each}`]);
            console.log(typeof each);
            for(const apt of filteredDays[0]["appointments"]){
                console.log(typeof apt);
                if (each == apt){
                    filteredAppointments.push(state.appointments[`${each}`]);
                }
            }
        }
        console.log(filteredAppointments);
        return filteredAppointments;
        } else {
            return filteredDays;
        }
    } 
    return(sortDay(state.days));
}

module.exports = { getAppointmentsForDay }