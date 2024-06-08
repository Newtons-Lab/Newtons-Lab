export namespace AiPromptApplicationEvent {
  export namespace AiPromptCreated {
    export const key = 'aiPrompt.application.aiPrompt.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
