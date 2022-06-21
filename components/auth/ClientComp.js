import React, { useState } from "react";
import ButtonContainer from "../UI/button-container";
import Toast from "../UI/toast";
import { useSession } from "next-auth/client";

async function saveConcern(lat, lng, type) {
  const response = await fetch("/api/concern/add", {
    method: "post",
    body: JSON.stringify({
      lat,
      lng,
      type,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function ClientComp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [session, loading] = useSession();

  async function handleConcern(type) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          setIsLoading(true);
          await saveConcern(
            position.coords.latitude,
            position.coords.longitude,
            type
          );
          Toast({
            icon: "success",
            title: "Help is on the way!",
            content: "Your request was successfully sent.",
            timer: 3000,
          });
          setIsLoading(false);
        } catch (error) {
          Toast({
            icon: "error",
            title: "You've Already Sent Help!",
            content: "Please be patient, help is on the way",
            timer: 3000,
          });
          setIsLoading(false);
          setIsError(true);
        }
      });
    } else {
      setIsSave(false);
      setIsError(true);
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-secondary">Welcome to OneTap</h1>
          <p className="text-muted">
            {loading === false && session && session.user.status === "pending"
              ? "You have a pending request that needs to be processed in order to request another help. Please be patient."
              : `Do you need help? Please click one of the buttons below based on how
            urgent you need assistance.`}
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        {isLoading && (
          <div className="row justify-content-center">
            <div className="spinner-border text-primary me-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Loading ...
          </div>
        )}
        <ButtonContainer
          handleClick={handleConcern.bind(this, "general_concern")}
          title={"GENERAL CONCERN"}
          description={
            "Press this button when your concern is not really that serious"
          }
          type={"primary"}
          disable={
            isError || (session && session.user.status === "pending")
              ? true
              : false
          }
        />

        <ButtonContainer
          handleClick={handleConcern.bind(this, "urgent_concern")}
          title={"URGENT CONCERN"}
          description={
            "Press this button when your concern really serious and needs action right away."
          }
          type={"danger"}
          disable={
            isError || (session && session.user.status === "pending")
              ? true
              : false
          }
        />
      </div>
    </div>
  );
}

export default ClientComp;
