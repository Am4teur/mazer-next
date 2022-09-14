declare module "player" {
  interface IPlayer {
    userId: string;
    username: string;
    x: number;
    y: number;
    prevX: number;
    prevY: number;
    iconId: number;
  }
}
