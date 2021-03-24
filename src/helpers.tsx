import React from 'react'

export const withIndexKey = (component: JSX.Element, index: number) => <React.Fragment key={index}>{component}</React.Fragment>