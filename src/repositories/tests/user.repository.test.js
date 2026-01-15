import { describe, jest } from "@jest/globals";
import { UserRepository } from "../user.repository.js";

describe("UserRepository", () => {
    let db;
    let repo;

    beforeEach(() => {
        db = { get: jest.fn(), run: jest.fn() };
        repo = new UserRepository(db);
    });

    test("findByTelegramId returns row", async () => {
        db.get.mockImplementation((q, p, cb) => cb(null, { id: 1 }));
        await expect(repo.findByTelegramId(1)).resolves.toEqual({ id: 1 });
    });

    test("create returns lastID", async () => {
        db.run.mockImplementation((q, p, cb) => cb.call({ lastID: 7 }, null));
        await expect(repo.create(123)).resolves.toBe(7);
    });
});
