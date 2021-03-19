import styles from "./styles.module.css"
import { useCallback, useMemo } from "react"

export default ({ minutes, seconds, selected, onClick, expired, flipped, disabled, moveCount }: { minutes: number, seconds: number, selected?: boolean, onClick: () => void, expired: boolean, flipped?: boolean, disabled?: boolean, moveCount: number }) => {
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

    const label = useMemo(() => `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`, [minutes, seconds])
    
    return (
        <div 
            className={styles.component}
            style={{ ...(selected && { backgroundColor: "var(--chai-latte)" }), ...(expired && { backgroundColor: "red" }), ...(flipped && { transform: "rotate(180deg)" }) }} 
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
            <h1>{label}</h1>
            {Boolean(moveCount) && <h6 className={styles.moveCount}>{moveCount}</h6>}
        </div>
    )
}