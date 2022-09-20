import { useState } from "react";

const SIGNUP_CHOICES: SignupChoiceItem[] = [];

const useSetSignupChoice = () => {

    // list of signup options
    const [signupChoices, setSignupChoices] =
      useState<SignupChoiceItem[]>(SIGNUP_CHOICES);

    // the id of the selected sign up option
    const [selectedChoiceId, setSelectedChoiceId] = useState<number>(1);
  
    // function to handle selecting a choice
    const selectChoice = (id: number) => {};
  
    return { selectChoice, signupChoices, selectedChoiceId };
  };
  
  export { useSetSignupChoice }