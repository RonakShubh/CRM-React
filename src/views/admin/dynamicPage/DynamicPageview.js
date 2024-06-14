import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Spinner from "components/spinner/Spinner";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { getApi } from "services/api";
import CustomView from "utils/customView";
import { useLocation } from "react-router-dom";

const View = () => {
  const param = useParams();

  const [data, setData] = useState();
  const { onOpen } = useDisclosure();
  const [isLoding, setIsLoding] = useState(false);
  const [action] = useState(false);
  const location = useLocation();
  const module = location.state.module;

  const pathName = (name) => {
    return `/${name.toLowerCase().replace(/ /g, "-")}`;
  };

  const fetchData = async () => {
    if (param.id) {
      try {
        setIsLoding(true);
        let response = await getApi(
          `api/form/view/${param.id}?moduleId=${module._id}`
        );
        setData(response?.data?.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoding(false);
      }
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  const fetchCustomData = async () => {
    const response = await getApi("api/custom-field?moduleName=Leads");
    return response;
  };

  useEffect(() => {
    if (fetchCustomData) fetchCustomData();
  }, [action]);

  return (
    <>
      {isLoding ? (
        <Flex justifyContent={"center"} alignItems={"center"} width="100%">
          <Spinner />
        </Flex>
      ) : (
        <>
          <GridItem colSpan={{ base: 12, md: 6 }} mt={{ sm: "3px", md: "5px" }}>
            <Flex justifyContent={"right"}>
              <Menu>
                <MenuButton
                  size="sm"
                  variant="outline"
                  colorScheme="blackAlpha"
                  mr={2.5}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                >
                  Actions
                </MenuButton>
                <MenuDivider />
                <MenuList minWidth={2}>
                  <MenuItem
                    color={"blue"}
                    onClick={() => onOpen()}
                    alignItems={"start"}
                    icon={<AddIcon />}
                  >
                    Add
                  </MenuItem>
                  <MenuItem
                    onClick={() => true}
                    alignItems={"start"}
                    icon={<EditIcon />}
                  >
                    Edit
                  </MenuItem>
                  <>
                    <MenuDivider />
                    <MenuItem
                      alignItems={"start"}
                      color={"red"}
                      onClick={() => true}
                      icon={<DeleteIcon />}
                    >
                      Delete
                    </MenuItem>
                  </>
                </MenuList>
              </Menu>
              <Link to={pathName(module.moduleName)}>
                <Button leftIcon={<IoIosArrowBack />} size="sm" variant="brand">
                  Back
                </Button>
              </Link>
            </Flex>
          </GridItem>
          <Box style={{ margin: "10px 0" }}>
            <CustomView data={module} fieldData={data} />
          </Box>
          <Card mt={3}>
            <Grid templateColumns="repeat(6, 1fr)" gap={1}>
              <GridItem colStart={6}>
                <Flex justifyContent={"right"}>
                  <Button
                    size="sm"
                    onClick={() => true}
                    leftIcon={<EditIcon />}
                    mr={2.5}
                    variant="outline"
                    colorScheme="green"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    style={{ background: "red.800" }}
                    onClick={() => true}
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Card>
        </>
      )}
    </>
  );
};

export default View;
