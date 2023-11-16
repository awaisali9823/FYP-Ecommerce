import React from "react";
import { Tabs } from "antd";
import AddProduct from "./addProduct";
import ProductList from "./productList";

const ProductData = () => {
  const items = [
    {
      key: "1",
      label: "New Product",
      children: <AddProduct />,
    },
    {
      key: "2",
      label: "Products",
      children: <ProductList />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" items={items} />
    </div>
  );
};

export default ProductData;
