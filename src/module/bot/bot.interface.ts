import { Context as BaseContext, Scenes } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

import { CreateBoardDto } from '../board/dto/create-board.dto'

export interface MyContext extends BaseContext {
  update: Update.CallbackQueryUpdate
  session: Session
  scene: Scenes.SceneContextScene<MyContext, MySession>
  wizard: Scenes.WizardContextWizard<MyContext>
  match: any
}

interface MySession extends Scenes.WizardSessionData {
  state: {
    limit?: string
    board_id: number
    prevScene?: string[]
  }
  create_board: Partial<CreateBoardDto>
  should_favorite: boolean
}

interface Session extends Scenes.WizardSession<MySession> {
  messageId?: number
  user_id?: number
  current_scene?: string
}
