use axum::{routing::post, Router,routing::get};
use crate::handlers::user_handler::{register_user, login_user,list_users,get_user_by_id};

pub fn router() -> Router {
    Router::new()
        .route("/users", post(register_user).get(list_users))
        .route("/users/login", post(login_user))
        .route("/users/:id",   get(get_user_by_id)) 
}