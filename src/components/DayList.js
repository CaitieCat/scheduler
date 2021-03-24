import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
    // console.log(props.days);
    // for (const each of props.days){
    //     console.log(each);
    //     console.log(each.spots);
    // }
    const parsedDays = props.days.map(day => 
        <DayListItem   
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}        
        />)

    return (
        <ul>
           {parsedDays}
        </ul>
      );
}