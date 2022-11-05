import { useState } from "react";

const SIGNUP_CHOICES: SignupChoiceItem[] = [
  {
    id: 1,
    mainAction: "I want to assess potential employees",
    description: "I am an employer wanting to assess talents",
    isSelected: true,
  },
  {
    id: 2,
    mainAction: "I want to be assessed",
    description: "I am an employee looking to be assessed by a company",
    isSelected: false,
  },
];

const useSetSignupChoice = () => {

    // list of signup options
    const [signupChoices, setSignupChoices] =
      useState<SignupChoiceItem[]>(SIGNUP_CHOICES);

    // the id of the selected sign up option
    const [selectedChoiceId, setSelectedChoiceId] = useState<number>(1);
  
    // function to handle selecting a choice
    const selectChoice = (id: number) => {
      setSelectedChoiceId(id);
      setSignupChoices((prevState) =>
        prevState.map((choice) => {
          const newChoice = choice;
  
          newChoice.isSelected = newChoice.id === id ? true : false;
  
          return newChoice;
        })
      );
    };
  
    return { selectChoice, signupChoices, selectedChoiceId };
  };
  
  export { useSetSignupChoice }