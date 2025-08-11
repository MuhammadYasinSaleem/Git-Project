import promBundle from 'express-prom-bundle';
import { register, Counter, Histogram, Gauge } from 'prom-client';

export const authMetrics = {
  signupAttempts: new Counter({
    name: 'auth_signup_attempts_total',
    help: 'Total number of signup attempts',
    labelNames: ['status'],
  }),

  loginAttempts: new Counter({
    name: 'auth_login_attempts_total',
    help: 'Total number of login attempts',
    labelNames: ['status'],
  }),

  authResponseTime: new Histogram({
    name: 'auth_response_time_seconds',
    help: 'Response time for authentication endpoints',
    labelNames: ['endpoint'],
    buckets: [0.1, 0.5, 1, 2, 5],
  }),

  activeUsers: new Gauge({
    name: 'auth_active_users',
    help: 'Number of currently active users',
  }),
};

export const prometheusMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { app: 'express-auth-api' },
  promClient: {
    collectDefaultMetrics: {
      timeout: 5000,
    },
  },
});

export const getMetrics = async () => {
  return await register.metrics();
};

export default register;
