
use sqlx::PgPool;
use crate::models::User;
use anyhow::{Result, anyhow};

pub async fn create_user(
    pool: &PgPool,
    username: &str,
    password: &str,
) -> Result<User> {
    if username.trim().is_empty() {
        return Err(anyhow!("Username cannot be empty"));
    }
    if password.trim().is_empty() {
        return Err(anyhow!("Password cannot be empty"));
    }

    let user = sqlx::query_as!(
        User,
        r#"
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING id, username, password
        "#,
        username,
        password
    )
    .fetch_one(pool)
    .await?;

    Ok(user)
}


pub async fn authenticate_user(
    pool: &PgPool,
    username: &str,
    password: &str,
) -> Result<User> {
    let user = sqlx::query_as!(
        User,
        "SELECT id, username, password FROM users WHERE username = $1",
        username
    )
    .fetch_one(pool)
    .await
    .map_err(|_| anyhow!("User not found"))?;

    if user.password == password {
        Ok(user)
    } else {
        Err(anyhow!("Invalid credentials"))
    }
}
pub async fn list_users(pool: &PgPool) -> Result<Vec<User>> {
    let rows = sqlx::query_as!(
        User,
        r#"
        SELECT id, username, password
        FROM users
        ORDER BY id
        "#
    )
    .fetch_all(pool)
    .await?;

    Ok(rows)
}
pub async fn get_user_by_id(
    pool: &PgPool,
    user_id: i32,
) -> Result<User> {
    let user = sqlx::query_as!(
        User,
        r#"
        SELECT id, username, password
        FROM users
        WHERE id = $1
        "#,
        user_id
    )
    .fetch_one(pool)
    .await
    .map_err(|_| anyhow!("User not found"))?;

    Ok(user)
}