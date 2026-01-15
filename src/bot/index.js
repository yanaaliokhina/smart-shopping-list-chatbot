import TelegramBot from "node-telegram-bot-api";
import { loadEnv } from "../utils/env.js";
import { db } from "../db/index.js";
import { UserService, ItemService } from "../services/index.js";
import { UserRepository, ItemRepository } from "../repositories/index.js";
import { TelegramBotCommandHandler } from "./handler.js";

export function initBot() {
    const userRepo = new UserRepository(db);
    const itemRepo = new ItemRepository(db);

    const userService = new UserService(userRepo);
    const itemService = new ItemService(itemRepo);

    const { botToken } = loadEnv();
    const bot = new TelegramBot(botToken, { polling: true });
    const botComandHandler = new TelegramBotCommandHandler(userService, itemService, bot);

    bot.onText(/\/start/, (msg) => botComandHandler.handleStartCommand(msg));
    bot.onText(/\/stop/, (msg) => botComandHandler.handleStopCommand(msg));
    bot.on("message", (msg) => botComandHandler.handleMessageCommand(msg));
    bot.on("callback_query", (query) => botComandHandler.handleCallbackQuery(query));

    return bot;
}