import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const response = await axios.get("/api/product/get-all-product");
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {}
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `/api/product/delete-product/${productId}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleView = async (productId) => {
    try {
      const response = await axios.get(
        `/api/product/get-single-product/${productId}`
      );
      if (response.data.success) {
        navigate(`/product/${productId}`);
      }
    } catch (error) {}
  };

  const handleUpdate = async (productId) => {
    try {
      const response = await axios.put(
        `/api/product/update-product/${productId}`
      );
      if (response.data.success) {
        navigate(`/product/edit/${productId}`);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productTitle",
      key: "productTitle",
    },
    {
      title: "Stock",
      dataIndex: "productInventory",
      key: "productInventory",
    },
    {
      title: "Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-3">
          <div
            onClick={() => handleView(record._id)}
            className="   text-center  cursor-pointer"
          >
            <span className=" h-[30px] flex items-center justify-center rounded">
              <GrFormView size={24} />
            </span>
          </div>
          <div
            onClick={() => handleDelete(record._id)}
            className="   text-center   cursor-pointer"
          >
            <span className=" h-[30px] flex items-center justify-center rounded">
              <MdOutlineDeleteSweep size={24} />
            </span>
          </div>
          <div
            onClick={() => handleUpdate(record._id)}
            className="  text-center   cursor-pointer"
          >
            <span className=" h-[30px] flex items-center justify-center rounded">
              <FiEdit3 size={20} />
            </span>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div>
        <Table dataSource={products} columns={columns} />
      </div>
    </div>
  );
};

export default ProductList;
