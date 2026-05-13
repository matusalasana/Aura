import { sql } from "../../config/db";

// HELPERS
export const findUserByEmailRepo = async (email: string) => {
  const result = await sql`
    SELECT * FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  return result[0];
};

export const findUserByIdRepo = async (id: string) => {
  const result = await sql`
    SELECT * FROM users
    WHERE id = ${id}
    LIMIT 1
  `;

  return result[0];
};



// CREATE USER
export const registerUserRepo = async (full_name, email, password) => {

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
    RETURNING id, email, full_name;
  `;

  return result[0];
};

// GET REFRESH TOKEN 
export const findRefreshTokenRepo = async(user_id: string) => {
  const result = await sql`
    SELECT * FROM refresh_tokens
    WHERE user_id=${user_id}
  `;
  return result[0];
};

// =========================
// CREATE SESSION (LOGIN)
// =========================
export const createRefreshTokenRepo = async (
  userId: string,
  sessionId: string,
  token: string
) => {
  return await sql`
    INSERT INTO refresh_tokens (
      user_id,
      session_id,
      token,
      expires_at
    )
    VALUES (
      ${userId},
      ${sessionId},
      ${token},
      NOW() + INTERVAL '7 days'
    )
    RETURNING *;
  `;
};


// =========================
// FIND ACTIVE SESSION
// =========================
export const findSessionByIdRepo = async (
  userId: string,
  sessionId: string
) => {
  const result = await sql`
    SELECT * FROM refresh_tokens
    WHERE user_id = ${userId}
      AND session_id = ${sessionId}
      AND revoked_at IS NULL
      AND expires_at > NOW()
    LIMIT 1;
  `;

  return result[0];
};


// =========================
// ROTATE SESSION TOKEN
// =========================
export const rotateRefreshTokenRepo = async (
  userId: string,
  sessionId: string,
  hashedToken: string
) => {
  const result = await sql`
    UPDATE refresh_tokens
    SET token = ${hashedToken},
        expires_at = NOW() + INTERVAL '7 days',
        updated_at = NOW()
    WHERE user_id = ${userId}
      AND session_id = ${sessionId}
      AND revoked_at IS NULL
    RETURNING *;
  `;

  return result[0];
};


// =========================
// REVOKE SESSION (LOGOUT)
// =========================
export const revokeRefreshTokenRepo = async (
  userId: string,
  sessionId: string
) => {
  const result = await sql`
    UPDATE refresh_tokens
    SET revoked_at = NOW()
    WHERE user_id = ${userId}
      AND session_id = ${sessionId}
      AND revoked_at IS NULL
    RETURNING *;
  `;

  return result[0];
};