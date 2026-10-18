import React from "react";
import "./Button.css";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="button" {...props} />;
}
