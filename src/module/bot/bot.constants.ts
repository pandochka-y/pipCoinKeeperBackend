import { Markup } from 'telegraf'

import { Board } from '../board/board.model'

export const BotName = 'bot'

export const COMMANDS = {
  START: 'start',
  BOARDS: 'boards',
  OK: 'enter',
  CONTINUE: 'continue',
  MAIN_MENU: 'main',
  MAIN_SETTINGS: 'main_settings',
  TO_DETAIL_BOARD: (id: number) => `detail-board ${id}`,
  CREATE_BOARD: 'create_board',
  BACK: 'back',
}

export const SCENES = {
  BOARDS: 'boards',
  CREATE_BOARD: 'create_board',
}

export const BUTTONS = {
  CREATE_BOARD: Markup.button.callback('+ Создать доску', COMMANDS.CREATE_BOARD),
  BACK: Markup.button.callback('⬅ Назад', COMMANDS.BACK),
  BOARDS: Markup.button.callback('🗓 Доски учета', COMMANDS.BOARDS),
  TO_DETAIL_BOARD: (id: number, name: string) => Markup.button.callback(`🗓 Доска ${name}`, COMMANDS.TO_DETAIL_BOARD(id)),
  MAIN_MENU: Markup.button.callback('🏠 Главное меню', COMMANDS.MAIN_MENU),
  TO_ACTIVE_BOARD: (id: number) => Markup.button.callback('🏠 Активная доска', COMMANDS.TO_DETAIL_BOARD(id)),
  MAIN_SETTINGS: Markup.button.callback('⚙️ Настройки', COMMANDS.MAIN_SETTINGS),
  OK: Markup.button.callback('✅', COMMANDS.OK),
  CONTINUE: Markup.button.callback('➡️ Продолжить', COMMANDS.CONTINUE),
}

export const TEXT = {
  START: 'Привет! Я бот для учета финансов. Для начала работы нажми кнопку "Доски учета"',
  BOARDS: 'Доски учета',
  BOARD_STATISTICS: (board: Board) => getTextStatisticsBoard(board),
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
