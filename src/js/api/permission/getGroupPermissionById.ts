import fetchJsonp from "fetch-jsonp";

export interface GroupPermission {
    admin_level: 0 | 1 | 2 | 3;
}

export default async function getGroupPermissionById(
    groupId: string,
    accessToken: string,
    fields = ["admin_level"],
    v = "5.52",
): Promise<GroupPermission | string> {
    if (groupId) {
        const urlSearch = new URLSearchParams({
            group_id: groupId,
            fields: fields.join(","),
            access_token: accessToken,
            v,
        }).toString();
        const response = await fetchJsonp(
            `https://api.vk.com/method/groups.getById?${urlSearch}`,
        );
        if (response.ok) {
            const {
                response: [group] = [],
                error = false,
            } = await response.json();
            return group || error;
        }
    }
    throw new Error("Wrong getGroupPermissionById");
}
