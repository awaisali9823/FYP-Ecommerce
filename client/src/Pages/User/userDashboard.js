import React from "react";
import Wrapper from "../../components/Wrapper";
import { Tabs } from "antd";
import UserProfile from "./userProfile";

const UserDashboard = () => {
  const userItems = [
    {
      key: "1",
      label: "Profile",
      children: <UserProfile />,
    },
    {
      key: "2",
      label: "Orders",
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <Wrapper>
      <div className="mt-10">
        <Tabs tabPosition="left" items={userItems} />
      </div>
    </Wrapper>
  );
};

export default UserDashboard;
