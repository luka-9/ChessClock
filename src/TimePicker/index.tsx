import styles from "./styles.module.css"
import { useHistory } from "react-router-dom";
import TimeEntry from "TimeEntry";

export default () => {
    const history = useHistory()

    const timeEntries = [
        3, 
        5, 
        10, 
        25, 
        60
    ]
        .map(number => String(number))
        .map(minutes => ({
            label: minutes, 
            onClick: () => history.push(`/${minutes}`)
        }))

    return (
        <div className={styles.component} style={{ height: window.innerHeight }}>
            <div style={{ display: "flex", flexDirection: "column", overflowY: "scroll", paddingBottom: 0 }}>
                <h2 className={styles.title}>Pick Your Timer</h2>
                {timeEntries.map(TimeEntry)}
            </div>
            <button style={{zIndex: 1}}>ADD</button>
        </div>
    )
}
