import styles from "./styles.module.css"
import { useHistory } from "react-router-dom";
import TimeEntry from "TimeEntry";
import { useContext } from "react";
import { TimeEntryContext } from "Providers/TimeEntryProvider";

export default () => {
    const { push } = useHistory()

    const { timeEntries } = useContext(TimeEntryContext)

    return (
        <div className={styles.component} style={{ height: window.innerHeight }}>
            <div style={{ display: "flex", flexDirection: "column", overflowY: "scroll", paddingBottom: 0 }}>
                <h2 className={styles.title}>Pick Your Timer</h2>
                {
                    timeEntries
                        .map((timeEntry) => {
                            const { minutes, delaySeconds, incrementSeconds } = timeEntry
                            
                            const queryString = new URLSearchParams({ 
                                ...delaySeconds && { delay: String(delaySeconds) },
                                ...incrementSeconds && { increment: String(incrementSeconds) },
                            }).toString()

                            return ({
                                onClick: () => push(`/${minutes}${queryString ? `?${queryString}` : ''}`),
                                ...timeEntry
                            })
                        })
                        .map(TimeEntry)
                }
            </div>
            <button style={{zIndex: 1}}>ADD</button>
        </div>
    )
}
