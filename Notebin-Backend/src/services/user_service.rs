
use sqlx::PgPool;
use crate::models::User;
use anyhow::{Result, anyhow};

pub async fn create_user(
    pool: &PgPool,
    username: &str,
    password: &str,
) -> Result<User> {
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
