import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "backend", label: "Backend Setup" },
  { id: "frontend", label: "Frontend Setup" },
  { id: "flow", label: "Auth Flow" },
  { id: "security", label: "Security Tips" },
];

const CodeBlock = ({ code, lang = "js" }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", margin: "16px 0" }}>
      <div style={{
        background: "#0d1117", borderRadius: "10px", border: "1px solid #30363d",
        overflow: "hidden", fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "8px 16px", background: "#161b22", borderBottom: "1px solid #30363d",
        }}>
          <span style={{ color: "#8b949e", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" }}>{lang.toUpperCase()}</span>
          <button onClick={copy} style={{
            background: copied ? "#238636" : "#21262d", color: copied ? "#fff" : "#8b949e",
            border: "1px solid #30363d", borderRadius: "6px", padding: "4px 12px",
            fontSize: "12px", cursor: "pointer", transition: "all 0.2s",
          }}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <pre style={{
          margin: 0, padding: "20px", overflowX: "auto", fontSize: "13px",
          lineHeight: "1.7", color: "#e6edf3",
        }}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
  
};

const Section = ({ title, children, accent = "#58a6ff" }) => (
  <div style={{ marginBottom: "32px" }}>
    <h3 style={{
      color: accent, fontSize: "16px", fontWeight: 700, marginBottom: "12px",
      display: "flex", alignItems: "center", gap: "10px", letterSpacing: "0.02em",
    }}>
      <span style={{ width: "3px", height: "18px", background: accent, borderRadius: "2px", display: "inline-block" }} />
      {title}
    </h3>
    <div style={{ color: "#c9d1d9", lineHeight: "1.75", fontSize: "14.5px" }}>{children}</div>
  </div>
);

const Note = ({ type = "info", children }) => {
  const styles = {
    info:    { bg: "#0d2137", border: "#1f6feb", icon: "ℹ️" },
    warning: { bg: "#1a1200", border: "#9e6a03", icon: "⚠️" },
    success: { bg: "#0a1f0a", border: "#238636", icon: "✅" },
    danger:  { bg: "#1f0a0a", border: "#da3633", icon: "🚨" },
  };
  const s = styles[type];
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}`, borderRadius: "8px",
      padding: "14px 16px", margin: "14px 0", fontSize: "13.5px", color: "#c9d1d9",
      display: "flex", gap: "10px",
    }}>
      <span>{s.icon}</span><div>{children}</div>
    </div>
  );
};

const codeInline = {
  background: "#21262d", padding: "2px 6px", borderRadius: "4px",
  fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#e6edf3",
};

// ── TAB CONTENT ──────────────────────────────────────────────

const Overview = () => (
  <div>
    <p style={{ color: "#8b949e", marginBottom: "24px", fontSize: "15px", lineHeight: "1.8" }}>
      This guide covers the complete setup for a dual-token auth system: a short-lived <strong style={{color:"#58a6ff"}}>Access Token</strong> kept in memory (React state/closure) and a long-lived <strong style={{color:"#3fb950"}}>Refresh Token</strong> stored in an <code style={codeInline}>httpOnly</code> cookie.
    </p>

    <Section title="Why This Architecture?">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "8px" }}>
        {[
          { label: "Access Token (Memory)", color: "#58a6ff", points: ["Short-lived (15 min)", "Never touches disk/localStorage", "Safe from XSS — no DOM access", "Lost on page refresh → triggers silent refresh"] },
          { label: "Refresh Token (httpOnly Cookie)", color: "#3fb950", points: ["Long-lived (7–30 days)", "httpOnly → JS cannot read it", "Sent automatically by browser", "Rotated on each use"] },
        ].map(c => (
          <div key={c.label} style={{ background: "#161b22", borderRadius: "10px", padding: "16px", border: `1px solid ${c.color}33` }}>
            <div style={{ color: c.color, fontWeight: 700, marginBottom: "10px", fontSize: "13px" }}>{c.label}</div>
            {c.points.map(p => (
              <div key={p} style={{ display: "flex", gap: "8px", marginBottom: "6px", fontSize: "13px" }}>
                <span style={{ color: c.color }}>›</span><span>{p}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>

    <Section title="Dependencies to Install">
      <CodeBlock lang="bash" code={`# Backend
npm install express pg jsonwebtoken bcryptjs cookie-parser cors dotenv

# Frontend (React)
npm install axios`} />
    </Section>

    <Section title="Environment Variables (.env)">
      <CodeBlock lang="env" code={`PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce

ACCESS_TOKEN_SECRET=your_super_secret_access_key_min_32_chars
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key_min_32_chars

ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

CLIENT_ORIGIN=http://localhost:3000`} />
    </Section>
  </div>
);

const Backend = () => (
  <div>
    <Section title="1. Database — Refresh Token Table">
      <CodeBlock lang="sql" code={`-- Run this in your PostgreSQL database
CREATE TABLE refresh_tokens (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_user  ON refresh_tokens(user_id);`} />
    </Section>

    <Section title="2. Token Utility (utils/tokens.js)">
      <CodeBlock lang="js" code={`const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // '15m'
  });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // '7d'
  });

const verifyAccessToken  = (token) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
const verifyRefreshToken = (token) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

module.exports = {
  generateAccessToken, generateRefreshToken,
  verifyAccessToken, verifyRefreshToken,
};`} />
    </Section>

    <Section title="3. Cookie Helper (utils/cookies.js)">
      <CodeBlock lang="js" code={`const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const setRefreshTokenCookie = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,           // JS cannot access this cookie
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'strict',       // CSRF protection
    maxAge: SEVEN_DAYS_MS,
    path: '/api/auth',        // Only sent to /api/auth routes
  });
};

const clearRefreshTokenCookie = (res) => {
  res.clearCookie('refreshToken', { path: '/api/auth' });
};

module.exports = { setRefreshTokenCookie, clearRefreshTokenCookie };`} />
      <Note type="warning">Setting <code style={codeInline}>path: '/api/auth'</code> means the cookie is only sent to auth endpoints — the browser won't attach it to every API call, reducing exposure.</Note>
    </Section>

    <Section title="4. Auth Controller (controllers/authController.js)">
      <CodeBlock lang="js" code={`const bcrypt = require('bcryptjs');
const pool   = require('../db');  // your pg Pool instance
const {
  generateAccessToken, generateRefreshToken, verifyRefreshToken,
} = require('../utils/tokens');
const {
  setRefreshTokenCookie, clearRefreshTokenCookie,
} = require('../utils/cookies');

// ── REGISTER ────────────────────────────────────────────────
exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1,$2,$3) RETURNING id, email, name',
      [email, hash, name]
    );
    const user = rows[0];

    const accessToken  = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id });

    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1,$2, NOW() + INTERVAL '7 days')",
      [user.id, refreshToken]
    );

    setRefreshTokenCookie(res, refreshToken);
    res.status(201).json({ accessToken, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ── LOGIN ────────────────────────────────────────────────────
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken  = generateAccessToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({ userId: user.id });

    // Rotate: delete old tokens, insert new one
    await pool.query('DELETE FROM refresh_tokens WHERE user_id = $1', [user.id]);
    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1,$2, NOW() + INTERVAL '7 days')",
      [user.id, refreshToken]
    );

    setRefreshTokenCookie(res, refreshToken);
    res.json({ accessToken, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ── REFRESH ──────────────────────────────────────────────────
exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const payload = verifyRefreshToken(token);

    const { rows } = await pool.query(
      'SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > NOW()',
      [token]
    );
    if (!rows.length) return res.status(403).json({ message: 'Refresh token invalid or expired' });

    // Rotate: issue new pair
    const newRefreshToken = generateRefreshToken({ userId: payload.userId });
    const newAccessToken  = generateAccessToken({ userId: payload.userId, email: payload.email });

    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1,$2, NOW() + INTERVAL '7 days')",
      [payload.userId, newRefreshToken]
    );

    setRefreshTokenCookie(res, newRefreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    clearRefreshTokenCookie(res);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

// ── LOGOUT ───────────────────────────────────────────────────
exports.logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
  clearRefreshTokenCookie(res);
  res.json({ message: 'Logged out' });
};`} />
    </Section>

    <Section title="5. Auth Middleware (middleware/auth.js)">
      <CodeBlock lang="js" code={`const { verifyAccessToken } = require('../utils/tokens');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No access token' });

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ message: 'Access token expired or invalid' });
  }
};

module.exports = { authenticate };`} />
    </Section>

    <Section title="6. Express App Entry (server.js)">
      <CodeBlock lang="js" code={`require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes   = require('./routes/auth');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,  // ← REQUIRED for cookies cross-origin
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);`} />
    </Section>

    <Section title="7. Auth Routes (routes/auth.js)">
      <CodeBlock lang="js" code={`const router = require('express').Router();
const { register, login, refresh, logout } = require('../controllers/authController');

router.post('/register', register);
router.post('/login',    login);
router.post('/refresh',  refresh);
router.post('/logout',   logout);

module.exports = router;`} />
    </Section>
  </div>
);







const Frontend = () => (
  <div>
    <Section title="1. Axios Instance with Interceptor (api/axiosInstance.js)">
      <Note type="info">This is the heart of the frontend. The interceptor silently refreshes the access token when a 401 is received, then retries the original request — completely transparent to the rest of your app.</Note>
      <CodeBlock lang="js" code={`import axios from 'axios';

// Access token lives here — module-level closure, never in localStorage.
let accessToken = null;

export const setAccessToken   = (token) => { accessToken = token; };
export const getAccessToken   = ()       => accessToken;
export const clearAccessToken = ()       => { accessToken = null; };

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,  // ← sends httpOnly cookie automatically
});

// Attach access token to every outgoing request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers['Authorization'] = "Bearer " + accessToken;
  }
  return config;
});

// On 401 → try silent refresh, then retry the original request
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/auth/refresh',
          {},
          { withCredentials: true }
        );
        setAccessToken(data.accessToken);
        original.headers['Authorization'] = "Bearer " + data.accessToken;
        return api(original);  // retry the original request
      } catch {
        clearAccessToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;`} />
    </Section>

    <Section title="2. Auth Context (context/AuthContext.jsx)">
      <CodeBlock lang="jsx" code={`import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { setAccessToken, clearAccessToken } from '../api/axiosInstance';
import api from '../api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load: silently try to restore session using the httpOnly cookie.
  // This handles page refreshes — access token was in memory and is now gone.
  useEffect(() => {
    const silentRefresh = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/auth/refresh',
          {},
          { withCredentials: true }
        );
        setAccessToken(data.accessToken);
        setUser(data.user);
      } catch {
        // No valid cookie — user is logged out, that's fine
      } finally {
        setLoading(false);
      }
    };
    silentRefresh();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data;
  };

  const register = async (email, password, name) => {
    const { data } = await api.post('/auth/register', { email, password, name });
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    clearAccessToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);`} />
    </Section>

    <Section title="3. Protected Route Component">
      <CodeBlock lang="jsx" code={`import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;`} />
    </Section>

    <Section title="4. App Entry (App.jsx)">
      <CodeBlock lang="jsx" code={`import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login     from './pages/Login';
import Register  from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"     element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;`} />
    </Section>

    <Section title="5. Using Auth in a Component">
      <CodeBlock lang="jsx" code={`import { useAuth } from '../context/AuthContext';
import api from '../api/axiosInstance';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const fetchOrders = async () => {
    // Access token is attached automatically by the interceptor
    const { data } = await api.get('/orders/my-orders');
    console.log(data);
  };

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={fetchOrders}>Load Orders</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;`} />
    </Section>
  </div>
);

const Flow = () => (
  <div>
    {[
      {
        title: "1. Login / Register",
        color: "#58a6ff",
        steps: [
          "Client POSTs credentials to /api/auth/login",
          "Server validates → generates accessToken (15m) + refreshToken (7d)",
          "Refresh token saved to DB, sent as httpOnly cookie in response",
          "Access token returned in the JSON response body",
          "Client stores access token in memory (module-level variable)",
        ],
      },
      {
        title: "2. Authenticated API Request",
        color: "#3fb950",
        steps: [
          "Axios interceptor reads access token from memory",
          "Attaches Authorization: Bearer <token> header automatically",
          "Server middleware verifies JWT signature and expiry",
          "Request proceeds if valid, returns data",
        ],
      },
      {
        title: "3. Access Token Expired (401 Response)",
        color: "#d29922",
        steps: [
          "Server returns 401 — access token expired",
          "Axios response interceptor catches the 401",
          "Automatically POSTs to /api/auth/refresh (httpOnly cookie sent by browser)",
          "Server verifies refresh token in DB, issues new access + refresh tokens",
          "Old refresh token deleted from DB (rotation prevents reuse)",
          "New access token stored in memory, original request retried transparently",
        ],
      },
      {
        title: "4. Page Refresh / App Reload",
        color: "#bc8cff",
        steps: [
          "Access token is lost — it only existed in memory",
          "AuthContext useEffect fires on mount → calls /api/auth/refresh",
          "Browser automatically sends httpOnly cookie",
          "New access token received → user session restored",
          "loading state prevents rendering until this resolves (no flash)",
        ],
      },
      {
        title: "5. Logout",
        color: "#f85149",
        steps: [
          "Client POSTs to /api/auth/logout",
          "Server deletes refresh token from DB",
          "Server clears the httpOnly cookie via Set-Cookie header",
          "Client clears access token from memory",
          "User state set to null → ProtectedRoutes redirect to /login",
        ],
      },
    ].map(({ title, color, steps }) => (
      <div key={title} style={{
        marginBottom: "20px", background: "#161b22",
        borderRadius: "10px", border: `1px solid ${color}44`, padding: "20px",
      }}>
        <h4 style={{ color, marginBottom: "14px", fontSize: "15px", fontWeight: 700 }}>{title}</h4>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "10px", alignItems: "flex-start" }}>
            <div style={{
              minWidth: "24px", height: "24px", borderRadius: "50%",
              background: color + "22", border: `1px solid ${color}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 700, color,
            }}>{i + 1}</div>
            <span style={{ color: "#c9d1d9", fontSize: "14px", lineHeight: "1.6" }}>{step}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Security = () => (
  <div>
    {[
      {
        type: "success",
        title: "✅ Do These",
        items: [
          ["Rotate refresh tokens on every use", "Delete the old refresh token from DB and issue a new one each time. If a token is stolen, it becomes useless after the first legitimate use."],
          ["Store access tokens in memory only", "Never use localStorage or sessionStorage for JWTs — XSS can read those. Memory is safe."],
          ["Use httpOnly + Secure + SameSite=Strict", "This combination protects the refresh token cookie from XSS (httpOnly) and CSRF (SameSite)."],
          ["Keep access token expiry short (15 min)", "A short window limits the blast radius if an access token leaks."],
          ["Validate refresh tokens against DB", "Stateless JWT verification alone isn't enough — also confirm the token exists and isn't expired in your DB."],
          ["Use separate secrets for each token type", "ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET must be different — compromising one shouldn't compromise both."],
        ],
      },
      {
        type: "danger",
        title: "🚨 Avoid These",
        items: [
          ["localStorage / sessionStorage for JWTs", "Any JavaScript on your page can read these — XSS attack = instant token theft."],
          ["Long-lived access tokens", "A 24h access token that leaks gives an attacker a full day. Keep it 15 minutes."],
          ["Not deleting refresh tokens on logout", "Without DB-side invalidation, stolen tokens can be replayed even after the user logs out."],
          ["Missing credentials: true", "Both your CORS config (backend) and Axios/fetch config (frontend) need this, or cookies won't travel cross-origin."],
          ["Skipping the DB check on refresh", "Even with valid JWT signature, you must check the token exists in DB — otherwise rotation is meaningless."],
        ],
      },
    ].map(({ type, title, items }) => (
      <div key={title} style={{ marginBottom: "28px" }}>
        <h3 style={{ color: type === "success" ? "#3fb950" : "#f85149", marginBottom: "16px", fontSize: "16px" }}>{title}</h3>
        {items.map(([heading, desc]) => (
          <div key={heading} style={{
            background: "#161b22", borderRadius: "8px", padding: "14px 16px",
            marginBottom: "10px", border: `1px solid ${type === "success" ? "#23863633" : "#da363333"}`,
          }}>
            <div style={{ color: type === "success" ? "#3fb950" : "#f85149", fontWeight: 700, marginBottom: "4px", fontSize: "14px" }}>{heading}</div>
            <div style={{ color: "#8b949e", fontSize: "13.5px", lineHeight: "1.6" }}>{desc}</div>
          </div>
        ))}
      </div>
    ))}

    <Section title="CSRF Consideration">
      <p style={{ marginBottom: "12px" }}>With <code style={codeInline}>SameSite=Strict</code>, browsers won't send the cookie on cross-site requests at all, which defeats CSRF attacks. For most e-commerce apps with frontend and backend on the same domain, this is sufficient.</p>
      <Note type="info">If you need <code style={codeInline}>SameSite=Lax</code> for OAuth or third-party flows, add a <strong>CSRF token</strong> as a custom header (e.g. <code style={codeInline}>X-CSRF-Token</code>) and validate it server-side.</Note>
    </Section>
  </div>
);

export default function Tutorial () {
  const [active, setActive] = useState("overview");

  const content = {
    overview: <Overview />,
    backend:  <Backend />,
    frontend: <Frontend />,
    flow:     <Flow />,
    security: <Security />,
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0d1117",
      fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#e6edf3",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #161b22 0%, #0d1117 100%)",
        borderBottom: "1px solid #30363d", padding: "32px 40px 0",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{
              background: "linear-gradient(135deg, #58a6ff, #3fb950)",
              borderRadius: "8px", padding: "6px 12px",
              fontSize: "11px", fontWeight: 700, color: "#0d1117", letterSpacing: "0.08em",
            }}>PERN STACK</div>
            <div style={{ color: "#8b949e", fontSize: "13px" }}>Complete Auth Setup</div>
          </div>
          <h1 style={{
            fontSize: "26px", fontWeight: 800, marginBottom: "8px",
            background: "linear-gradient(90deg, #58a6ff, #3fb950)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            JWT Auth: Access Token in Memory + Refresh Token in Cookie
          </h1>
          <p style={{ color: "#8b949e", fontSize: "14px", marginBottom: "24px" }}>
            Secure, production-ready authentication for your e-commerce app
          </p>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActive(t.id)} style={{
                padding: "10px 18px", border: "none", cursor: "pointer",
                background: "transparent", fontSize: "14px", fontWeight: 600,
                color: active === t.id ? "#58a6ff" : "#8b949e",
                borderBottom: active === t.id ? "2px solid #58a6ff" : "2px solid transparent",
                transition: "all 0.15s",
              }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "36px 40px" }}>
        {content[active]}
      </div>
    </div>
  );
}