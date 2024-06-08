export namespace BusinessAccountApplicationEvent {
  export namespace BusinessAccountCreated {
    export const key = 'businessAccount.application.businessAccount.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
