import serverless from 'serverless-http';
import app from '../../server/index';

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  // Fix path for Netlify Functions to match Express routes
  // Incoming path: /.netlify/functions/api/some-route
  // Expected path: /api/some-route
  if (event.path && event.path.startsWith('/.netlify/functions/api')) {
    event.path = event.path.replace('/.netlify/functions/api', '/api');
  }
  return serverlessHandler(event, context);
};
