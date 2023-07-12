import { Markup } from 'telegraf'

import { Board } from '../board/board.model'
import { Category } from '../categories/categories.model'

export const BotName = 'bot'

export const COMMANDS = {
  START: 'start',
  OK: 'enter',
  CONTINUE: 'continue',
  MAIN_MENU: 'main',
  MAIN_SETTINGS: 'main_settings',
  BACK: 'back',

  BOARD_LIST: 'boards',
  TO_DETAIL_BOARD: (id: number) => `detail-board ${id}`,
  TO_DETAIL_BOARD_REGEX: /detail-board\s(.*)/,
  CREATE_BOARD: 'create_board',

  BOARD_MANAGEMENT: 'board_management',
  BOARD_REPORT: 'report',

  PAYMENT_LIST: 'payment_list',
  PAYMENT_DETAIL: 'payment_detail',
  CREATE_PAYMENT: 'create_payment',
  PAYMENT_MANAGEMENT: 'payment',

  EDIT_CURRENCY: 'edit_currency',

  BOARD_USERS: 'board_users',
  BOARD_USERS_LIST: 'board_users_list',
  ADD_BOARD_USER: 'add_board_user',
  REMOVE_BOARD_USER: 'remove_board_user',

  CATEGORY_MANAGEMENT: 'category_management',
  CREATE_CATEGORY: 'add_category',
  REMOVE_CATEGORY: 'remove_category',
  CATEGORY_LIST: 'list_categories',
  TO_DETAIL_CATEGORY: (id: number) => `detail-category ${id}`,
  TO_DETAIL_CATEGORY_REGEX: /detail-category\s(.*)/,

  ADD_TO_FAVORITE: 'add_to_favorite',
  REMOVE_FROM_FAVORITE: 'remove_from_favorite',

  NEXT_PAGE: 'next_page',
  PREV_PAGE: 'prev_page',
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
  ADD_BOARD_USER: 'add_board_user',
  REMOVE_BOARD_USER: 'remove_board_user',

  CATEGORY_MANAGEMENT: 'category_management',
  CREATE_CATEGORY: 'add_category',
  CATEGORY_LIST: 'list_categories',
  REMOVE_CATEGORY: 'remove_category',
  DETAIL_CATEGORY: 'detail_category',
}

// const NAVIGATION_RULES = {
//   [SCENES.BOARD_LIST]: {
//     limit: 10,
//   },
// }
//
// export function getNavigationRules(scene: valueOf<typeof SCENES>) {
//   const rules = {
//     limit: 10,
//   }
//
//   switch (scene) {
//     case SCENES.BOARD_LIST:
//       rules.limit = 10
//       break
//     case SCENES.CATEGORY_LIST:
//       rules.limit = 10
//       break
//   }
//
//   return rules
// }

export const BUTTONS = {
  // Navigation
  NEXT_PAGE: (shouldShow = false, value = 'Следующая') => Markup.button.callback(`${value} ➡`, COMMANDS.NEXT_PAGE, !shouldShow),
  PREV_PAGE: (shouldShow = false, value = 'Предыдущая') => Markup.button.callback(`⬅ ${value}`, COMMANDS.PREV_PAGE, !shouldShow),

  // General
  OK: Markup.button.callback('✅', COMMANDS.OK),
  CONTINUE: Markup.button.callback('➡️ Продолжить', COMMANDS.CONTINUE),
  BACK: (value = 'Назад') => Markup.button.callback(`⬅ ${value}`, COMMANDS.BACK),

  // Board
  CREATE_BOARD: Markup.button.callback('+ Создать доску', COMMANDS.CREATE_BOARD),
  BOARD_LIST: Markup.button.callback('🗓 Доски учета', COMMANDS.BOARD_LIST),
  TO_DETAIL_BOARD: (board: Board) => Markup.button.callback(`🗓 Доска ${board.name || ''}`, COMMANDS.TO_DETAIL_BOARD(board.id)),
  TO_ACTIVE_BOARD: (id: number) => Markup.button.callback('🏠 Активная доска', COMMANDS.TO_DETAIL_BOARD(id), !id),
  BOARD_REPORT: Markup.button.callback('📊 Отчет', COMMANDS.BOARD_REPORT),
  BOARD_MANAGEMENT: (shouldShow = false) => Markup.button.callback('🔐 Управление', COMMANDS.BOARD_MANAGEMENT, !shouldShow),
  REMOVE_FROM_FAVORITE: (shouldShow = false) => Markup.button.callback('❌ Удалить из избранного', COMMANDS.REMOVE_FROM_FAVORITE, !shouldShow),
  ADD_TO_FAVORITE: (shouldShow = false) => Markup.button.callback('❤️ Добавить в избранное', COMMANDS.ADD_TO_FAVORITE, !shouldShow),

  // Main
  MAIN_MENU: Markup.button.callback('🏠 Главное меню', COMMANDS.MAIN_MENU),
  MAIN_SETTINGS: Markup.button.callback('⚙️ Настройки', COMMANDS.MAIN_SETTINGS),

  // Payment
  PAYMENT_LIST: Markup.button.callback('💳 Список платежей', COMMANDS.PAYMENT_LIST),
  CREATE_PAYMENT: (shouldShow = false) => Markup.button.callback('💳 Добавить платеж', COMMANDS.CREATE_PAYMENT, !shouldShow),
  PAYMENT_MANAGEMENT: (shouldShow = false) => Markup.button.callback('💳 Платежи', COMMANDS.PAYMENT_MANAGEMENT, !shouldShow),

  // Currency
  EDIT_CURRENCY: (shouldShow = false) => Markup.button.callback('🔄 Изменить валюту', COMMANDS.EDIT_CURRENCY, !shouldShow),

  // Category
  CREATE_CATEGORY: (shouldShow = false) => Markup.button.callback('➕ Добавить категорию', COMMANDS.CREATE_CATEGORY, !shouldShow),
  CATEGORY_MANAGEMENT: (shouldShow = false) => Markup.button.callback('📝 Категории', COMMANDS.CATEGORY_MANAGEMENT, !shouldShow),
  test: (shouldShow = false) => Markup.button.callback('📝 TEST', 'test', !shouldShow),
  REMOVE_CATEGORY: (shouldShow = false) => Markup.button.callback('❌ Удалить категорию', COMMANDS.REMOVE_CATEGORY, !shouldShow),
  CATEGORY_LIST: (shouldShow = false) => Markup.button.callback('📋 Список категорий', COMMANDS.CATEGORY_LIST, !shouldShow),
  TO_DETAIL_CATEGORY: (category: Category) => Markup.button.callback(`📋 Категория ${category.name}`, COMMANDS.TO_DETAIL_CATEGORY(category.id)),

  // Board users
  BOARD_USERS: (shouldShow = false) => Markup.button.callback('👨‍🔧 Участники', COMMANDS.BOARD_USERS, !shouldShow),
  ADD_BOARD_USER: (shouldShow = false) => Markup.button.callback('➕ Добавить участника', COMMANDS.ADD_BOARD_USER, !shouldShow),
  REMOVE_BOARD_USER: (shouldShow = false) => Markup.button.callback('➖ Удалить участника', COMMANDS.REMOVE_BOARD_USER, !shouldShow),
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
