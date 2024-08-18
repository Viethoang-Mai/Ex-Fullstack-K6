export const getMindMapById = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_MINDMAP}/${id}`, {
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};
export const postMindMap = async (mindMap, userId) => {
    // Fetch toàn bộ dữ liệu người dùng từ JSON Server
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_MINDMAP}`);
    const data = await res.json();

    // Tìm người dùng với ID cụ thể
    let user = data.find((user) => user.id === userId);

    if (!user) {
        // Nếu người dùng chưa tồn tại, tạo người dùng mới
        user = {
            id: userId,
            mindMapData: mindMap,
        };

        // Thêm người dùng mới vào mảng users
        data.push(user);

        // Gửi yêu cầu POST để thêm người dùng mới vào JSON Server
        const createRes = await fetch(
            `${process.env.NEXT_PUBLIC_URL_MINDMAP}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );

        if (!createRes.ok) {
            throw new Error("Failed to create new user");
        }

        return await createRes.json();
    } else {
        // Nếu người dùng đã tồn tại, thêm bản đồ mới vào mindMapData của người đó
        user.mindMapData.push(...mindMap);
        console.log(user.mindMapData);

        // Gửi yêu cầu PUT để cập nhật người dùng hiện có với dữ liệu mới
        const updateRes = await fetch(
            `${process.env.NEXT_PUBLIC_URL_MINDMAP}/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );

        if (!updateRes.ok) {
            throw new Error("Failed to update mindMapData");
        }

        return await updateRes.json();
    }
};

export const findMindMap = async (idMap) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_MINDMAP}`);
    const data = await res.json();

    let mindMap;
    let ownerId;

    data.forEach((user) => {
        const foundMap = user.mindMapData.find((map) => map.idMap === idMap);
        if (foundMap) {
            mindMap = foundMap;
            ownerId = user.id;
        }
    });

    return { mindMap, ownerId };
};

export const getMinMap = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_URL_MINDMAP, {
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};
