import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
    const { days } = props;
    const parsedDays = days.map(day => 
        <DayListItem   
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}
        days={days} 
        day={props.day}
        />)

    return (
        <ul>
           {parsedDays}
        </ul>
      );
}