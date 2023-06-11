import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Button,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { deleteById, getAll } from "../../API/services";
import { AddIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import cls from "./dynamicTable.module.scss";
import { useMutation, useQuery } from "react-query";
import { Spinner } from "@chakra-ui/react";

const DynecmicTable = ({ searchValue }) => {
  const { id, slug } = useParams();
  // const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [deledeId, setDeleteId] = useState("");

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const cancelRef = React.useRef();
  const { isLoading, data, refetch } = useQuery(
    [["getAllData", searchValue], slug],
    () => getAll(`${slug}?name=${searchValue}`).then((res) => res.data)
  );
  const deleteMutation = useMutation(deleteById, {
    onSuccess: () => {
      refetch();
    },
  });

  const Loadingprocess = () => {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        sx={{ margin: "120px auto" }}
      />
    );
  };

  const onDeleteClick = (id) => {
    deleteMutation.mutate({ slug, id });
    setDeleteId(id);
  };
  const fields = data?.length ? Object.keys(data[0]) : [];
  const toast = useToast();

  return !isLoading ? (
    <>
      <div className={cls.table_wrapper}>
        <div className={cls.header}>
          <h1>{slug}</h1>
        </div>
        <TableContainer
          sx={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            margin: "0px 7px",
          }}
        >
          <Table variant="striped" colorScheme="teal" size="md">
            <Thead>
              <Tr>
                {fields.map((title) => (
                  <Th>{title}</Th>
                ))}
                {!!data.length ? (
                  <Th>
                    <Link to={`/${slug}/create`}>
                      <Button leftIcon={<AddIcon />} colorScheme="teal">
                        ADD
                      </Button>
                    </Link>
                  </Th>
                ) : null}
              </Tr>
            </Thead>
            <Tbody>
              {!!data?.length ? (
                data.map((element) => (
                  <Tr>
                    {fields.map((key) => (
                      <Td>{element[key]}</Td>
                    ))}
                    <Td>
                      <Flex gap={2}>
                        <Link to={`/${slug}/update/${element.id}`}>
                          <Button
                            // isLoading={isLoading}
                            leftIcon={<RepeatIcon />}
                            colorScheme="red"
                            // spinner={<BeatLoader size={8} color='white' />}
                          >
                            Update
                          </Button>
                        </Link>
                        <Button
                          isLoading={
                            element.id == deledeId
                              ? deleteMutation.isLoading
                              : null
                          }
                          onClick={() => {
                            toast({
                              title: "Deleted",
                              description: `Deleted ${element.name}`,
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                            onDeleteClick(element.id);
                          }}
                          leftIcon={<DeleteIcon />}
                          colorScheme="blue"
                          loadingText="Deleting..."
                          spinnerPlacement="start"
                        >
                          Delete
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <div className={cls.notFound}>
                  <h1>Not Founded</h1>
                  <img
                    src={
                      "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=170667a&w=0&k=20&c=gsR5TEhp1tfg-qj1DAYdghj9NfM0ldfNEMJUfAzHGtU="
                    }
                    alt="img"
                  />
                </div>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  ) : (
    <Loadingprocess />
  );
};

export default DynecmicTable;
