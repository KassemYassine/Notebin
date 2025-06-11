# Notebin

A beginner-friendly web app for writing and sharing short notes. It combines a **Rust** backend with **Axum** and **PostgreSQL**, and a **Next.js** frontend with **Tailwind CSS**. This project helps you practice full-stack development using two languages and a relational database.

## Features

* **Create & list notes**: Write notes and view all notes in the browser.
* **User registration**: Add users to identify note creators.
* **Simple UI**: Two pages (home and register) built with Next.js App Router.

## Tech Stack

* **Backend (Rust)**

  * [Axum](https://crates.io/crates/axum) – lightweight web framework
  * [SQLx](https://crates.io/crates/sqlx) (with `postgres`, `runtime-tokio-native-tls`, `macros`, `chrono`) – async DB driver
  * [Tokio](https://crates.io/crates/tokio) – async runtime
  * [dotenv](https://crates.io/crates/dotenv) & [envy](https://crates.io/crates/envy) – environment loading
  * [Anyhow](https://crates.io/crates/anyhow) – error handling

* **Frontend (Next.js)**

  * [Next.js](https://nextjs.org/) – React framework with App Router
  * [Tailwind CSS](https://tailwindcss.com/) – utility-first styling

* **Database**

  * **PostgreSQL** – relational database
  * Set up a free instance via PostgreSQL Community Edition: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

## Setup & Run

### 1. Backend

1. Install Rust from [https://rustup.rs](https://rustup.rs)
2. Install PostgreSQL and create a database:

   ```bash
   createdb notebin_db
   psql notebin_db < schema.sql
   ```
3. In `Notebin-Backend/.env`, set:

   ```dotenv
   DATABASE_URL=postgres://<user>:<pass>@localhost:5432/notebin_db
   PORT=8080
   ```
4. Run the server:

   ```bash
   cd Notebin-Backend
   cargo run
   ```

   The API listens on `http://localhost:8080`.

### 2. Frontend

1. Install Node.js (LTS) from [https://nodejs.org/](https://nodejs.org/)
2. Create `.env.local` in `Notebin-Frontend`:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```
3. Start the dev server:

   ```bash
   cd Notebin-Frontend
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.



Enjoy learning full-stack development with Rust and Next.js!
