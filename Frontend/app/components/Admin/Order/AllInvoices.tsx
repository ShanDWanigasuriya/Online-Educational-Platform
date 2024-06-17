import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridToolbarProps } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import {
  useGetAllApproveCoursesQuery,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { Modal } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { IoCloseOutline } from "react-icons/io5";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllApproveCoursesQuery({});

  const [orderData, setOrderData] = useState<any>([]);

  const [selectedInvoiceData, setSelectedInvoiceData] = useState<any>(null);
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);


  // // Function to open/close the modal
  // const handleViewInvoice = (rowData: any) => {
  //   setSelectedInvoiceData(rowData);
  //   setOpenInvoiceModal(true);
  // };

  const handleCloseModal = () => {
    setOpenInvoiceModal(false);
  };
  const handleViewInvoice = (rowData: any) => {
    setSelectedInvoiceData(rowData);
    setOpenInvoiceModal(true);

    // Assuming selectedInvoiceData contains the charge.receipt_url
    const { charge } = rowData; // Access the charge object from rowData
    if (charge && charge.receipt_url) {
      // Redirect to the receipt_url
      window.location.href = charge.receipt_url;
    } else {
      console.error("Receipt URL not found in selected invoice data.");
      // Handle error or show a message if receipt_url is not available
    }
  };

  const handleGenerateReport = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define the title
    const title = "Financial Report";

    // Calculate text width for center alignment
    const fontSize = 16; // Adjust as needed
    const textWidth =
      (doc.getStringUnitWidth(title) * fontSize) / doc.internal.scaleFactor;
    const textOffset = (doc.internal.pageSize.width - textWidth) / 2;

    // Add the title to the PDF document
    doc.setFontSize(fontSize);
    doc.text(title, textOffset, 15);

    // Prepare table data
    let tableData = rows.map((row: any) => [
      row.userName,
      row.userEmail,
      row.title,
      row.price,
    ]);

    // Calculate total income and total orders
    const totalIncome = rows.reduce(
      (total: number, row: any) =>
        total + parseFloat(row.price.replace("$", "")),
      0
    );
    const totalOrders = rows.length;

    // Add summary rows to the table data
    tableData.push(["", "Total Orders:", totalOrders, ""]);
    tableData.push(["", "", "Total Income:", `$${totalIncome.toFixed(2)}`]);

    // Set up the table columns and rows
    doc.autoTable({
      head: [["Name", "Email", "Course Title", "Price"]],
      body: tableData,
      startY: 25, // Offset from the top after the title
    });

    // Save or download the PDF
    doc.save("financial_report.pdf");
  };

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: "viewInvoice",
            headerName: "View Invoice",
            flex: 0.3,
            renderCell: (params: any) => {
              return (
                <button onClick={() => handleViewInvoice(params.row)}>
                  <LiaFileInvoiceDollarSolid
                    className="dark:text-white text-black"
                    size={20}
                  />
                </button>
              );
            },
          },
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <button>
                  <a href={`mailto:${params.row.userEmail}`}>
                    <AiOutlineMail
                      className="dark:text-white text-black"
                      size={20}
                    />
                  </a>
                </button>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        created_at: format(item.createdAt),
      });
    });

  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box m={isDashboard ? "0" : "40px"}>
            {(!isDashboard && 
              <button
              onClick={handleGenerateReport}
              className="bg-blue-500 text-white py-2 px-4 rounded top-1 right-1"
            >
              Generate Report
            </button>
            )}
            <Box
              m={isDashboard ? "0" : "40px 0 0 0"}
              height={isDashboard ? "35vh" : "85vh"}
              overflow={"hidden"}
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid #ffffff30!important"
                      : "1px solid #ccc!important",
                },
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none!important",
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderTop: "none",
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid
                checkboxSelection={isDashboard ? false : true}
                rows={rows}
                columns={columns}
              />
            </Box>
          </Box>
        </>
      )}
      {openInvoiceModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
     <div className="w-144 bg-white rounded shadow-lg p-4 text-black">
      <div className="flex justify-between items-center mb-4"><br/><br/>
        <h2 className="text-lg font-bold text-center">INVOICE</h2>
        <IoCloseOutline
          size={32}
          className="text-black cursor-pointer"
          style={{ color: 'black' }}
          onClick={handleCloseModal}
        />
      </div>
      <div className="mt-4">
        {selectedInvoiceData && (
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold">Name:</td><td></td>
                <td className="font-semibold">{selectedInvoiceData.userName}</td>
              </tr>
              <tr>
                <td className="font-semibold">Email:</td><td></td>
                <td className="font-semibold">{selectedInvoiceData.userEmail}</td>
              </tr>
              <tr>
                <td className="font-semibold">Course Title:</td><td></td>
                <td className="font-semibold">{selectedInvoiceData.title}</td>
              </tr>
              <tr>
                <td className="font-semibold">Price:</td><td></td>
                <td className="font-semibold">{selectedInvoiceData.price}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div><br />
    </div>
  </div>
)}

    </div>
  );
};

export default AllInvoices;
