import axios from "axios";
import { useEffect, useState } from "react";
import v1 from "../images/v1.jpg";
import { Rental } from "../types/UserDetails";

export default function GetVehicles() {
  const [users, setUsers] = useState<Rental[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/vehicles', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200) {
          const extractedData = response.data.map((user : Rental) => ({
            totalBill: user.total_bill,
            paymentMode: user.payment_mode
          }));
          setUsers(response.data);
          console.log(response.data);
        } else {
          console.error('Failed to fetch users data');
        }
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* <div>
        <div className="container d-flex">
          <div className="card mt-3 car-card shadow-2xl">
            <div className="card-header">
              <img src={v1} alt="Image 1" />
            </div>
            <div className="card-body">
              <p>Total Bill:100 R</p>
              <p>Payment Status :Paid</p>
            </div>
          </div>
        </div>
      </div> */}
        <div className="container d-flex">
        {users.map((user, index) => (
          <div className="card mt-3 car-card shadow-2xl" key={index}>
            <div className="card-header">
              <img src={v1} alt={`Image ${index + 1}`} />
            </div>
            <div className="card-body"> 
              <p>Total Bill: {user.total_bill} </p>
              <p>Payment Status: {user.payment_mode}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
