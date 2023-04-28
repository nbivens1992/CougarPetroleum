const request = require('supertest')
const app = require('../server')

describe('User API', () => {
  let testUser = null

  beforeAll(async () => {
    // Create a test user
    const username = 'testuser'
    const password = 'testpassword'
    const hashedPwd = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password: hashedPwd })
    testUser = user.toObject()
    delete testUser.password
  })

  afterAll(async () => {
    // Remove the test user
    await User.deleteOne({ _id: testUser._id })
  })

  describe('GET /users', () => {
    test('should return all users', async () => {
      const response = await request(app).get('/users')
      expect(response.status).toBe(200)
      expect(response.body.length).toBeGreaterThan(0)
    })
  })

  describe('POST /users', () => {
    test('should create a new user', async () => {
      const newUser = { username: 'newuser', password: 'newpassword' }
      const response = await request(app)
        .post('/users')
        .send(newUser)
      expect(response.status).toBe(201)
      expect(response.body.message).toBe('New user created')
      // Verify the new user exists in the database
      const createdUser = await User.findOne({ username: 'newuser' }).lean().exec()
      expect(createdUser).toBeTruthy()
      expect(createdUser.username).toBe(newUser.username)
    })

    test('should return an error when missing required fields', async () => {
      const response = await request(app)
        .post('/users')
        .send({ username: 'newuser' })
      expect(response.status).toBe(400)
      expect(response.body.message).toBe('All fields are required')
    })

    test('should return an error when creating a duplicate user', async () => {
      const response = await request(app)
        .post('/users')
        .send({ username: testUser.username, password: 'password' })
      expect(response.status).toBe(409)
      expect(response.body.message).toBe('Duplicate username')
    })
  })

  describe('PATCH /users', () => {
    test('should update a user', async () => {
      const updatedUsername = 'newusername'
      const response = await request(app)
        .patch('/users')
        .send({ id: testUser._id, username: updatedUsername })
      expect(response.status).toBe(200)
      expect(response.body.message).toBe(`${updatedUsername} updated`)
      // Verify the user was updated in the database
      const updatedUser = await User.findById(testUser._id).lean().exec()
      expect(updatedUser.username).toBe(updatedUsername)
    })
  })
})