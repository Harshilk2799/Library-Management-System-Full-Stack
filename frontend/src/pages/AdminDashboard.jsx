import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminDashboard() {
  const user = localStorage.getItem("adminUser");
  console.log(user);
  return <div>AdminDashboard</div>;
}

export default AdminDashboard;
