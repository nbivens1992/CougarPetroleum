const request = require('supertest')
const app = require('../server')


describe('Auth API', () => {
  describe('POST /auth/register', () => {
    test('should return 400 if username or password is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({})
        .expect(400)

      expect(response.body).toEqual({ message: 'All fields are required' })
    })

    test('should return 200 and an access token', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ username: 'testuser', password: 'testpassword' })
        .expect(200)

      expect(response.body).toHaveProperty('accessToken')
    })
  })

  describe('POST /auth/login', () => {
    test('should return 400 if username or password is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({})
        .expect(400)

      expect(response.body).toEqual({ message: 'All fields are required' })
    })

    test('should return 401 if username or password is incorrect', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'wrongpassword' })
        .expect(401)

      expect(response.body).toEqual({ message: 'Unauthorized' })
    })

    test('should return 200 and an access token', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'testpassword' })
        .expect(200)

      expect(response.body).toHaveProperty('accessToken')
    })
  })

  describe('GET /auth/refresh', () => {
    
    test('should return 401 if no refresh token is provided', async () => {
      const response = await request(app)
        .get('/auth/refresh')
        .expect(401)

      expect(response.body).toEqual({ message: 'Unauthorized' })
    })

    test('should return 403 if the refresh token is invalid', async () => {
      const response = await request(app)
        .get('/auth/refresh')
        .set('Cookie', 'jwt=invalidtoken')
        .expect(403)

      expect(response.body).toEqual({ message: 'Forbidden' })
    })

    test('should return 401 if the user associated with the refresh token is not found', async () => {
      const refreshToken = generateRefreshToken('nonexistentuser')

      const response = await request(app)
        .get('/auth/refresh')
        .set('Cookie', `jwt=${refreshToken}`)
        .expect(401)

      expect(response.body).toEqual({ message: 'Unauthorized' })
    })

    test('should return 200 and a new access token if the refresh token is valid', async () => {
      const refreshToken = generateRefreshToken('testuser')

      const response = await request(app)
        .get('/auth/refresh')
        .set('Cookie', `jwt=${refreshToken}`)
        .expect(200)

      expect(response.body).toHaveProperty('accessToken')
    })

  });
})