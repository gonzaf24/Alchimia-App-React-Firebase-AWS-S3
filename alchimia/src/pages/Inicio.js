import React from "react";
import { NavBarPublic } from "../components/NavBarPublic";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ThreeScene from "../components/3d/Inicio";

export const Inicio = () => {
  return (
    <>
      <NavBarPublic />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          marginTop: "40px",
          letterSpacing: "3px",
          textAlign: "center",
          height: "95vh",
        }}
      >
        <h2
          style={{
            height: " 150px",
            paddingTop: "20px",
            paddingBottom: "20px",
            letterSpacing: "3px",
          }}
        >
          aquí puedes encontrar compañeros para emprender <br />
          únete!
        </h2>
        <ThreeScene />
      </div>
    </>
  );
};
