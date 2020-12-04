
export interface INotification {
    _id: string;
    messageTime: string;
    from: string;
    message: string
    useremail:string
    userId:string
    statusRead:Boolean
    createdAt:Date
    updatedAt:Date
}