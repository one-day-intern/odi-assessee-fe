interface MultistepForm {  
    id: number;
    name: string;
    description: string;
    reactElement: ReactNode;
    isSelected: boolean;
    disabled : boolean;
    onClick? : () => void;
}