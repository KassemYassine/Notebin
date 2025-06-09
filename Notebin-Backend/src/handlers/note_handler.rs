
use std::collections::HashMap;

use axum::{
    extract::{Extension, Json, Path},
    http::StatusCode,
    response::IntoResponse,
};
use sqlx::PgPool;

use crate::services::note_service;

pub async fn create_note(
    Extension(pool): Extension<PgPool>,
    Json(mut body): Json<HashMap<String, serde_json::Value>>,
) -> impl IntoResponse {
    let creator_id = match body.remove("creator_id") {
        Some(val) if val.is_i64() => val.as_i64().unwrap() as i32,
        _ => return (StatusCode::BAD_REQUEST, "creator_id missing or not an integer").into_response(),
    };
    let content = match body.remove("content") {
        Some(serde_json::Value::String(s)) => s,
        _ => return (StatusCode::BAD_REQUEST, "content missing").into_response(),
    };

    match note_service::create_note(&pool, creator_id, &content).await {
        Ok(note) => (StatusCode::CREATED, Json(note)).into_response(),
        Err(e)   => {
            eprintln!("create_note error: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, "could not create note").into_response()
        }
    }
}

pub async fn get_note(
    Extension(pool): Extension<PgPool>,
    Path(id): Path<i32>,
) -> impl IntoResponse {
    match note_service::get_note_by_id(&pool, id).await {
        Ok(note) => (StatusCode::OK, Json(note)).into_response(),
        Err(_)   => (StatusCode::NOT_FOUND, "note not found").into_response(),
    }
}

pub async fn list_notes(
    Extension(pool): Extension<PgPool>,
) -> impl IntoResponse {
    match note_service::list_notes(&pool).await {
        Ok(notes) => (StatusCode::OK, Json(notes)).into_response(),
        Err(e)    => {
            eprintln!("list_notes error: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, "could not fetch notes").into_response()
        }
    }
}
