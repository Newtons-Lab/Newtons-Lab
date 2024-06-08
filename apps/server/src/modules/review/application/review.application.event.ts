export namespace ReviewApplicationEvent {
  export namespace ReviewCreated {
    export const key = 'review.application.review.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
