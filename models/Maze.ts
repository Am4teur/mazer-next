import { Schema, model, models } from "mongoose";

export interface IMaze {
  seed: String;
  players: [
    {
      username: String;
      x: Number;
      y: Number;
      iconType: String;
    }
  ];
}

const mazeSchema = new Schema<IMaze>({
  seed: String,
  players: [
    {
      username: String,
      x: Number,
      y: Number,
      iconType: String,
    },
  ],
  // owner: string,
});

const Maze = models.Maze || model<IMaze>("Maze", mazeSchema);
export default Maze;
