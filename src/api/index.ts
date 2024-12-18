export async function getResult(userSelectedPoint: [number, number]) {
  // Simulate response time from the server
  await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, 300);
  });

  console.log("User Selected : " + userSelectedPoint);

  return {
    goalKeeperJumpPoint: userSelectedPoint,
  } as {
    goalKeeperJumpPoint: [number, number];
  };
}
