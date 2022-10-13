import { useContext } from "react";
import { AssesseeSignupStepContext } from "./AssesseeSignupStepProvider";

const useAssesseeSignupStepContext = () => useContext(AssesseeSignupStepContext);

export { useAssesseeSignupStepContext }