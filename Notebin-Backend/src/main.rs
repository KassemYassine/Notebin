mod config;                     
mod db;
use axum::{
    extract::Extension,
    routing::get,
    Router,
};
use anyhow::Result;            
use dotenv::dotenv;           
use config::Config;            
use db::init_db_pool;      

#[tokio::main]
async fn main() -> Result<()> {
    dotenv().ok();

    let config = Config::from_env()?;
    let pool = init_db_pool(&config.database_url).await?;

    let app = Router::new()
        .route("/", get(|| async { "Notebin is alive!" }))
        .layer(Extension(pool));

    let addr = ([0, 0, 0, 0], config.port).into();
    println!("▶ Listening on http://{}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;
    Ok(())
}
