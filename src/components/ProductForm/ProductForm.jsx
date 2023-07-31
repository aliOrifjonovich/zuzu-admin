import {
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";
import { create, getById, update } from "../../API/services";
import cls from "./product.module.scss";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const ProductForm = () => {
  const { id, slug } = useParams();
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const onChange = (name, value) => {
    setData((old) => ({ ...old, [`${name}`]: value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      update("products", id, data);
    } else {
      create("products", data);
    }
  };

  const onClear = () => {
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = "";
  };

  useEffect(() => {
    if (id) {
      getById("products", id).then((response) => {
        setData(response.data);
      });
    }
  }, []);
  const toast = useToast();

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
          <Link to={`/${slug}`}>
            <p>{slug}</p>{" "}
          </Link>
          <span>/</span>
          <span>Create Page</span>
        </Box>
        <Heading>Products</Heading>

        <Box>
          <FormLabel textTransform="capitalize">Name</FormLabel>
          <Input
            ref={nameRef}
            onChange={(e) => onChange("name", e.target.value)}
            value={data.name}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        <Box>
          <FormLabel textTransform="capitalize">description</FormLabel>
          <Input
            ref={descriptionRef}
            onChange={(e) => onChange("description", e.target.value)}
            value={data.description}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        <Box>
          <FormLabel textTransform="capitalize">price</FormLabel>
          <Input
            ref={priceRef}
            onChange={(e) => onChange("price", e.target.value)}
            value={data.price}
            type="number"
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        {id ? (
          <Button
            leftIcon={<RepeatIcon />}
            colorScheme="blue"
            type="submit"
            onClick={() => {
              toast({
                title: "Successfully updated",
                description: "Go to Products List",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              onClear();
            }}
          >
            Update
          </Button>
        ) : (
          <Button leftIcon={<AddIcon />} colorScheme="blue" type="submit">
            ADD new branch
          </Button>
        )}
      </Box>
    </form>
  );
};

export default ProductForm;
