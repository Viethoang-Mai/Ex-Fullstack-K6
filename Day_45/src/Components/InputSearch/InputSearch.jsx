import React from "react";
import { debounce } from "../../configs/debounce";
export default function InputSearch({ setSearch }) {
    const handleSearch = debounce((e) => {
        setSearch((setSearch) => {
            return { ...setSearch, keyWord: e.target.value };
        });
    });
    return (
        <div className="min-w-72 mb-4 mt-8">
            <input
                onChange={handleSearch}
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:shadow-outline"
            />
        </div>
    );
}
