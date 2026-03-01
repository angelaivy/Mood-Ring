import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../db";
import MoodForm from "./MoodForm";

export default function MoodRing() {

  return (
    <MoodForm />
  )
}



