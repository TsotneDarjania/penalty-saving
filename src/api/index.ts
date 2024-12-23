import { getRandomIntInRange } from "../helper";

let bonusFactor = 0;

export async function getResult(userSelectedPoint: [number, number]) {
  // Simulate response time from the server
  await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, 400);
  });

  const goalKeeperJumpPoint = [0, 0];
  const win = getRandomIntInRange(0, 1) === 0 ? true : true;

  if (win) {
    bonusFactor++;
    if (bonusFactor === 6) {
      bonusFactor = 1;
    }

    let randomX = getRandomIntInRange(0, 2);
    let randomY = getRandomIntInRange(0, 2);

    while (randomX === userSelectedPoint[0]) {
      randomX = getRandomIntInRange(0, 2);
    }

    while (randomY === userSelectedPoint[1]) {
      randomY = getRandomIntInRange(0, 2);
    }

    goalKeeperJumpPoint[0] = randomX;
    goalKeeperJumpPoint[1] = randomY;
  } else {
    bonusFactor = 1;
    goalKeeperJumpPoint[0] = userSelectedPoint[0];
    goalKeeperJumpPoint[1] = userSelectedPoint[1];
  }

  return {
    goalKeeperJumpPoint,
    win,
    bonusFactor,
  } as {
    goalKeeperJumpPoint: [number, number];
    win: boolean;
    bonusFactor: number;
  };
}
