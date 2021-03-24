import styles from "./styles.module.css"
import { useHistory } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { TimeEntryContext } from "Providers/TimeEntryProvider";
import TimeEntryInput, { TimeEntryInputProps } from "TimeEntryInput";

export default () => {
    const { goBack } = useHistory()

    const { addTimeEntry } = useContext(TimeEntryContext)
    
    const [minutes, setMinutes] = useState(0)
    const [incrementSeconds, setIncrementSeconds] = useState(0)
    const [delaySeconds, setDelaySeconds] = useState(0)

    const timeEntryInputs: TimeEntryInputProps[] = [
        {
            name: "Time (min)",
            value: minutes,
            onChange: setMinutes,
            autoFocus: true
        },
        {
            name: "Increment (sec)",
            value: incrementSeconds,
            onChange: setIncrementSeconds
        },
        {
            name: "Delay (sec)",
            value: delaySeconds,
            onChange: setDelaySeconds
        },
    ]

    const onSave = useCallback(
        () => {
            addTimeEntry({
                minutes,
                ...(incrementSeconds && { incrementSeconds }),
                ...(delaySeconds && { delaySeconds }),
            })
            goBack()
        },
        [addTimeEntry, goBack, minutes, incrementSeconds, delaySeconds],
    )

    return (
        <div className={styles.component} style={{ height: window.innerHeight }}>
            <div style={{ display: "flex", flexDirection: "column", overflowY: "scroll", paddingTop: 50 }}>
                {
                    timeEntryInputs.map(TimeEntryInput)
                }
            </div>
            <button style={{zIndex: 1}} onClick={onSave}>SAVE</button>
        </div>
    )
}

