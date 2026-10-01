// config.js - Centralized configuration for API and Socket URLs
export const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001').replace(/\/+$/, '');
export const API_BASE_URL = `${BACKEND_URL}/api`;
export const SOCKET_URL = (import.meta.env.VITE_SOCKET_URL || BACKEND_URL).replace(/\/+$/, '');
