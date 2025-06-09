
use std::collections::HashMap;

use axum::{
    extract::{Extension, Json},
    http::StatusCode,
    response::IntoResponse,
};
use sqlx::PgPool;

use crate::services::user_service;


pub async fn register_user(
    Extension(pool): Extension<PgPool>,
    Json(mut body): Json<HashMap<String, String>>,
) -> impl IntoResponse {
    let username = match body.remove("username") {
        Some(u) => u,
        None    => return (StatusCode::BAD_REQUEST, "username missing").into_response(),
    };
    let password = match body.remove("password") {
        Some(p) => p,
        None    => return (StatusCode::BAD_REQUEST, "password missing").into_response(),
    };

    match user_service::create_user(&pool, &username, &password).await {
        Ok(user) => (StatusCode::CREATED, Json(user)).into_response(),
        Err(e)   => {
            eprintln!("register error: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, "could not create user").into_response()
        }
    }
}


pub async fn login_user(
    Extension(pool): Extension<PgPool>,
    Json(mut body): Json<HashMap<String, String>>,
) -> impl IntoResponse {
    let username = match body.remove("username") {
        Some(u) => u,
        None    => return (StatusCode::BAD_REQUEST, "username missing").into_response(),
    };
    let password = match body.remove("password") {
        Some(p) => p,
        None    => return (StatusCode::BAD_REQUEST, "password missing").into_response(),
    };

    match user_service::authenticate_user(&pool, &username, &password).await {
        Ok(user) => (StatusCode::OK, Json(user)).into_response(),
        Err(_)   => (StatusCode::UNAUTHORIZED, "invalid credentials").into_response(),
    }
}
