mod config;                     
mod db;
mod routes;
mod handlers;
mod services;
mod models;
use axum::{
    extract::Extension,
    
};
use anyhow::Result;            
use dotenv::dotenv;           
use config::Config;            
use db::init_db_pool; 
use routes::app_router;
use tower_http::cors::{CorsLayer, Any};      
use axum::http::Method;                            // ← for allow_methods

#[tokio::main]
async fn main() -> Result<()> {
    dotenv().ok();
    let cors = CorsLayer::new()
    .allow_origin(Any)                
    .allow_methods([Method::GET, Method::POST, Method::OPTIONS]) 
    .allow_headers(Any); 
    let config = Config::from_env()?;
    let pool = init_db_pool(&config.database_url).await?;

    let app = app_router().layer(cors)
    .layer(Extension(pool));

    let addr = ([0, 0, 0, 0], config.port).into();
    println!("▶ Listening on http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;
    Ok(())
}
