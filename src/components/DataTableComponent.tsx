import React, { useState, useEffect, useRef } from "react";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import {
  getPersonalDetailsData,
  getAddressDetailsData,
} from "../store/selectors/selectors";

const DataTableComponent = () => {
  const tableRef = useRef(null);
  const updatedPersonalData = useSelector(getPersonalDetailsData);
  const updatedAddressData = useSelector(getAddressDetailsData);

  const [tableData, setTableData] = useState<any[]>([]);

  const handleShow = () => {
    // console.log(updatedPersonalData);
    // console.log(updatedAddressData);
    const newData = {
      fullName: updatedPersonalData.fullName,
      age: updatedPersonalData.age,
      sex: updatedPersonalData.sex,
      mobileNo: updatedPersonalData.mobileNo,
      govtIdType: updatedPersonalData.govtIdType,
      govtId: updatedPersonalData.govtId,
      address: updatedAddressData.address,
      city: updatedAddressData.city,
      state: updatedAddressData.state,
      country: updatedAddressData.country,
      pinCode: updatedAddressData.pinCode,
    };

    setTableData((prevData) => [...prevData, newData]);
  };

  useEffect(() => {
    const table = $(tableRef.current as any).DataTable({
      data: tableData,
      columns: [
        { title: "Name", data: "fullName" },
        { title: "Age", data: "age" },
        { title: "Sex", data: "sex" },
        { title: "Mobile No.", data: "mobileNo" },
        { title: "Govt Id Type", data: "govtIdType" },
        { title: "Govt Id", data: "govtId" },
        { title: "Address", data: "address" },
        { title: "City", data: "city" },
        { title: "State", data: "state" },
        { title: "Country", data: "country" },
        { title: "Pincode", data: "pinCode" },
      ],
    });

    return () => {
      table.destroy();
    };
  }, [setTableData]);

  useEffect(() => {
    const table = $(tableRef.current as any).DataTable();
    table.clear().rows.add(tableData).draw();
  }, [tableData]);

  return (
    <div className="w-full whitespace-nowrap">
      <Button variant="contained" onClick={handleShow}>
        Show Table
      </Button>

      <div className="mt-8 "></div>

      <table ref={tableRef} className="display w-full"></table>
    </div>
  );
};

export default DataTableComponent;
