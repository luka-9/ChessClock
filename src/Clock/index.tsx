import TimeControls from "TimeControls"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"
import Timer from "Timer"
import styles from "./styles.module.css"

interface Props {
    minutes: string
}

export default () => {
    const { replace } = useHistory()
    const { search } = useLocation()
    const { increment: incrementSeconds, delay: delaySeconds } = useMemo(() => {
        let result: Record<string, number | undefined> = {}

        new URLSearchParams(search).forEach((value, key) => {
            const intValue = parseInt(value)
            
            if (!isNaN(intValue)) {
                result[key] = intValue
            }

        })
        return result

    }, [search])

    const params = useParams<Props>()
    const initialMinutes = parseInt(params.minutes)

    if (isNaN(initialMinutes) || initialMinutes < 1) {
        replace("/")
    }
    
    const initialSeconds = initialMinutes * 60
    const initialMiliseconds = initialSeconds * 1000;
    
    const [selectedTimerIndex, setSelectedTimerIndex] = useState<number>()
    const [milisecondsLeft, setMilisecondsLeft] = useState([initialMiliseconds, initialMiliseconds])
    const [moveCount, setMoveCount] = useState([0, 0])
    
    const models = useMemo(() => milisecondsLeft.map((_milisecondsLeft, index) => {
        const time = new Date(_milisecondsLeft)
        const hours = time.getUTCHours()
        const minutes = hours * 60 + time.getUTCMinutes()
        const seconds = time.getUTCSeconds()

        const expired = _milisecondsLeft === 0

        return ({
            minutes,
            seconds,
            onClick: () => {
                if (expired) {
                    return;
                }
                
                if (selectedTimerIndex !== undefined) {
                    const deselectedTimerIndex = index

                    let mutableMoveCount = moveCount;
                    mutableMoveCount.splice(deselectedTimerIndex, 1, (moveCount[deselectedTimerIndex] || 0) + 1)
                    setMoveCount([...moveCount])

                    if (incrementSeconds) {
                        const remainingMiliseconds = milisecondsLeft[deselectedTimerIndex] + incrementSeconds * 1000

                        let mutableMiliseconds = milisecondsLeft;
                        mutableMiliseconds.splice(deselectedTimerIndex, 1, remainingMiliseconds)
                        setMilisecondsLeft([...mutableMiliseconds])
                    }
                }

                setSelectedTimerIndex((index + 1) % 2)
            },
            selected: index === selectedTimerIndex,
            expired,
            flipped: index === 0,
            disabled: selectedTimerIndex !== undefined && selectedTimerIndex !== index || expired,
            moveCount: moveCount[index]
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

    const resetTimer = useCallback(
        () => {
            setMilisecondsLeft([initialMiliseconds, initialMiliseconds])
            setSelectedTimerIndex(undefined)
            setMoveCount([0, 0])
        },
        [],
    )

    const pauseTimer = useCallback(
        () => {
            setSelectedTimerIndex(undefined)
        },
        [],
    )

    return (
        <div className={styles.component} style={{ height: window.innerHeight }}>
            {models.map(Timer).reduce((previous, current) => (
                <React.Fragment>
                    {previous}
                    <hr/>
                    {current}
                </React.Fragment>
            ))}
            {selectedTimerIndex !== undefined && <TimeControls onResetClick={resetTimer} onPauseClick={pauseTimer} />}
        </div>
    )
}
