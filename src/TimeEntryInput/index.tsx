import styles from "./styles.module.css"

export interface TimeEntryInputProps {
    name: string,
    value: number,
    onChange: (newValue: number) => void,
    autoFocus?: boolean
}

export default ({ name, value, onChange, autoFocus }: TimeEntryInputProps) => (
    <div className={styles.component}>
        <h4>{name}</h4>
        <input 
            type="number"
            min={0}
            maxLength={3}
            pattern="[0-9]*"
            onChange={evt => {
                const number = parseInt(evt.target.value) || 0
                onChange(number)
            }}
            value={String(value)}
            {...{ autoFocus, name }}
        />
    </div>
)
