export namespace LocationApplicationEvent {
  export namespace LocationCreated {
    export const key = 'location.application.location.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
