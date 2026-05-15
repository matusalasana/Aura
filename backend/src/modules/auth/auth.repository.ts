import { sql } from "../../config/db";

// =========================
// FIND USER BY EMAIL
// =========================
export const findUserByEmailRepo =
  async (email: string) => {
    const result = await sql`
      SELECT *
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    return result[0];
  };

// =========================
// FIND USER BY ID
// =========================
export const findUserByIdRepo =
  async (id: string) => {
    const result = await sql`
      SELECT *
      FROM users
      WHERE id = ${id}
      LIMIT 1
    `;

    return result[0];
  };









// CREATE USER
export const registerUserRepo =
  async (
    full_name: string,
    email: string,
    password: string
  ) => {
    const result = await sql`
      INSERT INTO users (
        email,
        password_hash,
        full_name
      )
      VALUES (
        ${email},
        ${password},
        ${full_name}
      )
      RETURNING
        id,
        email,
        full_name,
        role
    `;

    return result[0];
  };

// CREATE SESSION
export const createRefreshTokenRepo =
  async (
    userId: string,
    token: string
  ) => {
    const result = await sql`
      INSERT INTO refresh_tokens (
        user_id,
        token,
        expires_at
      )
      VALUES (
        ${userId},
        ${token},
        NOW() + INTERVAL '7 days'
      )
      RETURNING *
    `;

    return result[0];
  };

// =========================
// FIND ACTIVE SESSION
// =========================
export const findSessionByIdRepo =
  async (
    userId: string,
    sessionId: string
  ) => {
    const result = await sql`
      SELECT *
      FROM refresh_tokens
      WHERE user_id = ${userId}
        AND session_id = ${sessionId}
        AND revoked_at IS NULL
        AND expires_at > NOW()
      LIMIT 1
    `;

    return result[0];
  };

// =========================
// ROTATE REFRESH TOKEN
// =========================
export const rotateRefreshTokenRepo =
  async (
    userId: string,
    hashedToken: string
  ) => {
    const result = await sql`
      UPDATE refresh_tokens
      SET
        token = ${hashedToken},
        expires_at =
          NOW() + INTERVAL '7 days'
      WHERE user_id = ${userId}
        AND revoked_at IS NULL
      RETURNING *
    `;

    return result[0];
  };

// REVOKE SESSION
export const deleteRefreshTokenRepo =
  async (
    userId: string,
  ) => {
    const result = await sql`
      DELETE FROM refresh_tokens
      WHERE user_id = ${userId}

      RETURNING *
    `;

    return result[0];
  };