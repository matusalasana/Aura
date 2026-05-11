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


// UPDATE REFRESH TOKEN
export const updateRefreshTokenRepo = async (
  userId: string,
  refreshToken: string | null
) => {
  await sql`
    UPDATE users
    SET refresh_token = ${refreshToken}
    WHERE id = ${userId};
  `;
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