export class ItemRepository {
    constructor(db) {
        this.db = db;
    }

    getItemsByUserId(userId) {
        return new Promise((resolve, reject) => {
            this.db.all(
                "SELECT * FROM items WHERE user_id = ?",
                [userId],
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows ?? []);
                }
            );
        });
    }

    getUnboughtItemsByUserId(userId) {
        return new Promise((resolve, reject) => {
            this.db.all(
                "SELECT * FROM items WHERE user_id = ? AND bought IS FALSE",
                [userId],
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows ?? []);
                }
            );
        });
    }

    insertItem(userId, name) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO items (user_id, name) VALUES (?, ?)",
                [userId, name],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    markItemBought(itemId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "UPDATE items SET bought = TRUE WHERE id = ?",
                [itemId],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    deleteItem(itemId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "DELETE FROM items WHERE id = ?",
                [itemId],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    }
}
