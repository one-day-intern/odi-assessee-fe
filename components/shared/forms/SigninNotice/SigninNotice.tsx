import Link from 'next/link';
import React from 'react';

import styles from "./SigninNotice.module.css"

const SigninNotice = () => {
  return (
    <p data-testid="signinNotice" className={ styles["signin-notice"] }>Already have an account? <Link href="/accounts/signin/assessee"><a className={ styles["signin-notice--link"] }>Sign in</a></Link>.</p>
  )
}

export { SigninNotice }