import { useCallback, useEffect, useMemo, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
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
            label: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
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
            {models.map(Timer)}
        </div>
    )
}

const Timer = ({ label, selected, onClick, expired, flipped, disabled }: { label: string, selected?: boolean, onClick: () => void, expired: boolean, flipped?: boolean, disabled?: boolean }) => {
    const slamSound = useMemo(() => {
        let audio = new Audio("slam.m4a") 
        audio.preload = "auto"
        
        return audio
    }, [])

    const onClickHandler = useCallback(
        () => {
            if (disabled) {
                return;
            }
            slamSound.play()
            onClick()
        },
        [disabled, slamSound, onClick],
    )
    return (
        <div 
            style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", ...(selected && { backgroundColor: "gold" }), ...(expired && { backgroundColor: "red" }), ...(flipped && { transform: "rotate(180deg)" }) }} 
            onMouseDown={onClickHandler}
            onTouchStart={event => {
                const statusBarHeight = 8
                
                const isSwipeBackAction = event.touches[0].clientX < 30
                const isBottomSwipeAction = event.touches[0].clientY > window.innerHeight - statusBarHeight - 30

                
                if (isSwipeBackAction || isBottomSwipeAction) {
                    return;
                }

                onClickHandler()
            }}
        >
            <p style={{fontSize: 120, fontWeight: 500, letterSpacing: -3}}>{label}</p>
        </div>
    )
}
