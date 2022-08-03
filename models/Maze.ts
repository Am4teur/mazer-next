import { ObjectId } from "mongodb";
import { model, models, Schema } from "mongoose";
import { IPlayer } from "player";

export interface IMaze {
  seed: String;
  players: Map<string, IPlayer>;
  owner: String;
  // coins: pos[] // [{x: 5, y: 5}, {x: 6, y: 7}]
  // bonusTimeIcons: pos[] // [{x: 5, y: 5}, {x: 6, y: 7}]
}

const mazeSchema = new Schema<IMaze>({
  seed: String,
  players: {
    type: Map,
    of: {
      userId: String,
      username: String,
      x: Number,
      y: Number,
      iconId: Number,
    },
  },
  owner: ObjectId,
});

const Maze = models.Maze || model<IMaze>("Maze", mazeSchema);
export default Maze;
