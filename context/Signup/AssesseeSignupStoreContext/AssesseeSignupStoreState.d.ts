interface AssesseeSignupStoreState {
    data: AssesseeSignupStoreElements;
    errors: AssesseeSignupStoreElements;
    setValue: (name: string, value: string) => void;
    setError: (name: string, value: string) => void;
    postResult: () => void;
    loadingStatus?: "loading" | "fetched" | "initial" | "error"
}

interface AssesseeSignupStoreElements {
    email: string;
    password: string;
    confirmed_password: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    phone_number: string;
}