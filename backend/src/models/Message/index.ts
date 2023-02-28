import { Schema, model } from "mongoose";

export interface IMessage {
  conversationId: string;
  sender: string;
  text: string;
  time: string;
}

const messageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = model<IMessage>("Message", messageSchema);

export default Message;
