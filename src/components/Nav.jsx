"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import img from '../../public/assets/images/logo.png';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// ✅ Map provider IDs to icons
  const providerIcons = {
    google: <FcGoogle size={20} />,
    github: <FaGithub size={20} />,
  };

  const Nav = () => {

  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  console.log("User image",session);
  

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16'>

<Link href='/' className='flex items-center group'>
 
    <Image
      src={img}
      alt='Promptune Logo'
      width={50}
      height={50}
      className='object-contain w-full h-full'
    />
  
  <p className='text-xl max-sm:hidden font-extrabold mt-[-17px] ml-[-17px] bg-gradient-to-r from-[#7F5AF0] to-[#2CB67D] bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105'>
    Promptune
  </p>

</Link>


      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
           {providers &&
              Object.values(providers).map((provider) => (
              
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn flex items-center gap-2 px-4 py-2 text-sm rounded-md mx-auto mt-0 w-fit'
              >
                {providerIcons[provider.id] ?? null}
                Sign in with {provider.name}
              </button>

              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>

        {session?.user ? (

          <div className='flex'>

            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn flex items-center gap-2'
                >
                  {providerIcons[provider.id] ?? null}
                  Sign in {provider.name}
                </button>
              ))
            }
          </>
        )}
      </div>

    </nav>
  );
};

export default Nav;