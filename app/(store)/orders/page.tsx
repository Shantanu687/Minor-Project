"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { goldenBird, airdrops } from "@/data";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [mail, setMail] = useState('');
  const [username, setUsername] = useState('');
  const { user } = useUser();

    useEffect(() => {
      if (user) {
        setUsername(user?.fullName);
        setMail(user.primaryEmailAddress?.emailAddress);
      }
    }, [user]);

  const sampleOrderData = [
    {
      orderNumber: "6046b7b7-b478-45ca-9972-02dce47025db",
      customerName: username,
      customerEmail: mail,
      items: [
        {
          id: "1",
          name: "Chirpy Wall Light",
          quantity: 1,
          price: '4,999',
          imageUrl: goldenBird,
          status: "Delivered"
        },
        {
          id: "2",
          name: "boAt Airdopes 311 Pro",
          quantity: 1,
          price: '1,099',
          imageUrl: airdrops,
          status: "Shipping"
        }
      ],
      totalAmount: '6,098',
      orderDate: "2024-11-21T07:57:09.351Z"
    },
    {
      orderNumber: "12f8d353-b92f-43b5-a355-ec3fcce03f92",
      customerName: username,
      customerEmail: mail,
      items: [
        {
          id: "3",
          name: "Zebronics ZEB-SP110",
          quantity: 1,
          price: 300,
          imageUrl: "https://m.media-amazon.com/images/I/61dhsFpHHVL._SX522_.jpg",
          status: "Cancelled"
        },
        {
          id: "4",
          name: "Jam & Honey Penguin",
          quantity: 3,
          price: 150,
          imageUrl: "https://m.media-amazon.com/images/I/61A2ddWFQxL._SX522_.jpg",
          status: "Delivered"
        }
      ],
      totalAmount: 750,
      orderDate: "2024-11-20T10:30:00.000Z"
    }
  ];
  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Order History</h1>
      {sampleOrderData.map((order) => (
        <div key={order.orderNumber} className="mb-8 p-4 border rounded-lg shadow-md">
          <div className="mb-4">
            <strong>Order Number:</strong> {order.orderNumber}
          </div>
          <div className="mb-4">
            <strong>Customer Name:</strong> {order.customerName}
          </div>
          <div className="mb-4">
            <strong>Customer Email:</strong> {order.customerEmail}
          </div>
          <div className="mb-4">
            <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
          </div>
          <div className="mb-4">
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Items</h2>
          <div>
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>Price: ₹{item.price}</div>
                  <div>Status: <span className={`font-bold ${item.status === 'Delivered' ? 'text-green-600' : item.status === 'Shipping' ? 'text-yellow-600' : 'text-red-600'}`}>{item.status}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Link href="/">
        <Button className="mt-4 bg-blue-600 text-white">Back to Home</Button>
      </Link>
    </div>
  );
};

export default OrderPage;