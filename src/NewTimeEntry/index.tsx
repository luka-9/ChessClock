import styles from "./styles.module.css"
import { useHistory } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import { TimeEntryContext } from "Providers/TimeEntryProvider";
import TimeEntryInput, { TimeEntryInputProps } from "TimeEntryInput";
import { withIndexKey } from "helpers";

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
            minValue: 1,
            maxValue: 999,
            autoFocus: true
        },
        {
            name: "Increment (sec)",
            value: incrementSeconds,
            onChange: setIncrementSeconds,
            maxValue: 10
        },
        {
            name: "Delay (sec)",
            value: delaySeconds,
            onChange: setDelaySeconds,
            maxValue: 10
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
        <form className={styles.component} style={{ height: window.innerHeight }} onSubmit={evt => {
            evt.preventDefault()
            onSave()
        }}>
            <div style={{ display: "flex", flexDirection: "column", overflowY: "scroll", paddingTop: 50 }}>
                {
                    timeEntryInputs.map(TimeEntryInput).map(withIndexKey)
                }
            </div>
            <button style={{zIndex: 1}}>SAVE</button>
        </form>
    )
}

