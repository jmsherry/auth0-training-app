import React from "react";
import CarForm from "../../components/forms/CarForm";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const addCar = async (data) => {
  try {
    const response = await fetch("/api/v1/cars", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw response;
    const cars = await response.json();
    console.log(cars);
  } catch (err) {
    alert(err.message || err.statusText);
    console.log(err);
  }
};

const AddCar = () => {
  const { isLoading, error, user } = useUser();
  return (
    <>
      <header>
        <nav className={styles.nav}>
          {user ? (
            <Link href="/api/auth/logout">Log out</Link>
          ) : (
            <Link href="/api/auth/login">Log in</Link>
          )}

          <Link href="/private">Go to private page</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/cars">Cars</Link>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.description}>
          <h1 className={styles.heading}>Add a Car</h1>
          <CarForm submitHandler={addCar} />
        </section>
      </main>
    </>
  );
};

export default AddCar;
