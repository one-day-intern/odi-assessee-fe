interface CompanySignupStoreState {
    data: CompanySignupStoreElements;
    errors: CompanySignupStoreElements;
    setValue: (name: string, value: string) => void;
    setError: (name: string, value: string) => void;
}

interface CompanySignupStoreElements {
    email: string;
    company_name: string;
    company_address: string;
    company_description: string;
    password: string;
    confirmed_password: string;
}