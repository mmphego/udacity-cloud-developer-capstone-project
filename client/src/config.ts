const apiId = 'xa69eap5s3'
const region = 'af-south-1'
const devPort = '3050'

export const apiEndpoint = `https://${apiId}.execute-api.${region}.amazonaws.com/dev`
export const devapiEndpoint = `http://localhost:${devPort}/dev`
export const subDirectory = 'diaries'

export const authConfig = {
  domain: 'dev-hhrq1tik.auth0.com',
  clientId: 'zv2uxvDOZNicGc1gI7dMGTE8Ad30fCEI',
  callbackUrl: 'http://localhost:3000/callback'
}
