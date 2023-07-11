import { Context as BaseContext, Scenes } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'
import { I18nContext } from '@esindger/telegraf-i18n'

import { CreateBoardDto } from '../board/dto/create-board.dto'

export interface MyContext extends BaseContext {
  update: Update.CallbackQueryUpdate
  session: Session
  scene: Scenes.SceneContextScene<MyContext, MySession>
  wizard: Scenes.WizardContextWizard<MyContext>
  match: string
  i18n: I18nContext
}

export interface MySession extends Scenes.WizardSessionData {

  // FIXME: think about structure, learn about state of the session
  state: {
    prevScene?: string[]
    detail_board?: {
      board_id?: number
      board_user_id?: number
      roleName?: string
    }
    current_page?: number
  }
  create?: {
    board: {
      data: Partial<CreateBoardDto>
      should_favorite: boolean
    }
  }
}

interface Session extends Scenes.WizardSession<MySession> {
  messageId?: number
  user_id?: number
  favorite_board_id?: number
  current_scene?: string
}
