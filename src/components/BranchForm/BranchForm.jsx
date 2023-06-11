import {
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";

import cls from "./branch.module.scss";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { create, getById, update } from "../../API/services";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";

const BranchForm = () => {
  const { id, slug } = useParams();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const fromTimeRef = useRef();
  const toTimeRef = useRef();
  const addressRef = useRef();

  const [data, setData] = useState({
    name: "",
    description: "",
    from_time: "",
    to_time: "",
    address: "",
  });

  console.log("data", data);
  const toast = useToast();
  const updateMutation = useMutation(update, {
    onSuccess: () => {
    },
  });
  const createMutation = useMutation(create, {onSuccess: () => {}})
  // onChange Function
  const onChange = (name, value) => {
    setData((old) => ({ ...old, [`${name}`]: value }));
  };
  // onSubmit function
  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // updateMutation.mutate({ slug: "branches", id, data });
      update("branches", id, data);
    } else {
      console.log("data", data)
      // createMutation.mutate({ slug: "branches", data });
      create("branches", data);
    }
  };
  // onClear Function
  const onClear = () => {
    nameRef.current.value = "";
    descriptionRef.current.value = "";
    fromTimeRef.current.value = "";
    toTimeRef.current.value = "";
    addressRef.current.value = "";
  };

  useEffect(() => {
    if (id) {
      getById("branches", id).then((response) => {
        setData(response.data);
      });
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
            <p>{slug}</p>
          </Link>
          <span>/</span>
          <span>Create Page</span>
        </Box>
        <Heading>Branch</Heading>

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
        </Box>
        <Box>
          <FormLabel textTransform="capitalize">starting time</FormLabel>
          <Input
            ref={fromTimeRef}
            onChange={(e) => onChange("from_time", e.target.value)}
            value={data.from_time}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        <Box>
          <FormLabel textTransform="capitalize">ending time</FormLabel>
          <Input
            ref={toTimeRef}
            onChange={(e) => onChange("to_time", e.target.value)}
            value={data.to_time}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        <Box>
          <FormLabel textTransform="capitalize">Address</FormLabel>
          <Input
            ref={addressRef}
            onChange={(e) => onChange("address", e.target.value)}
            value={data.address}
          />
          <FormErrorMessage>We'll never share your email.</FormErrorMessage>
        </Box>
        {id ? (
          <Button
            width={"100%"}
            leftIcon={<AddIcon />}
            colorScheme="blue"
            type="submit"
            onClick={() => {
              toast({
                title: "Successfully updated",
                description: "Go to Branches List",
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
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            type="submit"
            onClick={() => {
              toast({
                title: "Successfully Added",
                description: "Go to Branches List",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              onClear();
            }}
          >
            ADD new branch
          </Button>
        )}
      </Box>
    </form>
  );
};

export default BranchForm;
