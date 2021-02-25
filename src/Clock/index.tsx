import { useEffect, useMemo, useState } from "react"
import styles from "./styles.module.css"

export const Clock = () => {
    const initialMinutes = 25
    const initialMiliseconds = initialMinutes * 60 * 1000;
    
    const [selectedTimerIndex, setSelectedTimerIndex] = useState<number>()
    const [milisecondsLeft, setMilisecondsLeft] = useState([initialMiliseconds, initialMiliseconds])
    
    const models = useMemo(() => milisecondsLeft.map((milisecondsLeft, index) => {
        const time = new Date(milisecondsLeft)
        const minutes = time.getMinutes()
        const seconds = time.getSeconds()
        return ({
            label: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
            onClick: () => setSelectedTimerIndex((index + 1) % 2),
            selected: index === selectedTimerIndex
        })   
    })
    , [milisecondsLeft, selectedTimerIndex])

    useEffect(() => {
        if (!selectedTimerIndex && selectedTimerIndex !== 0) {
            return;
        }

        const interval = setInterval(() => {
            const remainingMiliseconds = milisecondsLeft[selectedTimerIndex] - 1000
            
            let mutableMiliseconds = milisecondsLeft;
            mutableMiliseconds.splice(selectedTimerIndex, 1, remainingMiliseconds)
            setMilisecondsLeft([...mutableMiliseconds])
        }, 1000);
        
        return () => {
            clearInterval(interval)
        }
    }, [selectedTimerIndex])

    return (
        <div className={styles.component} style={{ height: window.innerHeight }}>
            {models.map(Timer)}
        </div>
    )
}

const Timer = ({ label, selected, onClick }: { label: string, selected?: boolean, onClick: () => void }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", ...(selected && { backgroundColor: "yellow" }) }} {...{ onClick }}>
            <p style={{fontSize: 100}}>{label}</p>
        </div>
    )
}
