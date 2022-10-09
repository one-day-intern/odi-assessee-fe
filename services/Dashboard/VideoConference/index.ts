const getRoomToken = (userId: string) => {
  return {
    token: process.env.NEXT_PUBLIC_HMS_DEV_TOKEN,
  };
};

export { getRoomToken };
