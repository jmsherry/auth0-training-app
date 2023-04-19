import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

import { callPrivate, callPublic, callRBAC } from "../utils/api";

const API_IDENTIFIER = "http://auth0-training-app-api/rbac/user_authorization"

export default function Home() {
  const { isLoading, error, user } = useUser();
  const willWork = user && user[API_IDENTIFIER] && user[API_IDENTIFIER].permissions?.includes?.("access:the:special")
  const [publicResponse, setPublicResponse] = useState(null);
  const [privateResponse, setPrivateResponse] = useState(null);
  const [RBACResponse, setRBACResponse] = useState(null);

  useEffect(() => {
    (async () => {
      const p = await callPublic();
      setPublicResponse(p.message);

      const pr = await callPrivate();
      console.log(pr);
      setPrivateResponse(pr.message);

      const rb = await callRBAC();
      setRBACResponse(rb.message);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav className={styles.nav}>
          <Link href="/api/auth/login">Log in</Link>
          <Link href="/api/auth/logout">Log out</Link>
          <Link href="/private">Go to private page</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/cars">Cars</Link>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.description}>
          <h1 className={styles.heading}>Homepage</h1>
          <p>Public API Response: {publicResponse}</p>
          <p>Private API Response: {privateResponse}</p>
          <p>
            RBAC API Response (
            {willWork
              ? "Should work"
              : "Will fail"}
            ): {RBACResponse}
          </p>
        </section>
        <section className={styles.description}>
          {isLoading && <p>Loading</p>}
          {error && <p>{error.message}</p>}
          {user && (
            <div>
              <code>
                <pre>{JSON.stringify(user, null, "\t")}</pre>
              </code>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
