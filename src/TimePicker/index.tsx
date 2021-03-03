import styles from "./styles.module.css"
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory()

    const options = [3, 5, 10, 25, 60]
        .map(number => String(number))
        .map(minutes => ({
            label: minutes, 
            onClick: () => history.push(`/${minutes}`)
        }))

    return (
        <div className={styles.component} style={{ height: window.innerHeight }}>
            {options.map(Option)}
        </div>
    )
}

const Option = ({ label, onClick }: { label: string, onClick: () => void }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }} {...{ onClick }}>
            <p style={{fontSize: 32, fontWeight: 700, padding: "18px 0px"}}>{label}</p>
        </div>
    )
}
