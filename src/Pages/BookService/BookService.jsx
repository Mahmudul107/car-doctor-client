import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const BookService = () => {
  const service = useLoaderData();
  const { title, _id,  price, img } = service;
  const { user } = useContext(AuthContext)
 

  const handleBookService = e => {
    e.preventDefault()

    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;


    const booking = {
        customerName: name,
        email,
        img,
        date,
        service: title,
        service_id: _id,
        price
    }
    console.log(booking);

    fetch('https://car-doctor-server-chi-taupe.vercel.app/bookings', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(booking)
    })
    .then(res => res.json())
    .then( data => {
        console.log(data);
        if(data.insertedId){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your order has been added successfully',
                showConfirmButton: false,
                timer: 1500
              })
        }
    })
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Book Service : {title}</h1>
      <form onSubmit={handleBookService}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              placeholder="name"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              name="date"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              placeholder="email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Amount</span>
            </label>
            <input
              type="text"
              defaultValue={'$ ' + price}
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <input
            className="btn btn-block btn-primary"
            type="submit"
            value="Order Confirm"
          />
        </div>
      </form>
    </div>
  );
};

export default BookService;
