export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getOrCreateUser(telegramId) {
        const user = await this.userRepository.findByTelegramId(telegramId);
        if (user) {
            return user.id;
        }
        return this.userRepository.create(telegramId);
    }
}