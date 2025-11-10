"use client";
import DetailPage from "@/src/view/offPlans/detailPage";
import { useParams } from "next/navigation";
import React from "react";

function OffPlaneDetails() {
  const { offplanId } = useParams();
  // Handle both string and array cases from useParams
  const id = Array.isArray(offplanId) ? offplanId[0] : offplanId;
  return <div>
    <DetailPage id={id} />
  </div>;
}

export default OffPlaneDetails;
