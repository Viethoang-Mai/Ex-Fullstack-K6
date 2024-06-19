import React from "react";
export default function PopularImage({ alt, src }) {
    return <img src={src} alt={alt} className="w-40 grayscale opacity-75" />;
}
