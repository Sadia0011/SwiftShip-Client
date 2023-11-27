import React from 'react';
import useGetAllDeliveryman from '../../../../Hooks/useGetAllDeliveryman';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const AllDeliveryman = () => {
    const [allDeliveryman]=useGetAllDeliveryman()
    return (
        <div>
            
            <SectionTitle subheading={"Information of"} heading={"All Delivery man"}></SectionTitle>
        <div>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Delivery Man's Name</th>
        <th>Phone Number</th>
        <th>Percel Delivered</th>
        <th>Average Review</th>
      </tr>
    </thead>
    <tbody>
      {allDeliveryman.map((deliveryman,index)=><tr
      key={deliveryman._id}>
        <th>{index+ 1}</th>
        <td>{deliveryman.name}</td>
        <td>{deliveryman?.phone}</td>
        <td>{}</td>
        <td>{}</td>
      </tr>)}
      
     
    </tbody>
  </table>
</div>

        </div>
        
        </div>
    );
};

export default AllDeliveryman;