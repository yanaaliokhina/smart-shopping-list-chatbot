import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import { ItemService } from "../item.service.js";

describe("ItemService", () => {
    let repo;
    let service;

    beforeEach(() => {
        repo = {
            getItemsByUserId: jest.fn(),
            getUnboughtItemsByUserId: jest.fn(),
            insertItem: jest.fn(),
            markItemBought: jest.fn(),
            deleteItem: jest.fn()
        };

        service = new ItemService(repo);
    });

    describe("getItems()", () => {
        test("returns items from repository", async () => {
            const items = [{ id: 1 }, { id: 2 }];
            repo.getItemsByUserId.mockResolvedValue(items);

            await expect(service.getItems(1)).resolves.toEqual(items);
        });

        test("propagates repository error", async () => {
            repo.getItemsByUserId.mockRejectedValue(new Error("DB error"));

            await expect(service.getItems(1)).rejects.toThrow("DB error");
        });
    });

    describe("getUnboughtItems()", () => {
        test("returns unbought items", async () => {
            const items = [{ id: 1, bought: false }];
            repo.getUnboughtItemsByUserId.mockResolvedValue(items);

            await expect(service.getUnboughtItems(1)).resolves.toEqual(items);
        });

        test("propagates repository error", async () => {
            repo.getUnboughtItemsByUserId.mockRejectedValue(new Error("DB error"));

            await expect(service.getUnboughtItems(1)).rejects.toThrow("DB error");
        });
    });

    describe("addItem()", () => {
        test("returns object with id", async () => {
            repo.insertItem.mockResolvedValue(5);

            await expect(service.addItem(1, "Milk")).resolves.toEqual({ id: 5 });
        });

        test("propagates repository error", async () => {
            repo.insertItem.mockRejectedValue(new Error("Insert failed"));

            await expect(service.addItem(1, "Milk"))
                .rejects.toThrow("Insert failed");
        });
    });

    describe("markBought()", () => {
        test("returns changes count", async () => {
            repo.markItemBought.mockResolvedValue(1);

            await expect(service.markBought(3)).resolves.toEqual({ changes: 1 });
        });

        test("propagates repository error", async () => {
            repo.markItemBought.mockRejectedValue(new Error("Update failed"));

            await expect(service.markBought(3))
                .rejects.toThrow("Update failed");
        });
    });

    describe("deleteItem()", () => {
        test("returns changes count", async () => {
            repo.deleteItem.mockResolvedValue(1);

            await expect(service.deleteItem(3)).resolves.toEqual({ changes: 1 });
        });

        test("propagates repository error", async () => {
            repo.deleteItem.mockRejectedValue(new Error("Delete failed"));

            await expect(service.deleteItem(3))
                .rejects.toThrow("Delete failed");
        });
    });
});
