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
}

export const SCENES = {
  BOARD_LIST: 'boards_list',
  CREATE_BOARD: 'create_board',
  DETAIL_BOARD: 'detail_board',
  BOARD_REPORT: 'board_report',
  BOARD_MANAGEMENT: 'board_management',
  CREATE_PAYMENT: 'create_payment',
}

export const BUTTONS = {
  CREATE_BOARD: Markup.button.callback('+ Создать доску', COMMANDS.CREATE_BOARD),
  BACK: Markup.button.callback('⬅ Назад', COMMANDS.BACK),
  BOARD_LIST: Markup.button.callback('🗓 Доски учета', COMMANDS.BOARD_LIST),
  TO_DETAIL_BOARD: (id: number, name: string) => Markup.button.callback(`🗓 Доска ${name}`, COMMANDS.TO_DETAIL_BOARD(id)),
  MAIN_MENU: Markup.button.callback('🏠 Главное меню', COMMANDS.MAIN_MENU),
  TO_ACTIVE_BOARD: (id: number) => Markup.button.callback('🏠 Активная доска', COMMANDS.TO_DETAIL_BOARD(id)),
  MAIN_SETTINGS: Markup.button.callback('⚙️ Настройки', COMMANDS.MAIN_SETTINGS),
  OK: Markup.button.callback('✅', COMMANDS.OK),
  CONTINUE: Markup.button.callback('➡️ Продолжить', COMMANDS.CONTINUE),
  BOARD_REPORT: Markup.button.callback('📊 Отчет', COMMANDS.BOARD_REPORT),
  BOARD_MANAGEMENT: (shouldAccess = false) => Markup.button.callback('🔐 Управление', COMMANDS.BOARD_MANAGEMENT, !shouldAccess),
  PAYMENT_LIST: Markup.button.callback('💳 Список платежей', COMMANDS.PAYMENT_LIST),
  CREATE_PAYMENT: (shouldAccess = false) => Markup.button.callback('💳 Добавить платеж', COMMANDS.CREATE_PAYMENT, !shouldAccess),
}

export const ACCESS_OPERATIONS = {
  ADMIN: ['board_management'],
  BOARD_USER: [],
}

export const TEXT = {
  START: 'Привет! Я бот для учета финансов. Для начала работы нажми кнопку "Доски учета"',
  BOARDS: 'Доски учета',
  BOARD_STATISTICS: (board: Board) => getTextStatisticsBoard(board),
  PERMISSION_DENIED: 'Доступ запрещен',
}

function getTextStatisticsBoard(board: Board) {
  return ''
    + `${getTextTitle('Избранная доска')}\n`
    + `\\#\\#\\#  ${board.name}  \\#\\#\\# \n`
    + `ID: ${board.id} \n`
    + `Максимальный баланс: ${board.amount_limit}`
}

function getTextTitle(msg: string) {
  return `\`${msg}\``
}
