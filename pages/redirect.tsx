import React, { useEffect } from 'react'
import { useAuthContext } from '@context/Authentication';
import { useRouter } from 'next/router';


const ASSESSEE_LOGIN_URL = '/accounts/login/assessee';
export default function Redirect() {
    const router = useRouter();
    const { dispatch } = useAuthContext();

    function getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            let cookie_data = parts.pop();
            if (cookie_data != null) {
                return cookie_data.split(';').shift();
            }
        }
    }

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      let accessToken = urlParams.get('accessToken');
      let refreshToken = urlParams.get('refreshToken');
      let googleErrorMessage = urlParams.get('errorMessage');
      
      if (accessToken != null) {
        localStorage.removeItem('googleErrorMessage');
        localStorage.setItem('accessToken', accessToken!);
        localStorage.setItem('refreshToken', refreshToken!);
        router.push('/dashboard');

      } else {
        localStorage.setItem('googleErrorMessage', googleErrorMessage!);
        router.push(ASSESSEE_LOGIN_URL);
      }
      
    }, [router]);  

  return (
    <div></div>
  )
} 
