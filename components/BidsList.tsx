"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const BidsList = ({ productId }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/order?_id=${productId}`);
        setBids(response.data);
      } catch (error) {
        console.error("Failed to fetch bids:", error);
      }
    };

    fetchBids();
  }, [productId]);
  return (
    <div>
      {bids.length > 0 ? (
        bids.map((bid) => (
          <div key={bid.id} className="flex items-center mb-4">
            <Image
              src={bid.imageUrl}
              alt={bid.customerName}
              width={50}
              height={50}
              className="rounded-full mr-4"
            />
            <div>
              <div className="font-bold">{bid.customerName}</div>
              <div>E-mail: {bid.customerEmail}</div>
              <div>Bid Amount: ₹{bid.biddingAmount}</div>
              <div>Bid Time: {new Date(bid.timestamp).toLocaleString()}</div>
            </div>
          </div>
        ))
      ) : (
        <div>No bids found for this product.</div>
      )}
    </div>
  );
};

export default BidsList;