import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    function transition(newMode, replace = false) {
        if(replace){
            setMode(newMode);
            history.splice(1, history.length-1, newMode);
            setHistory(history);
        } else {
            setMode(newMode);
            setHistory([...history, newMode]);
        }
    } 
    function back() {
        const backHistory = history.slice(0, history.length-1)
        if(backHistory.length > 1){
            setMode(backHistory[backHistory.length-1]);
            setHistory(backHistory);
        } else if (backHistory.length === 1){
            setMode(backHistory[backHistory.length-1]);
            setHistory(backHistory);
        }
     }
    return { mode, transition, back };
  }
