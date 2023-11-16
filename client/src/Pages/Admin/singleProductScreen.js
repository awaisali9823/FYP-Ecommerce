import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { BiArrowBack } from "react-icons/bi";

const SingleProductScreen = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(`/api/product/get-single-product/${id}`);
      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);
  return (
    <Wrapper>
      <h1>
        <BiArrowBack
          className="cursor-pointer text-3xl mt-10"
          onClick={() => navigate("/admin-dashboard")}
        />
      </h1>
      <div className="flex w-full gap-[150px] items-start mt-20 pb-8">
        {product ? ( // Check if user data is available
          <>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={
                <img
                  slt="cover"
                  src="https://iidamidamerica.org/wp-content/uploads/2020/12/male-placeholder-image.jpeg"
                />
              }
            >
              <Meta title={`${product.productTitle}`} />{" "}
              {/* Display user name */}
            </Card>
            {/* <div className="mt-5">
              <h1 className="pb-5 text-3xl font-bold">User Details</h1>
              <p>
                <b>Name:</b> {user.userName}
              </p>
              <p>
                <b>Email:</b> {user.userEmail}
              </p>
              <p>
                <b>Address:</b> {user.address}
              </p>
            </div> */}
          </>
        ) : (
          <p>Loading Product data...</p> // Display a loading message
        )}
      </div>
    </Wrapper>
  );
};

export default SingleProductScreen;
