const postLogin = async (url: string, requestData: LoginDetails) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  const json = await response.json();
  console.log(json);
  return { isOk: response.ok, data: json } ;
};

export { postLogin };
