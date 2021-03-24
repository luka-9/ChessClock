import styles from "./styles.module.css"

export interface TimeEntryInputProps {
    name: string,
    value: number,
    minValue?: number,
    maxValue: number,
    onChange: (newValue: number) => void,
    autoFocus?: boolean
}

export default ({ name, value, minValue, maxValue, onChange, autoFocus }: TimeEntryInputProps) => (
    <div className={styles.component}>
        <h4>{name}</h4>
        <input 
            type="number"
            pattern="\d*"
            min={minValue || 0}
            onChange={evt => {
                const number = parseInt(evt.target.value) || 0
                if (number > maxValue) {
                    return;
                }
                
                onChange(number)
            }}
            value={String(value)}   
            {...{ autoFocus }}
        />
    </div>
)
