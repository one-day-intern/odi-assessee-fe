const postCompany = async (url: string, responseData: CompanySignupStoreElements) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(responseData)
    });

    const json = await response.json();
    return json;
}

export { postCompany }