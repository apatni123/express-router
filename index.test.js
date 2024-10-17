const request = require("supertest");
const express = require("express");
const app = require("./src/app"); // Assuming your Express app is exported from `server.js`
const User = require("./models/User"); // Import the User model

// Mock the User model methods to avoid interacting with the database directly
jest.mock("./models/User");

describe("User Routes", () => {
  
  // Test GET /users
  it("should return a list of users", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Doe", email: "jane@example.com" }
    ];

    User.findAll.mockResolvedValue(mockUsers); // Mocking User.findAll()

    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUsers);
  });

  // Test GET /users/:id
  it("should return a single user by ID", async () => {
    const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };

    User.findByPk.mockResolvedValue(mockUser); // Mocking User.findByPk()

    const res = await request(app).get("/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUser);
  });

  // Test POST /users
  it("should create a new user", async () => {
    const newUser = { name: "John Doe", email: "john@example.com" };
    const mockCreatedUser = { id: 1, ...newUser };

    User.create.mockResolvedValue(mockCreatedUser); // Mocking User.create()

    const res = await request(app)
      .post("/users")
      .send(newUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockCreatedUser);
  });

  // Test PUT /users/:id
  it("should update a user", async () => {
    const updatedData = { name: "John Doe Updated", email: "johnupdated@example.com" };
    
    User.update.mockResolvedValue([1]); // Mocking User.update()

    const res = await request(app)
      .put("/users/1")
      .send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("User updated!");
  });

  // Test DELETE /users/:id
  it("should delete a user by ID", async () => {
    User.destroy.mockResolvedValue(1); // Mocking User.destroy()

    const res = await request(app).delete("/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Deleted");
  });
});
