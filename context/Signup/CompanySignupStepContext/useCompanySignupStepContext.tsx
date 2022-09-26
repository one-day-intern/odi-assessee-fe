import { useContext } from "react";
import { CompanySignupStepContext } from "./CompanySignupStepProvider";

const useCompanySignupStepContext = () => useContext(CompanySignupStepContext);

export { useCompanySignupStepContext }