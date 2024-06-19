export const ProductDetail = ({ params }) => {
    const { id } = params;
    console.log(params);
    return `
    <h4>Chi Tiết sản phẩm ${id}</h4>
    <button onclick="navigate('/product')" >Back</button>
    `;
};
