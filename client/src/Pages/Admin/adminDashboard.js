import React from "react";
import Wrapper from "../../components/Wrapper";
import { Tabs } from "antd";
import UserData from "./usersData";
import ProductData from "./productData";

const AdminDashboard = () => {
  const items = [
    {
      key: "1",
      label: "Users",
      children: <UserData />,
    },
    {
      key: "2",
      label: "Products",
      children: <ProductData />,
    },
  ];
  return (
    <Wrapper>
      <div className="mt-10">
        <Tabs tabPosition="left" items={items} />
      </div>
    </Wrapper>
  );
};

export default AdminDashboard;
