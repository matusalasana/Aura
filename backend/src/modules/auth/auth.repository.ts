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
    RETURNING *
  `;
  return result[0];
};

// UPDATE REFRESH TOKEN
export const rotateRefreshTokenRepo = async (
  userId: string,
  hashedToken: string
) => {
  const result = await sql`
    UPDATE refresh_tokens
    SET
      token = ${hashedToken},
      expires_at = NOW() + INTERVAL '7 days',
      revoked_at = NULL
    WHERE user_id = ${userId}
    RETURNING *
  `;

  return result[0];
};

// REVOKE ACCESS 
export const revokeRefreshTokenRepo = async (
  userId: string
) => {
  const result = await sql`
    UPDATE refresh_tokens
    SET
      revoked_at = NOW()
    WHERE user_id = ${userId}
    RETURNING *
  `;

  return result[0];
};

// CREATE REFRESH TOKEN
export const createRefreshTokenRepo = async (
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


// UPDATE PASSWORD
export const updatePasswordRepo = async (
  userId: string,
  passwordHash: string
) => {
  await sql`
    UPDATE users
    SET password_hash = ${passwordHash}
    WHERE id = ${userId};
  `;
};