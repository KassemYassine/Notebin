use axum::Router;

pub mod user_routes;
pub mod note_routes;


pub fn app_router() -> Router {
    Router::new()
        .merge(user_routes::router())
        .merge(note_routes::router())
}