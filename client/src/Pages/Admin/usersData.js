import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { MdOutlineDeleteSweep } from "react-icons/md";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleDelete = async (userID) => {
    try {
      const response = await axios.delete(`/api/user/delete-user/${userID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        getAllUsers();
        toast.success("User Deleted Successfuly");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong2");
    }
  };

  const handleView = async (userId) => {
    try {
      const response = await axios.get(`/api/user/get-single-user/${userId}`);
      console.log(response);
      if (response.data.success) {
        navigate(`/user/${userId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/user/get-all-user");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-3 ">
          <div
            onClick={() => handleView(record._id)}
            className="  text-center   cursor-pointer"
          >
            <span className=" h-[30px] flex items-center justify-center rounded">
              <GrFormView size={24} />
            </span>
          </div>
          <div
            onClick={() => handleDelete(record._id)}
            className="  text-center   cursor-pointer"
          >
            <span className=" h-[30px] flex items-center justify-center rounded">
              <MdOutlineDeleteSweep size={24} />
            </span>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default UserData;
