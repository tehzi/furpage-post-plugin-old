export default async function getStatus(url = window.location.href) {
    const { protocol } = new URL(url);
    const urlParams = new URLSearchParams({
        method: "isURL2",
        url,
    }).toString();
    let response = await fetch(`${protocol}//furrycard.furries.ru/api.php?${urlParams}`);
    if (response.ok) {
        response = await response.json();
        return response;
    }
    throw new Error("Wrong request");
}
