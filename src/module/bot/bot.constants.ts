import { Markup } from 'telegraf'

import { Board } from '../board/board.model'

export const BotName = 'bot'

export const COMMANDS = {
  START: 'start',
  BOARD_LIST: 'boards',
  OK: 'enter',
  CONTINUE: 'continue',
  MAIN_MENU: 'main',
  MAIN_SETTINGS: 'main_settings',
  TO_DETAIL_BOARD: (id: number) => `detail-board ${id}`,
  CREATE_BOARD: 'create_board',
  BACK: 'back',
  BOARD_REPORT: 'report',
  BOARD_MANAGEMENT: 'board_management',
  PAYMENT_LIST: 'payment_list',
  PAYMENT_DETAIL: 'payment_detail',
  CREATE_PAYMENT: 'create_payment',
  PAYMENT_MANAGEMENT: 'payment',
  EDIT_CURRENCY: 'edit_currency',
  BOARD_USERS: 'board_users',
  BOARD_USERS_LIST: 'board_users_list',
  CATEGORY_MANAGEMENT: 'category_management',
  CREATE_CATEGORY: 'add_category',
  REMOVE_CATEGORY: 'remove_category',
  ADD_TO_FAVORITE: 'add_to_favorite',
  REMOVE_FROM_FAVORITE: 'remove_from_favorite',
  ADD_BOARD_USER: 'add_board_user',
  REMOVE_BOARD_USER: 'remove_board_user',
}

export const SCENES = {
  BOARD_LIST: 'boards_list',
  CREATE_BOARD: 'create_board',
  DETAIL_BOARD: 'detail_board',
  BOARD_REPORT: 'board_report',
  BOARD_MANAGEMENT: 'board_management',
  CREATE_PAYMENT: 'create_payment',
  PAYMENT_LIST: 'payment_list',
  PAYMENT_MANAGEMENT: 'payment',
  BOARD_USERS: 'board_users',
  BOARD_USERS_LIST: 'board_users_list',
  CATEGORY_MANAGEMENT: 'category_management',
  CREATE_CATEGORY: 'add_category',
  REMOVE_CATEGORY: 'remove_category',
  ADD_BOARD_USER: 'add_board_user',
  REMOVE_BOARD_USER: 'remove_board_user',
}

export const BUTTONS = {
  CREATE_BOARD: Markup.button.callback('+ Создать доску', COMMANDS.CREATE_BOARD),
  BACK: (value = 'Назад') => Markup.button.callback(`⬅ ${value}`, COMMANDS.BACK),
  BOARD_LIST: Markup.button.callback('🗓 Доски учета', COMMANDS.BOARD_LIST),
  TO_DETAIL_BOARD: (board: Board) => Markup.button.callback(`🗓 Доска ${board.name || ''}`, COMMANDS.TO_DETAIL_BOARD(board.id)),
  MAIN_MENU: Markup.button.callback('🏠 Главное меню', COMMANDS.MAIN_MENU),
  TO_ACTIVE_BOARD: (id: number) => Markup.button.callback('🏠 Активная доска', COMMANDS.TO_DETAIL_BOARD(id), !id),
  MAIN_SETTINGS: Markup.button.callback('⚙️ Настройки', COMMANDS.MAIN_SETTINGS),
  OK: Markup.button.callback('✅', COMMANDS.OK),
  CONTINUE: Markup.button.callback('➡️ Продолжить', COMMANDS.CONTINUE),
  BOARD_REPORT: Markup.button.callback('📊 Отчет', COMMANDS.BOARD_REPORT),
  BOARD_MANAGEMENT: (shouldAccess = false) => Markup.button.callback('🔐 Управление', COMMANDS.BOARD_MANAGEMENT, !shouldAccess),
  PAYMENT_LIST: Markup.button.callback('💳 Список платежей', COMMANDS.PAYMENT_LIST),
  CREATE_PAYMENT: (shouldAccess = false) => Markup.button.callback('💳 Добавить платеж', COMMANDS.CREATE_PAYMENT, !shouldAccess),
  PAYMENT_MANAGEMENT: (shouldAccess = false) => Markup.button.callback('💳 Платежи', COMMANDS.PAYMENT_MANAGEMENT, !shouldAccess),
  EDIT_CURRENCY: (shouldAccess = false) => Markup.button.callback('🔄 Изменить валюту', COMMANDS.EDIT_CURRENCY, !shouldAccess),
  BOARD_USERS: (shouldAccess = false) => Markup.button.callback('👨‍🔧 Участники', COMMANDS.BOARD_USERS, !shouldAccess),
  CREATE_CATEGORY: (shouldAccess = false) => Markup.button.callback('➕ Добавить категорию', COMMANDS.CREATE_CATEGORY, !shouldAccess),
  CATEGORY_MANAGEMENT: (shouldAccess = false) => Markup.button.callback('📝 Категории', COMMANDS.CATEGORY_MANAGEMENT, !shouldAccess),
  REMOVE_CATEGORY: (shouldAccess = false) => Markup.button.callback('❌ Удалить категорию', COMMANDS.REMOVE_CATEGORY, !shouldAccess),
  REMOVE_FROM_FAVORITE: (shouldAccess = false) => Markup.button.callback('❌ Удалить из избранного', COMMANDS.REMOVE_FROM_FAVORITE, !shouldAccess),
  ADD_TO_FAVORITE: (shouldAccess = false) => Markup.button.callback('❤️ Добавить в избранное', COMMANDS.ADD_TO_FAVORITE, !shouldAccess),
  ADD_BOARD_USER: (shouldAccess = false) => Markup.button.callback('➕ Добавить участника', COMMANDS.ADD_BOARD_USER, !shouldAccess),
  REMOVE_BOARD_USER: (shouldAccess = false) => Markup.button.callback('➖ Удалить участника', COMMANDS.REMOVE_BOARD_USER, !shouldAccess),
}

export const ACCESS_OPERATIONS = {
  ADMIN: ['board_management'],
  BOARD_USER: [],
}

export const TEXT = {
  START: 'Привет\\! Я бот для учета финансов\\. Для начала работы нажми кнопку "Доски учета"',
  BOARDS: 'Доски учета',
  BOARD_STATISTICS: (board: Board) => getTextStatisticsBoard(board),
  PERMISSION_DENIED: 'Доступ запрещен',
}

function getTextStatisticsBoard(board: Board) {
  return ''
    + `${getTextTitle('Избранная доска')}\n`
    + ` ${board.name}  \n`
    + `ID: ${board.id} \n`
    + `Максимальный баланс: ${board.amount_limit}`
}

function getTextTitle(msg: string) {
  return `\`${msg}\``
}
