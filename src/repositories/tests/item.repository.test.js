import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import { ItemRepository } from "../item.repository.js";

describe("ItemRepository", () => {
    let db;
    let repo;

    beforeEach(() => {
        db = {
            all: jest.fn(),
            run: jest.fn()
        };
        repo = new ItemRepository(db);
    });

    describe("getItemsByUserId()", () => {
        test("resolves rows", async () => {
            const rows = [{ id: 1 }, { id: 2 }];

            db.all.mockImplementation((q, p, cb) => {
                cb(null, rows);
            });

            await expect(repo.getItemsByUserId(10)).resolves.toEqual(rows);
        });

        test("resolves empty array when rows is null", async () => {
            db.all.mockImplementation((q, p, cb) => {
                cb(null, null);
            });

            await expect(repo.getItemsByUserId(10)).resolves.toEqual([]);
        });

        test("rejects on db error", async () => {
            db.all.mockImplementation((q, p, cb) => {
                cb(new Error("DB error"));
            });

            await expect(repo.getItemsByUserId(10)).rejects.toThrow("DB error");
        });
    });

    describe("getUnboughtItemsByUserId()", () => {
        test("resolves rows", async () => {
            const rows = [{ id: 1, bought: false }];

            db.all.mockImplementation((q, p, cb) => {
                cb(null, rows);
            });

            await expect(repo.getUnboughtItemsByUserId(5)).resolves.toEqual(rows);
        });

        test("resolves empty array when rows is null", async () => {
            db.all.mockImplementation((q, p, cb) => {
                cb(null, null);
            });

            await expect(repo.getUnboughtItemsByUserId(5)).resolves.toEqual([]);
        });

        test("rejects on db error", async () => {
            db.all.mockImplementation((q, p, cb) => {
                cb(new Error("DB error"));
            });

            await expect(repo.getUnboughtItemsByUserId(5)).rejects.toThrow("DB error");
        });
    });

    describe("insertItem()", () => {
        test("resolves lastID", async () => {
            db.run.mockImplementation((q, p, cb) => {
                cb.call({ lastID: 42 }, null);
            });

            await expect(repo.insertItem(1, "Milk")).resolves.toBe(42);
        });

        test("rejects on db error", async () => {
            db.run.mockImplementation((q, p, cb) => {
                cb(new Error("Insert failed"));
            });

            await expect(repo.insertItem(1, "Milk")).rejects.toThrow("Insert failed");
        });
    });

    describe("markItemBought()", () => {
        test("resolves number of changes", async () => {
            db.run.mockImplementation((q, p, cb) => {
                cb.call({ changes: 1 }, null);
            });

            await expect(repo.markItemBought(3)).resolves.toBe(1);
        });

        test("resolves zero changes", async () => {
            db.run.mockImplementation((q, p, cb) => {
                cb.call({ changes: 0 }, null);
            });

            await expect(repo.markItemBought(999)).resolves.toBe(0);
        });

        test("rejects on db error", async () => {
            db.run.mockImplementation((q, p, cb) => {
                cb(new Error("Update failed"));
            });

            await expect(repo.markItemBought(3)).rejects.toThrow("Update failed");
        });
    });

    describe("deleteItem()", () => {
        test("resolves number of changes", async () => {
            db.run.mockImplementation((q, p, cb) => {
                cb.call({ changes: 1 }, null);
            });

            await expect(repo.deleteItem(3)).resolves.toBe(1);
        });

        test("resolves zero changes", async () => {
            db.run.mockImplementation((q, p, cb) => {
                cb.call({ changes: 0 }, null);
            });

            await expect(repo.deleteItem(999)).resolves.toBe(0);
        });

        test("rejects on db error", async () => {
            db.run.mockImplementation((q, p, cb) => {
                cb(new Error("Delete failed"));
            });

            await expect(repo.deleteItem(3)).rejects.toThrow("Delete failed");
        });
    });
});
