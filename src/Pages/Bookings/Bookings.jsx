import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate()

  const url = `https://car-doctor-server-chi-taupe.vercel.app/bookings?email=${user?.email}`;
  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: { authorization: `Bearer ${localStorage.getItem('Car-access-token')}`}
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error){
          setBookings(data)
        }
        else{
          navigate('/')
        }
      });
  }, [url, navigate]);

  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://car-doctor-server-chi-taupe.vercel.app/bookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your Coffee has been deleted.",
                "success"
              );
              const remaining = bookings.filter(
                (booking) => booking._id !== id
              );
              setBookings(remaining);
            }
          });
      }
    });
  };
  

  const handleBookingConfirm = id => {
    fetch(`https://car-doctor-server-chi-taupe.vercel.app/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({status: 'confirm' })
    })
    .then( res => res.json())
    .then( data => console.log(data) );

    if(data.modifiedCount > 0) {
      // update state
      const remaining = bookings.filter( book => book._id !==id);
      const updated = bookings.find( book => book._id === id );
      updated.status = 'confirm';
      const newBookings  = [ updated, ...remaining ];
      setBookings(newBookings)
    }
  }
  

  return (
    <div>
      <h2 className="text-5xl"> Your Bookings : {bookings.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Picture</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                bookings.map(booking => <BookingRow
                    key={booking._id}
                    booking={booking}
                    handleDelete={handleDelete}
                    handleBookingConfirm={handleBookingConfirm}
                />)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
