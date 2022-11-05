const getRoomToken = (userId: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conference/join/?userId=${userId}`).then(res => res.json());
};

export { getRoomToken };
