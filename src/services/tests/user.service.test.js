import { describe, jest } from "@jest/globals";
import { UserService } from "../user.service.js";

describe("UserService", () => {
    let repo;
    let service;

    beforeEach(() => {
        repo = {
            findByTelegramId: jest.fn(),
            create: jest.fn()
        };
        service = new UserService(repo);
    });

    test("returns existing user id", async () => {
        repo.findByTelegramId.mockResolvedValue({ id: 5 });
        await expect(service.getOrCreateUser(123)).resolves.toBe(5);
    });

    test("creates user if not found", async () => {
        repo.findByTelegramId.mockResolvedValue(null);
        repo.create.mockResolvedValue(9);
        await expect(service.getOrCreateUser(123)).resolves.toBe(9);
    });
});
