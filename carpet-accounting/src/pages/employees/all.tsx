import Employees from "@/components/Sections/Table/Employee";
import React from "react";
import Head from "next/head";
function AllEmployees() {
  return (
    <>
      <Head>
        <title>Carpet Accounting</title>
      </Head>
      <Employees />
    </>
  );
}

export default AllEmployees;
