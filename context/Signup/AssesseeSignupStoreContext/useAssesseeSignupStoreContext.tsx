import { useContext } from "react";
import { AssesseeSignupStoreContext } from "./AssesseeSignupStoreProvider";

const useAssesseeSignupStoreContext = () => useContext(AssesseeSignupStoreContext);

export { useAssesseeSignupStoreContext }