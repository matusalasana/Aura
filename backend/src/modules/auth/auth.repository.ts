import { sql } from "../../config/db";

// FIND USER BY EMAIL
const findUserByEmail =
  async (email: string) => {
    const result = await sql`
      SELECT *
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    return result[0];
  };

// FIND USER BY ID
const findUserById =
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
const register =
  async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => {
    const result = await sql`
      INSERT INTO users (
        first_name,
        last_name,
        email,
        password
      )
      VALUES (
        ${first_name},
        ${last_name},
        ${email},
        ${password}
      )
      RETURNING
        id,
        email,
        first_name,
        last_name,
        role
    `;

    return result[0];
  };
  
// CREATE REFRESH TOKEN
const createRefreshToken =
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

// ROTATE REFRESH TOKEN
const rotateRefreshToken =
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

// REVOKE TOKEN
const deleteRefreshToken =
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
  
  
  export const AuthRepository = {
    findUserByEmail,
    findUserById,
    createRefreshToken,
    register,
    rotateRefreshToken,
    deleteRefreshToken
  }