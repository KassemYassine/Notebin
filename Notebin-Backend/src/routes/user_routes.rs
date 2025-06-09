use axum::{routing::post, Router};
use crate::handlers::user_handler::{register_user, login_user};

pub fn router() -> Router {
    Router::new()
        .route("/users", post(register_user))
        .route("/users/login", post(login_user))
}