import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { FaFileDownload } from "react-icons/fa";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const products = apiData.map(
    ({
      _id,
      shortDesc,
      images,
      quantity,
      minOrderQty,
      createdAt,
      isFavourite,
      longDesc,
      width,
      length,
      height,
      ...rest
    }) => ({ ...rest })
  );

  const exportToCSV = (products, fileName) => {
    const ws = XLSX.utils.json_to_sheet(products);
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          "ProductNumber",
          "ProductName",
          "Category",
          "SubCategory",
          "Price",
          "PK",
          "CTN",
          "UoM",
          "PkVolume",
          "CTNVolume",
          "PKWeight",
          "CTNWeight",
          "UPC",
          // "Madein",
        ],
      ],
      {
        origin: "A1",
      }
    );

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button onClick={(e) => exportToCSV(products, fileName)}>
      <FaFileDownload size={25} color="black" title="Export All Products" />
      {/* Export All Products */}
    </button>
  );
};
