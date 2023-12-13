import { CSSProperties } from 'react'

export interface ISpinner {
    open: boolean;
    title?: string;
    titleStyle?: CSSProperties;
    color?: string;
    size?: number
}
