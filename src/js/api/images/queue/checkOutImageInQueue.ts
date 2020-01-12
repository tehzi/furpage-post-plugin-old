import { Auth } from "~actions/login";
import { ApiError } from "~types/ApiError";

const { API_URL } = process.env;

export interface CheckOutImageInQueue {
    isExistInQueue: boolean;
}

export default async function checkOutImageInQueue(
    accessToken: Auth["accessToken"],
    url = window.location.href,
): Promise<CheckOutImageInQueue | ApiError | never> {
    if (!accessToken) {
        throw new Error("No access token");
    }
    const queueStatusResponse = await fetch(
        `${API_URL}/api/v1/history-art/queue`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ url }),
        },
    );

    if (queueStatusResponse.ok) {
        const queueStatus = await queueStatusResponse.json();
        return queueStatus;
    }

    throw new Error("Wrong request");
}
