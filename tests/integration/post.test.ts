import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../src/index';
import Post from '../../src/models/post.model';
import User from '../../src/models/user.model';

describe("POST API", () => {
    let testUser: any;

    beforeAll(async () => {
        await User.deleteMany({});
        testUser = await User.create({
            name: "Test User",
            email: "test@example.com",
            password: "password123"
        })
    })

    beforeEach(async () => {
        await Post.deleteMany({});
    });

    describe("GET /api/posts", () => {
        it("should get all posts", async () => {
            await Post.create([
                {
                    title: "Test Post 1",
                    content: "Test content 1",
                    author: testUser._id,
                    tags: ["test", "api"]
                },
                {
                    title: "Test Post 2",
                    content: "Test content 2",
                    author: testUser._id,
                    tags: ["test", "api"]
                }
            ])

            const res = await request(app).get("/api/posts");

            expect(res.status).toBe(200);
            expect(res.body.status).toBe("success");
            expect(res.body.data.posts.length).toBe(2);
        })
    })

    describe("GET /api/posts/tag/:tag", () => {
        it("should get posts by tag", async () => {
            await Post.create([
                {
                    title: "Tag Post 1",
                    content: "Test content 1",
                    author: testUser._id,
                    tags: ["test", "tag"]
                },
                {
                    title: "Tag Post 2",
                    content: "Test content 2",
                    author: testUser._id,
                    tags: ["test"]
                }
            ])

            const res = await request(app).get("/api/posts/tag/tag");

            expect(res.status).toBe(200);
            expect(res.body.status).toBe("success");
            expect(res.body.data.posts.length).toBe(1);
            expect(res.body.data.posts[0].title).toBe("Tag Post 1");
        })

        it("should return 404 if no posts found", async () => {
            const res = await request(app).get("/api/posts/tag/nonexistent");

            expect(res.status).toBe(404);
            expect(res.body.status).toBe("error");
        })
    })

    describe("GET /api/posts/:id", () => {
        it("should get a post by id", async () => {
            const post = await Post.create({
                title: "Test Post",
                content: "Test content",
                author: testUser._id,
                tags: ["test"]
            })

            const res = await request(app)
                .get(`/api/posts/${post._id}`);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe("success");
            expect(res.body.data.post.id).toBe(post._id.toString());
            expect(res.body.data.post.title).toBe(post.title);
        })

        it("should return 404 if post not found", async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .get(`/api/posts/${nonExistentId}`);

            expect(res.status).toBe(404);
            expect(res.body.status).toBe("error");
        })
    })

    describe("GET /api/posts/user/:userId", () => {
        it("should get posts by user id", async () => {
            await Post.create([
                {
                    title: "User Post 1",
                    content: "Test content 1",
                    author: testUser._id,
                    tags: ["test", "user"]
                },
                {
                    title: "User Post 2",
                    content: "Test content 2",
                    author: testUser._id,
                    tags: ["user"]
                }
            ])

            const res = await request(app)
                .get(`/api/posts/user/${testUser._id}`);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe("success");
            expect(res.body.data.posts.length).toBe(2);
            expect(res.body.data.posts[0].author.toString()).toBe(testUser._id.toString());
        })

        it("should return 404 if no posts found", async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .get(`/api/posts/user/${nonExistentId}`);

            expect(res.status).toBe(404);
            expect(res.body.status).toBe("error");
        })
    })

    describe("POST /api/posts", () => {
        it("should create a new post", async () => {
            const postData = {
                title: "Yeni Post",
                content: "Yeni content",
                author: testUser._id.toString(),
                tags: ["test", "yeni"]
            };

            const res = await request(app)
                .post("/api/posts")
                .send(postData)

            expect(res.status).toBe(201);
            expect(res.body.status).toBe("success");
            expect(res.body.data.post.title).toBe(postData.title);
            expect(res.body.data.post.content).toBe(postData.content);
        })

        it("should return 400 if validation fails", async () => {
            const postData = {
                content: "Yeni content",
                author: testUser._id.toString(),
            }

            const res = await request(app)
                .post("/api/posts")
                .send(postData);

            expect(res.status).toBe(400);
            expect(res.body.status).toBe("error");
        })
    })

    describe("PUT /api/posts/:id", () => {
        it("should update a post", async () => {
            const post = await Post.create({ 
                title: "Test Post", 
                content: "Test content", 
                author: testUser._id,
                tags: ["test"]
            });

            const updateData = {
                title: "Güncellenen Post",
                content: "Güncellenen content",
                tags: ["güncellenen", "test"]
            };

            const res = await request(app)
                .put(`/api/posts/${post._id}`)
                .send(updateData);
            
            expect(res.status).toBe(200);
            expect(res.body.status).toBe("success");
            expect(res.body.data.post.title).toBe(updateData.title);
            expect(res.body.data.post.content).toBe(updateData.content);
            
            const updatedPost = await Post.findById(post._id);
            expect(updatedPost?.title).toBe(updateData.title);
            expect(updatedPost?.content).toBe(updateData.content);
        })

        it("should return 404 if post not found", async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const updateData = {
                title: "Güncellenen Post"
            };

            const res = await request(app)
                .put(`/api/posts/${nonExistentId}`)
                .send(updateData);
            
            expect(res.status).toBe(404);
            expect(res.body.status).toBe("error");
        })
    })

    describe("DELETE /api/posts/:id", () => {
        it("should delete a post", async () => {
            const post = await Post.create({ 
                title: "Silinecek Post", 
                content: "Bu post silinecek", 
                author: testUser._id,
                tags: ["silinecek"]
            });

            const res = await request(app).delete(`/api/posts/${post._id}`);
            
            expect(res.status).toBe(204);
            
            const deletedPost = await Post.findById(post._id);
            expect(deletedPost).toBeNull();
        })

        it("should return 404 if post not found", async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            const res = await request(app).delete(`/api/posts/${nonExistentId}`);
            
            expect(res.status).toBe(404);
            expect(res.body.status).toBe("error");
        })
    })
});
