
interface InputFieldProps {
    label: string;
    placeholder? : string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    error?: string;
}