'use client'
import Link from 'next/link';
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // Corrected import path
import { useEffect } from "react";
import styles from './Home.module.css';
import Head from 'next/head';

function Page() {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page if the user is not logged in
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout(); // Call logout from context
    router.push("/signin"); // Redirect to signin page after logout
  };

  return (
    <>
      <Head>
        <title>Welcome to SaveThePlates</title>
        <meta name="description" content="Restricted content page for logged-in users only." />
      </Head>
      <main className={styles.mainContainer}>
        <div className={styles.topFixedNav}>
          <Link href="/" legacyBehavior>
            <a className={styles.navLink}>Home</a>
          </Link>
          {user ? (
            <>
              <Link href="/profile" legacyBehavior>
                <a className={styles.navLink}>Profile</a>
              </Link>
              <Link href="/upload" legacyBehavior>
                <a className={styles.navLink}>Upload an Order</a>
              </Link>
              <Link href="/settings" legacyBehavior>
                <a className={styles.navLink}>Settings</a>
              </Link>
              <button onClick={handleLogout} className={styles.navLink}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" legacyBehavior>
                <a className={styles.navLink}>Login</a>
              </Link>
              <Link href="/signup" legacyBehavior>
                <a className={styles.navLink}>Signup</a>
              </Link>
            </>
          )}
        </div>

        {user ? (
            <>
              <div className={styles.contentSection}>
                <p>You are now viewing content exclusive to our members.</p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.contentSection}>
                <h1>Welcome to SaveThePlates</h1>
                <p>Login to get started.</p>
              </div>
            </>
          )}
      </main>
    </>
  );
}

export default Page;
