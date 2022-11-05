import { useContext } from "react";
import { CompanySignupStoreContext } from "./CompanySignupStoreProvider";

const useCompanySignupStoreContext = () => useContext(CompanySignupStoreContext);

export { useCompanySignupStoreContext }