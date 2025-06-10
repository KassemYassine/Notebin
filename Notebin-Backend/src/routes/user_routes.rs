use axum::{routing::post, Router};
use crate::handlers::user_handler::{register_user, login_user,list_users};

pub fn router() -> Router {
    Router::new()
        .route("/users", post(register_user).get(list_users))
        .route("/users/login", post(login_user))
}