import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../src/index';
import User from '../../src/models/user.model';

describe("User API", () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe("GET /api/users", () => {
        it("should get all users", async () => {
            await User.create([
                { name: "Test User 1", email: "test1@example.com", password: "password1" },
                { name: "Test User 2", email: "test2@example.com", password: "password2" },
            ]);

            const res = await request(app).get("/api/users");

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.data.users.length).toBe(2);
            
        });
    });

    describe("POST /api/users", () => {
        it("should create a new user", async () => {
            const userData = {
                name: "Test User 3",
                email: "test3@example.com",
                password: "password3",
            };

            const res = await request(app)
                .post("/api/users")
                .send(userData)



            expect(res.status).toBe(201);
            expect(res.body.status).toBe('success');
            expect(res.body.data.user.name).toBe(userData.name);
            expect(res.body.data.user.email).toBe(userData.email);

            const userInDb = await User.findOne({ email: userData.email});
            expect(userInDb).toBeTruthy();
        });

        it("should return 400 if user already exists", async () => {
            await User.create({
                name: "Existing User",
                email: "existing@example.com",
                password: "password123"
            });

            
            const userData= {
                name: "New User",
                email: "existing@example.com",
                password: "password123"
            }
            
            const res = await request(app)
            .post("/api/users")
            .send(userData);
            


            expect(res.status).toBe(400);
            expect(res.body.status).toBe('error');
            expect(res.body.message).toBe('Bu email adresiyle daha önce kayıt olunmuştur');
        })
    })

    describe("GET /api/users/:id", () => {
        it("should return a user by id", async () => {
          const user = await User.create({
            name: "Test User",
            email: "test@example.com",
            password: "password123"
          });
    
          const res = await request(app).get(`/api/users/${user._id}`);

          console.log("API Response:", JSON.stringify(res.body, null, 2));
          
          expect(res.status).toBe(200);
          expect(res.body.status).toBe('success');
          expect(res.body.data.user.id).toBe(user._id.toString());
          expect(res.body.data.user.name).toBe(user.name);
        });
    
        it("should return 404 if user not found", async () => {
          const nonExistentId = new mongoose.Types.ObjectId();
          const res = await request(app).get(`/api/users/${nonExistentId}`);
          
          expect(res.status).toBe(404);
          expect(res.body.status).toBe('error');
        });
      });

      describe("PUT /api/users/:id", () => {
        it("should update a user", async () => {
            const user = await User.create({
                name: "Test User",
                email: "test@example.com",
                password: "password123"
            });

            const updateData = {
                name: "Güncellenen User",
                email: "updated@example.com",
            };

            const res = await request(app)
                .put(`/api/users/${user._id}`)
                .send(updateData);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.data.user.name).toBe(updateData.name);
            expect(res.body.data.user.email).toBe(updateData.email);

            const updatedUser = await User.findById(user._id)
            expect(updatedUser?.name).toBe(updateData.name);
            expect(updatedUser?.email).toBe(updateData.email);
        })

        it("should return 404 if user not found", async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const updateData = {
                name: "Güncellenen User",
            }

            const res = await request(app)
                .put(`/api/users/${nonExistentId}`)
                .send(updateData);

            expect(res.status).toBe(404);
            expect(res.body.status).toBe('error');
        })

        it("should return 400 if email already exists", async () => {
            const user1 = await User.create({
                name: "User 1",
                email: "user1@example.com",
                password: "password123"
            })

            await User.create({
                name: "User 2",
                email: "user2@example.com",
                password: "password123"
            })
            
            const updateData = {
                email: "user2@example.com",
            }

            const res = await request(app)
                .put(`/api/users/${user1._id}`)
                .send(updateData);

            expect(res.status).toBe(400);
            expect(res.body.status).toBe('error');
            expect(res.body.message).toBe('Bu email adresiyle daha önce kayıt olunmuştur');
        })
      })

      describe("DELETE /api/users/:id", () => {
        it("should delete a user", async () => {
            const user = await User.create({
                name: "Test User",
                email: "test@example.com",
                password: "password123"
            });

            const res = await request(app)
                .delete(`/api/users/${user._id}`)

            expect(res.status).toBe(204);

            const deletedUser = await User.findById(user._id);
            expect(deletedUser).toBeNull();
        })

        it("should return 404 if user not found", async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .delete(`/api/users/${nonExistentId}`);

            expect(res.status).toBe(404);
            expect(res.body.status).toBe('error');
        })
      })
})