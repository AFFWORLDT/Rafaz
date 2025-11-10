"use client";
import DetailPage from "@/src/view/rent/detailPage";
import { useParams } from "next/navigation";
import React from "react";

function RentDetails() {
  const { buyId } = useParams();
  // Handle both string and array cases from useParams
  const id = Array.isArray(buyId) ? buyId[0] : buyId;

  return (
    <div>
        <DetailPage id={id} />
    </div>
  );
}

export default RentDetails;
