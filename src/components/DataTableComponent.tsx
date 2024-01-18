import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-dt/js/dataTables.dataTables";

interface DataTableProps {
  tableData: any[];
  setTableData: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataTableComponent: React.FC<DataTableProps> = ({
  tableData,
  setTableData,
}) => {
  const tableRef = useRef(null);

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
      responsive: true,
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
    <div className="w-full py-4 text-sm">
      <table
        ref={tableRef}
        cellSpacing="0"
        className="display responsive nowrap"
      ></table>
    </div>
  );
};

export default DataTableComponent;
