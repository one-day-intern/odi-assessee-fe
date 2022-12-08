import React, { useEffect } from 'react'
import { useAuthContext } from '@context/Authentication';
import { useRouter } from 'next/router';


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
      let accessToken = getCookie('accessToken');
      let refreshToken = getCookie('refreshToken');
      localStorage.setItem('accessToken', accessToken!);
      localStorage.setItem('refreshToken', refreshToken!);
      router.push('/dashboard');
    }, []);  

  return (
    <div></div>
  )
}
