import React from "react";

export default function AppInitializer( { children } : { children: React.ReactNode} ){
  return (
    <>
      {children}
    </>
  )
}