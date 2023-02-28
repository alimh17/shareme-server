import { Schema, model } from "mongoose";

export interface IConversations {
  members: [];
}

const conversationsSchema = new Schema<IConversations>(
  {
    members: Array,
  },
  { timestamps: true }
);

const Conversations = model<IConversations>(
  "Conversations",
  conversationsSchema
);

export default Conversations;
