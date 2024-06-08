export namespace HistoryApplicationEvent {
  export namespace HistoryCreated {
    export const key = 'history.application.history.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
