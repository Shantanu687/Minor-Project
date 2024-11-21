// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser, ClerkLoaded } from "@clerk/nextjs";

// const BidForm = ({ product }) => {
//   const [bidAmount, setBidAmount] = useState<number>(0);
//   const [username, setUsername] = useState<string | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [usermail, setUsermail] = useState<string | null>(null);
//   const [image, setImage] = useState<string | null>(null);
//   const { isSignedIn, user } = useUser();

//   useEffect(() => {
//     if (user) {
//       setUsername(user.fullName);
//       setUserId(user.id);
//       setUsermail(user.primaryEmailAddress?.emailAddress);
//       setImage(user.profileImageUrl);
//     }
//   }, [user]);

//   const handleBidSubmit = async () => {
//     if (!isSignedIn) {
//       alert("You must be logged in to place a bid.");
//       return;
//     }

//     if (bidAmount <= product.startingBid) {
//       alert("Bid amount must be greater than the current bidding amount.");
//       return;
//     }

//     const bidData = {
//       _id: product._id, // Replace with actual ID
//       productName: product.name,
//       clerkUserId: userId, // Clerk User ID
//       customerEmail: usermail, // Customer Email
//       customerName: username, // Customer Name
//       biddingAmount: bidAmount,
//       imageUrl: image // Customer Profile Picture
//     };

//     alert(JSON.stringify(bidData, null, 2));

//     try {
//       const response = await axios.post("http://localhost:3000/api/order", bidData);
//       alert("Bid placed successfully!");
//     } catch (error) {
//       alert("Failed to place bid.");
//     }
//   };

//   return (
//     <ClerkLoaded>
//       <div className="mt-4">
//         <input
//           type="number"
//           value={bidAmount}
//           onChange={(e) => setBidAmount(Number(e.target.value))}
//           placeholder="Enter your bid"
//           className="border rounded p-2 w-full"
//         />
//         <button
//           onClick={handleBidSubmit}
//           className="mt-2 bg-blue-500 text-white p-2 rounded"
//         >
//           Place Bid
//         </button>
//       </div>
//     </ClerkLoaded>
//   );
// };

// export default BidForm;

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useUser, ClerkLoaded } from "@clerk/nextjs";

const BidForm = ({ product }) => {
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [usermail, setUsermail] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (user) {
      setUsername(user?.firstName);
      setUserId(user.id);
      setUsermail(user.primaryEmailAddress?.emailAddress);
      setImage(user.imageUrl);
    }
  }, [user]);

  const handleBidSubmit = async () => {
    if (!isSignedIn) {
      alert("You must be logged in to place a bid.");
      return;
    }

    if (bidAmount <= product.startingBid) {
      alert("Bid amount must be greater than the current bidding amount.");
      return;
    }
 
    const bidData = {
      _id: product._id, // Replace with actual ID
      productName: product.name,
      clerkUserId: userId, // Clerk User ID
      customerEmail: usermail, // Customer Email
      customerName: username, // Customer Name
      biddingAmount: bidAmount,
      imageUrl: image // Customer Profile Picture
    };
 


    try {
      const response = await axios.post("http://localhost:3000/api/order", bidData);
      alert("Bid placed successfully!");
    } catch (error) {
      alert("Failed to place bid.");
    }
  };

  // function data(){
  //   console.log(user)
  //   alert(user?.firstName);
  // }

  return (
    <ClerkLoaded>
      <div className="mt-4">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          placeholder="Enter your bid"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleBidSubmit}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Place Bid
        </button>
        {/* <button onClick={data}>Data</button> */}
      </div>
    </ClerkLoaded>
  );
};

export default BidForm;