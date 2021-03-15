import TimeEntryProvider from "./TimeEntryProvider"

export default ({ children }: { children?: React.ReactNode }) => {
    return (
        <TimeEntryProvider>
            {children}
        </TimeEntryProvider>
    )
}
