import { TimeEntry } from "Providers/TimeEntryProvider"
import styles from "./styles.module.css"

interface Props extends TimeEntry {
    onClick: () => void
}

export default ({ minutes, delaySeconds, incrementSeconds, onClick }: Props) => {
    return (
        <div className={styles.component} {...{ onClick }}>
            <h3 style={{ padding: "26px 0px" }}>{`
                ${minutes}
                ${incrementSeconds ? ` | ${incrementSeconds}` : ""}
                ${delaySeconds ? ` (delay: ${delaySeconds})` : ""}
            `}</h3>
        </div>
    )
}
