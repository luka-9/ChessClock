import styles from "./styles.module.css"
import { useCallback, useMemo } from "react"

export default ({ label, selected, onClick, expired, flipped, disabled }: { label: string, selected?: boolean, onClick: () => void, expired: boolean, flipped?: boolean, disabled?: boolean }) => {
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
        </div>
    )
}