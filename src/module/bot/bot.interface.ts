import { Context as BaseContext, Scenes } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

import { CreateBoardDto } from '../board/dto/create-board.dto'

export interface MySceneContext extends BaseContext {
  update: Update.CallbackQueryUpdate
  session: SessionData | MyWizardSession
  scene: Scenes.SceneContextScene<MySceneContext, MySceneSession> | Scenes.SceneContextScene<MyWizardContext, MyWizardSessionData>
  wizard?: Scenes.WizardContextWizard<MyWizardContext>
  match: any
}

interface ISceneSessionData {
  state: {
    board?: string
    boardAmount?: number
    limit?: string
    prevScene?: string[]
  }
  create_board: Partial<CreateBoardDto>
  should_active: boolean
}

interface SessionData extends Scenes.SceneSession<MySceneSession> {
  messageId: number
}

type MySceneSession = Scenes.SceneSessionData & ISceneSessionData

export interface MyWizardContext extends BaseContext {
  update: Update.CallbackQueryUpdate
  session: MyWizardSession
  scene: Scenes.SceneContextScene<MyWizardContext, MyWizardSessionData>
  wizard?: Scenes.WizardContextWizard<MyWizardContext>
  match: any
}

type MyWizardSessionData = Scenes.WizardSessionData & ISceneSessionData

interface MyWizardSession extends Scenes.WizardSession<MyWizardSessionData> {
  messageId: number
}
