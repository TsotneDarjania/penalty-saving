import { getRandomIntInRange } from "../helper";

export async function getResult(userSelectedPoint: [number, number]) {
  // Simulate response time from the server
  await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, 400);
  });

  const goalKeeperJumpPoint = [0, 0];
  const win = getRandomIntInRange(0, 1) === 0 ? false : true;

  if (win) {
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
    goalKeeperJumpPoint[0] = userSelectedPoint[0];
    goalKeeperJumpPoint[1] = userSelectedPoint[1];
  }

  return {
    goalKeeperJumpPoint,
    win,
  } as {
    goalKeeperJumpPoint: [number, number];
    win: boolean;
  };
}
