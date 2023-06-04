import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
  Box,
  Heading,
  Stack,
} from "@chakra-ui/react";

import cls from "./branch.module.scss";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { create, getById, update } from "../../API/services";
import { Link, useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

const BranchForm = () => {
  const { id, slug } = useParams();

  const [data, setData] = useState({
    name: "",
    description: "",
    from_time: "",
    to_time: "",
    address: "",
  });

  const onChange = (name, value) => {
    setData((old) => ({ ...old, [`${name}`]: value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      update("branches", id, data)
    } else {
      create("branches", data);
    }
  };

  useEffect(() => {
    if (id) {
      getById("branches", id).then((response) =>console.log(response.data));
    }
  }, []);

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
          <Link to="/">
            <p>Home</p>
          </Link>
          <span>/</span>
          <Link to={`/${slug}`}>
            <p>{slug}</p>{" "}
          </Link>
          <span>/</span>
          <span>Create Page</span>
        </Box>
        <Heading>Branch</Heading>

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
          <FormLabel textTransform="capitalize">starting time</FormLabel>
          <Input
            onChange={(e) => onChange("from_time", e.target.value)}
            value={data.from_time}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        <Box>
          <FormLabel textTransform="capitalize">ending time</FormLabel>
          <Input
            onChange={(e) => onChange("to_time", e.target.value)}
            value={data.to_time}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        <Box>
          <FormLabel textTransform="capitalize">Address</FormLabel>
          <Input
            onChange={(e) => onChange("address", e.target.value)}
            value={data.address}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        {id ? (
          <Button leftIcon={<AddIcon />} type="submit">
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

export default BranchForm;
