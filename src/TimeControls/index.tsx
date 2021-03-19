import TimeControlButton from "TimeControlButton"
import styles from "./styles.module.css"
import { ReactComponent as ResetSVG } from "./reset.svg"
import { ReactComponent as PauseSVG } from "./pause.svg"

interface Props {
    onResetClick: () => void
    onPauseClick: () => void
}

export default ({ onResetClick, onPauseClick }: Props) => {
    return (
        <div className={styles.component}>
            <div className={styles.grid}>
                <TimeControlButton ImageComponent={ResetSVG} onClick={onResetClick} />
                <TimeControlButton ImageComponent={PauseSVG} onClick={onPauseClick} />
            </div>
        </div>
    )
}
