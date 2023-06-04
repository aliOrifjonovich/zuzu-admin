import {
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { create } from "../../API/services";
import cls from "./product.module.scss";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductForm = () => {
  const { slug } = useParams();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const onChange = (name, value) => {
    setData((old) => ({ ...old, [`${name}`]: value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    create("products", data);
  };

  return (
    <form onSubmit={onSubmit} className={cls.form_wrapper}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            fontSize: "17px",
            fontWeight: "500",
          }}
          className={cls.breadCrumb}
        >
          <Link to="/"><p>Home</p></Link>
          <span>/</span>
          <Link to={`/${slug}`}><p>{slug}</p> </Link>
          <span>/</span>
          <span>Create Page</span>
        </Box>
        <Heading>Products</Heading>

        <Box>
          <FormLabel textTransform="capitalize">Name</FormLabel>
          <Input
            onChange={(e) => onChange("name", e.target.value)}
            value={data.name}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        <Box>
          <FormLabel textTransform="capitalize">description</FormLabel>
          <Input
            onChange={(e) => onChange("description", e.target.value)}
            value={data.description}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        <Box>
          <FormLabel textTransform="capitalize">price</FormLabel>
          <Input
            onChange={(e) => onChange("price", e.target.value)}
            value={data.price}
            type="number"
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        <Button leftIcon={<AddIcon />} colorScheme="blue" type="submit">
          ADD new branch
        </Button>
      </Box>
    </form>
  );
};

export default ProductForm;
