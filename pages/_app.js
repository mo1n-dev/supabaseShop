import 'tailwindcss/tailwind.css'
import Navbar from '../components/navbar'
import React, { useState,useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <>
<Component {...pageProps} />
      </>
    );
  }
}
