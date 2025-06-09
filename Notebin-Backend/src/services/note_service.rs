
use sqlx::PgPool;
use anyhow::Result;
use crate::models::Note;


pub async fn create_note(
    pool: &PgPool,
    creator_id: i32,
    content: &str,
) -> Result<Note> {
    let note = sqlx::query_as!(
        Note,
        r#"
        INSERT INTO notes (content, creator_id)
        VALUES ($1, $2)
        RETURNING id, content, created_at, creator_id
        "#,
        content,
        creator_id
    )
    .fetch_one(pool)
    .await?;

    Ok(note)
}


pub async fn get_note_by_id(
    pool: &PgPool,
    note_id: i32,
) -> Result<Note> {
    let note = sqlx::query_as!(
        Note,
        r#"
        SELECT id, content, created_at, creator_id
        FROM notes
        WHERE id = $1
        "#,
        note_id
    )
    .fetch_one(pool)
    .await?;

    Ok(note)
}


pub async fn list_notes(pool: &PgPool) -> Result<Vec<Note>> {
    let notes = sqlx::query_as!(
        Note,
        r#"
        SELECT id, content, created_at, creator_id
        FROM notes
        ORDER BY created_at DESC
        "#
    )
    .fetch_all(pool)
    .await?;

    Ok(notes)
}
