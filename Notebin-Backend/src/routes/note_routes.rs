use axum::{routing::get, Router};
use crate::handlers::note_handler::{create_note, get_note, list_notes};

pub fn router() -> Router {
    Router::new()
        .route("/notes", get(list_notes).post(create_note))
        .route("/notes/:id", get(get_note))
}