import React from "react"
import styles from "./styles.module.css"

interface Props {
    ImageComponent: React.FC
    onClick: () => void
}

export default ({ ImageComponent, onClick }: Props) => {
    return (
        <div className={`${styles.component} reduceOpacityOnHover`} {...{ onClick }}>
            <ImageComponent />
        </div>
    )
}
