export namespace ReplyApplicationEvent {
  export namespace ReplyCreated {
    export const key = 'reply.application.reply.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
