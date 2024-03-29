import { Auth } from "~actions/login";

const { API_URL } = process.env;

interface Status {
    isExistInBD: boolean;
}

export default async function getStatus(
    accessToken: Auth["accessToken"] = null,
    url = window.location.href,
): Promise<Status | never> {
    if (!accessToken) {
        throw new Error("No access token");
    }
    const statusResponse = await fetch(`${API_URL}/api/v1/history-art`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ url }),
    });
    if (statusResponse.ok) {
        const status = await statusResponse.json();
        return status;
    }
    throw new Error("Wrong request");
}
