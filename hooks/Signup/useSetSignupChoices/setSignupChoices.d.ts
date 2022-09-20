interface SetSignupChoices {
    selectChoice: (id: number) => void;
    signupChoices: SignupChoiceItem[];
    selectedChoiceId: number;
}