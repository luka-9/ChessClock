import styles from "./styles.module.css"

export default ({ label, onClick }: { label: string, onClick: () => void }) => {
    return (
        <div className={styles.component} {...{ onClick }}>
            <h3 style={{ padding: "26px 0px" }}>{label}</h3>
        </div>
    )
}
