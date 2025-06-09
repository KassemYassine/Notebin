use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Note {
    pub id: i32,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub creator_id: i32,
}
