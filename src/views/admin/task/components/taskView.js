import {
  Button,
  Grid,
  GridItem,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiLink } from "react-icons/bi";
import { useEffect } from "react";
import { useState } from "react";
import { getApi } from "services/api";
import Card from "components/card/Card";
import { IoIosArrowBack } from "react-icons/io";
import { HasAccess } from "../../../../redux/accessUtils";
import { HSeparator } from "components/separator/Separator";
import AddEdit from "./AddEdit";
import CommonDeleteModel from "components/commonDeleteModel";
import { deleteManyApi } from "services/api";

const TaskView = (props) => {
  const params = useParams();
  const { id } = params;
  const user = JSON.parse(localStorage.getItem("user"));

  const [contactAccess, leadAccess] = HasAccess(["Tasks", "Contacts", "Leads"]);

  const [data, setData] = useState();
  const { onClose } = useDisclosure();
  const [edit, setEdit] = useState(false);
  const [deleteManyModel, setDeleteManyModel] = useState(false);
  const navigate = useNavigate();

  const fetchViewData = async () => {
    if (id) {
      let result = await getApi(
        "api/task/view/",
        id?.event ? id?.event?._def?.extendedProps?._id : id
      );
      setData(result?.data);
    }
  };

  const handleDeleteTask = async (ids) => {
    try {
      let response = await deleteManyApi("api/task/deleteMany", ids);
      if (response.status === 200) {
        navigate("/task");
        setDeleteManyModel(false);
      }
    } catch (error) {
      console.error("error----->", error);
    }
  };

  useEffect(() => {
    fetchViewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, edit]);

  return (
    <div>
      <Card>
        <Grid
          templateColumns="repeat(12, 1fr)"
          mb={3}
          gap={1}
          justifyContent={"space-between"}
          alignItem={"center"}
        >
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Text fontSize="xl" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task View{" "}
            </Text>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Flex justifyContent={"right"}>
              <Link to="/task">
                <Button size="sm" leftIcon={<IoIosArrowBack />} variant="brand">
                  Back
                </Button>
              </Link>
            </Flex>
          </GridItem>
        </Grid>
        <HSeparator />
        <Grid templateColumns="repeat(12, 1fr)" gap={3} pt={3}>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task Title{" "}
            </Text>
            <Text>{data?.title ? data?.title : " - "}</Text>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task Related To{" "}
            </Text>
            <Text>{data?.category ? data?.category : " - "}</Text>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task start{" "}
            </Text>
            <Text>
              {data && data?.start
                ? data.allDay === true
                  ? moment(data.start).format("DD-MM-YYYY")
                  : moment(data.start).format("DD-MM-YYYY HH:mm A")
                : "-"}
            </Text>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task end{" "}
            </Text>
            <Text>
              {data?.allDay === true
                ? moment(data?.end).format("DD-MM-YYYY")
                : moment(data?.end).format("DD-MM-YYYY HH:mm A")}
            </Text>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task Link{" "}
            </Text>
            {data?.url ? (
              <a href={data?.url} target="_blank" rel="noreferrer">
                <IconButton borderRadius="10px" size="md" icon={<BiLink />} />
              </a>
            ) : (
              "-"
            )}
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task reminder{" "}
            </Text>
            <Text>{data?.reminder ? data?.reminder : " - "}</Text>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Assign To{" "}
            </Text>
            {data?.assignTo || data?.assignToLead ? (
              <Link
                to={
                  data?.assignTo
                    ? contactAccess?.view && `/contactView/${data?.assignTo}`
                    : leadAccess?.view && `/leadView/${data?.assignToLead}`
                }
              >
                <Text
                  color={
                    data?.category === "contact" &&
                    (contactAccess?.view || user?.role === "superAdmin")
                      ? "brand.600"
                      : leadAccess?.view ||
                        (user?.role === "superAdmin" &&
                          data?.category === "lead")
                      ? "brand.600"
                      : "blackAlpha.900"
                  }
                  sx={{
                    "&:hover": {
                      color: "blue.500",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {data?.assignToName ? data?.assignToName : " - "}
                </Text>
              </Link>
            ) : (
              <Text
                color={
                  data?.category === "contact" &&
                  (contactAccess?.view || user?.role === "superAdmin")
                    ? "brand.600"
                    : leadAccess?.view ||
                      (user?.role === "superAdmin" && data?.category === "lead")
                    ? "brand.600"
                    : "blackAlpha.900"
                }
                sx={{ "&:hover": { color: "blue.500" } }}
              >
                {data?.assignToName ? data?.assignToName : " - "}
              </Text>
            )}
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task createBy{" "}
            </Text>
            <Text>{data?.createByName ? data?.createByName : " - "}</Text>
          </GridItem>
          <GridItem colSpan={{ base: 12 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task Description
            </Text>
            <Text>{data?.description ? data?.description : " - "}</Text>
          </GridItem>
          <GridItem colSpan={{ base: 12 }}>
            <Text fontSize="sm" fontWeight="bold" color={"blackAlpha.900"}>
              {" "}
              Task notes{" "}
            </Text>
            <Text>{data?.notes ? data?.notes : " - "}</Text>
          </GridItem>
        </Grid>
      </Card>
      <AddEdit
        isOpen={edit}
        onClose={() => setEdit(false)}
        viewClose={onClose}
        id={id?.event ? id?.event?._def?.extendedProps?._id : id}
        userAction={"edit"}
      />
      <CommonDeleteModel
        isOpen={deleteManyModel}
        onClose={() => setDeleteManyModel(false)}
        type="Task"
        handleDeleteData={handleDeleteTask}
        ids={[id]}
      />
    </div>
  );
};

export default TaskView;
