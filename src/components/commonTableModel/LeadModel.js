import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LeadTable from "./Lead";
import Spinner from "components/spinner/Spinner";
import { GiClick } from "react-icons/gi";

const ContactModel = (props) => {
  const { onClose, isOpen, fieldName, setFieldValue, data } = props;
  const [selectedValues, setSelectedValues] = useState();
  const [isLoding, setIsLoding] = useState(false);

  const columns = [
    { Header: "#", accessor: "_id", isSortable: false, width: 10 },
    { Header: "Lead Name", accessor: "leadName", width: 20 },
    { Header: "Lead Email", accessor: "leadEmail" },
    { Header: "Lead PhoneNumber", accessor: "leadPhoneNumber" },
    { Header: "Lead Address", accessor: "leadAddress" },
    { Header: "Lead Status", accessor: "leadStatus" },
    { Header: "Lead Owner", accessor: "leadOwner" },
    { Header: "Lead Score", accessor: "leadScore" },
  ];

  const handleSubmit = async () => {
    try {
      setIsLoding(true);
      setFieldValue(fieldName, selectedValues);
      onClose();
    } catch (e) {
      console.error("error----->", e);
    } finally {
      setIsLoding(false);
    }
  };

  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Lead</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoding ? (
            <Flex justifyContent={"center"} alignItems={"center"} width="100%">
              <Spinner />
            </Flex>
          ) : (
            <LeadTable
              tableData={data}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              columnsData={columns}
              title="Lead"
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="brand"
            size="sm"
            me={2}
            onClick={handleSubmit}
            disabled={isLoding ? true : false}
            leftIcon={<GiClick />}
          >
            {" "}
            {isLoding ? <Spinner /> : "Select"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            colorScheme="red"
            onClick={() => onClose()}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContactModel;
