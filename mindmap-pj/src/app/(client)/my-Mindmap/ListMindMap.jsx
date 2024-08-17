import Link from "next/link";
import DeleteButton from "./DeleteMindMap";
export default async function ListMindMap({ userId }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_LOCALE_URL_MINDMAP}/${userId}`,
        {
            cache: "no-cache",
        }
    );
    const data = await res.json();
    const dataList = data?.mindMapData;

    return (
        <div className="list-MindMap">
            <table className="w-full text-center border-separate border-spacing-2">
                <thead>
                    <tr>
                        <th width="30%">Tên</th>
                        <th width="30%">Tạo lúc</th>
                        <th width="30%"> Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList?.map((item) => (
                        <tr key={item.idMap}>
                            <td>{item.title}</td>
                            <td>{item.createdAt}</td>
                            <td>
                                <Link
                                    href={`/my-Mindmap/${item.idMap}`}
                                    className="mr-2  px-2 py-1 rounded bg-blue-500 text-white"
                                >
                                    Sửa
                                </Link>
                                <DeleteButton id={item.idMap} userId={userId} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
