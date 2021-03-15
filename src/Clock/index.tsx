import React, { useEffect, useMemo, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import Timer from "Timer"
import styles from "./styles.module.css"

interface Props {
    minutes: string
}

export default () => {
    const { replace } = useHistory()
    const params = useParams<Props>()
    const initialMinutes = parseInt(params.minutes)

    if (isNaN(initialMinutes) || initialMinutes < 1) {
        replace("/")
    }
    
    const initialSeconds = initialMinutes * 60
    const initialMiliseconds = initialSeconds * 1000;
    
    const [selectedTimerIndex, setSelectedTimerIndex] = useState<number>()
    const [milisecondsLeft, setMilisecondsLeft] = useState([initialMiliseconds, initialMiliseconds])
    
    const models = useMemo(() => milisecondsLeft.map((milisecondsLeft, index) => {
        const time = new Date(milisecondsLeft)
        const hours = time.getUTCHours()
        const minutes = hours * 60 + time.getUTCMinutes()
        const seconds = time.getUTCSeconds()

        const expired = milisecondsLeft === 0

        return ({
            minutes,
            seconds,
            onClick: () => {
                if (expired) {
                    return;
                }
                setSelectedTimerIndex((index + 1) % 2)
            },
            selected: index === selectedTimerIndex,
            expired,
            flipped: index === 0,
            disabled: selectedTimerIndex !== undefined && selectedTimerIndex !== index || expired
        })   
    })
    , [milisecondsLeft, selectedTimerIndex])

    useEffect(() => {
        if (!selectedTimerIndex && selectedTimerIndex !== 0) {
            return;
        }

        const interval = setInterval(() => {
            const remainingMiliseconds = milisecondsLeft[selectedTimerIndex] - 1000

            if (remainingMiliseconds < 0) {
                return;
            }
            
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
            {models.map(Timer).reduce((previous, current) => (
                <React.Fragment>
                    {previous}
                    <hr/>
                    {current}
                </React.Fragment>
            ))}
        </div>
    )
}
