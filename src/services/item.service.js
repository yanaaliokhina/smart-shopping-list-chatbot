export class ItemService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }

    getItems(userId) {
        return this.itemRepository.getItemsByUserId(userId);
    }

    getUnboughtItems(userId) {
        return this.itemRepository.getUnboughtItemsByUserId(userId);
    }

    async addItem(userId, name) {
        const id = await this.itemRepository.insertItem(userId, name);
        return { id };
    }

    async markBought(itemId) {
        const changes = await this.itemRepository.markItemBought(itemId);
        return { changes };
    }

    async deleteItem(itemId) {
        const changes = await this.itemRepository.deleteItem(itemId);
        return { changes };
    }
}
