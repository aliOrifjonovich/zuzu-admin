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
import { AddIcon, DeleteIcon, RepeatIcon, Spinner } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";
import cls from "./dynamicTable.module.scss";

const DynecmicTable = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const cancelRef = React.useRef();

  useEffect(() => {
    getAll(slug).then((response) => setData(response.data));
  }, [slug]);

  const onDeleteClick = (id) => {
    setIsLoading(true);
    deleteById(slug, id).then(() =>
      getAll(slug)
        .then((response) => setData(response.data))
        .finally(() => setIsLoading(false))
    );
  };
  const fields = data?.length ? Object.keys(data[0]) : [];
  return (
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
              <Th>
                <Link to={`/${slug}/create`}>
                  <Button leftIcon={<AddIcon />} colorScheme="teal">
                    ADD
                  </Button>
                </Link>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((element) => (
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
                      isLoading={isLoading}
                      onClick={() => onDeleteClick(element.id)}
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
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DynecmicTable;
