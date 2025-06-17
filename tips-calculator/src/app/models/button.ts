export interface Button {
    label: string;
    color: string;
    value: number;
    tipMethod: (value: number) => void
}
