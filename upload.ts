function canCross(stones: number[]): boolean {
  if (stones[0] !== 0 || stones[1] !== 1) return false;
  if (stones[0] == 0 && stones[1] == 1 && stones.length == 2) return true;

  class Position {
    public stone: number;
    public speed: number;
    public constructor(stone: number, speed: number) {
      this.stone = stone;
      this.speed = speed;
    }
    public getPossibleNextPositions(): Array<[number, number]> {
      const returnable: Array<[number, number]> = [];
      if (this.speed - 1 > 0) {
        returnable.push([this.stone + this.speed - 1, this.speed - 1]);
      }
      returnable.push([this.stone + this.speed, this.speed]);
      returnable.push([this.stone + this.speed + 1, this.speed + 1]);
      return returnable;
    }
    public generateStringRepresentation(): string {
      return `${this.stone}_${this.speed}`;
    }
    public static generateStringRepresentation(position: number, speed: number): string {
      return `${position}_${speed}`;
    }
  }
  const validStones = new Set<number>(stones);
  const priorMoves = new Set<string>();
  const end = stones[stones.length - 1];
  const startingPosition = new Position(1, 1);
  let currentTurn: Position[] = [startingPosition];
  let nextTurn: Position[] = [];
  priorMoves.add(startingPosition.generateStringRepresentation());
  let found = false;
  while (currentTurn.length > 0 && !found) {
    for (let i = 0; i < currentTurn.length; i++) {
      currentTurn[i].getPossibleNextPositions().forEach(([position, speed]) => {
        if (validStones.has(position) && !priorMoves.has(Position.generateStringRepresentation(position, speed))) {
          if (position === end) {
            found = true;
          }
          const newPos = new Position(position, speed);
          nextTurn.push(newPos);
          priorMoves.add(newPos.generateStringRepresentation());
        }
      });
    }
    currentTurn = nextTurn;
    nextTurn = [];
  }
  return found;
}

console.log(canCross([0, 1, 3, 5, 6, 8, 12, 17]));
