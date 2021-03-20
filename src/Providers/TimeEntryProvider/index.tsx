import React, { useCallback, useEffect, useState } from "react";

export interface TimeEntry {
    minutes: number,
    incrementSeconds?: number,
    delaySeconds?: number,
}

const initialTimeEntries: TimeEntry[] = [
    {
        minutes: 1,
        incrementSeconds: 1,

    },
    {
        minutes: 2,
        incrementSeconds: 1,
    },
    {
        minutes: 3,
        incrementSeconds: 2,
    },
    {
        minutes: 5
    },
    {
        minutes: 10
    },
    {
        minutes: 15,
        incrementSeconds: 2,
    },
    {
        minutes: 25
    },
]

interface ContextType {
    timeEntries: TimeEntry[]
    addTimeEntry: (timeEntry: TimeEntry) => void
}

export const TimeEntryContext = React.createContext<ContextType>({} as ContextType);

export default ({ children }: { children?: React.ReactNode }) => {
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(() => {
        const cachedItems = localStorage.getItem("timeEntries")
        if (!cachedItems) {
            return initialTimeEntries
        }

        const parsedItems = JSON.parse(cachedItems)

        if (!parsedItems) {
            return initialTimeEntries
        }

        return parsedItems
    })

    useEffect(() => {
        localStorage.setItem("timeEntries", JSON.stringify(timeEntries))
    }, [timeEntries])

    const addTimeEntry = useCallback(
        (timeEntry: TimeEntry) => {
            setTimeEntries([...timeEntries, timeEntry])
        },
        [timeEntries],
    )

    return (
        <TimeEntryContext.Provider value={{ timeEntries, addTimeEntry }}>
            {children}
        </TimeEntryContext.Provider>
    )
}
