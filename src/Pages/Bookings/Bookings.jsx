import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingsRow from "./BookingsRow";
import { useNavigate } from "react-router-dom";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate=useNavigate();

    const url = `http://localhost:5000/bookings?email=${user?.email}`

    useEffect(() => {
        fetch(url,{
            method:'GET',
            headers:{
                authorization:`Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }
                else{
                    navigate('/');
                }
                
            })
    }, [url,navigate])


    const handleDelete=id=>{
        const proceed=confirm('Are you sure you want to delete')
        if (proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method:'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.deletedCount>0){
                    alert('Delete successfull')
                    const remaining=bookings.filter(booking=>booking._id !==id);
                    setBookings(remaining);
                }
            })
        }
    }


    const handleBookingConfirm= id =>{
    fetch(`http://localhost:5000/bookings/${id}`,{
        method:'PATCH',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({status:'confirm'})
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.modifiedCount>0){
            // update 
            const remainings=bookings.filter(booking=>booking._id !==id);
            const update=bookings.find(booking=> booking._id ===id);
            update.status='confirm'
            const newBookings=[update,...remainings];
            setBookings(newBookings);
        }
    })
}


    return (
        <div>
            <h2>Your bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>price</th>
                            <th>Satatus</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        bookings.map(booking=> <BookingsRow
                        key={booking._id}
                        booking={booking}
                        handleDelete={handleDelete}
                        handleBookingConfirm={handleBookingConfirm}
                        
                        ></BookingsRow>)
                       }
                        
                      
                       
                    </tbody>
                   

                </table>
            </div>
        </div>
    );
};

export default Bookings;