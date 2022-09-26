import React from 'react'
import { Button } from "@components/shared/elements/Button";
import { OdiLogo } from "@components/shared/elements/svg/OdiLogo";
import { OfficeIllustration } from "@components/shared/elements/svg/OfficeIllustration";
import { Backdrop } from "@components/shared/layouts/Backdrop";

import { useSetSignupChoice } from "@hooks/Signup/useSetSignupChoices";
import Link from "next/link";

import { SignupChoice } from "./SignupChoice";
import styles from "./Signup.module.css";
import { SigninNotice } from '@components/shared/forms/SigninNotice';

const Signup = () => {
  const { signupChoices, selectedChoiceId, selectChoice } =
    useSetSignupChoice();

  const selectedChoiceLst = ["company", "assessee"];

  return (
    <Backdrop>
      <div className={styles["window__illustration"]}>
        <OfficeIllustration />
      </div>
      <div className={styles["window__container"]}>
        <OdiLogo />
        <h2 className={styles["window__text--heading"]}>Sign up to ODI</h2>

        <div>
          {signupChoices.map((choice) => (
            <SignupChoice
              key={choice.id}
              {...choice}
              onClick={() => selectChoice(choice.id)}
            />
          ))}

          <Link href={`/accounts/signup/${selectedChoiceLst[selectedChoiceId - 1]}`}>
            <Button variant="primary">
              <h2>Next</h2>
            </Button>
          </Link>
        </div>

        <SigninNotice/>
      </div>
    </Backdrop>
  );
}

export { Signup }