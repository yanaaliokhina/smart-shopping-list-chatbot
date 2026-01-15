export class UserRepository {
    constructor(db) {
        this.db = db;
    }

    findByTelegramId(telegramId) {
        return new Promise((resolve, reject) => {
            this.db.get(
                "SELECT * FROM users WHERE telegram_id = ?",
                [telegramId],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row ?? null);
                }
            );
        });
    }

    create(telegramId) {
        return new Promise((resolve, reject) => {
            this.db.run(
                "INSERT INTO users (telegram_id) VALUES (?)",
                [telegramId],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }
}
