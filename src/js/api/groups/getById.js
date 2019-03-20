import fetchJsonp from "fetch-jsonp";

export default async function getById(groupId, accessToken, fields = ["admin_level"], v = "5.52") {
    if (groupId) {
        const urlSearch = new URLSearchParams({
            group_id: groupId,
            fields: fields.length > 1 ? fields.join(",").slice(0, -1) : fields,
            access_token: accessToken,
            v,
        }).toString();
        const response = await fetchJsonp(`https://api.vk.com/method/groups.getById?${urlSearch}`);
        if (response.ok) {
            const {
                response: [group] = [],
                error = false,
            } = await response.json();
            return group || error;
        }
    }
    throw new Error("Wrong getById");
}
