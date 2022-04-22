import React, {useState , useEffect} from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/SupabaseClient';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(supabase.auth.user());
  const handleLogOut = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/signin');
      setUser(null);
    }
  };
  useEffect(() => {
    const getProfile = () => {
      const profile = supabase.auth.user();

      if (profile) {
        setUser(profile);
      } else {
        router.push('/signin');
      }
    };

    getProfile();
  }, []);
  return (
    <div className="flex justify-between bg-sky-500/50 p-4 text-lg">
      <div>
      <Link href="/"><a>Home</a></Link>
      {!! user && (<>
      <Link href="/my-product"><a className="ml-4">My products</a></Link>
      <Link href="/create-product"><a className="ml-4">create products</a></Link> </>)}
      </div>
      {!user ? (<Link href="/signin">
          <a>Sign In</a>
        </Link>) : (<>
          <button className="" onClick={handleLogOut}>
          Log out
        </button>
        </>)}
    </div>
  );
}

export default Navbar;

