// import fs from 'fs';
// import path from 'path';
// import { NextRequest, NextResponse } from 'next/server';

// interface Bid {
//     _id: string;
//     productName: string;
//     clerkUserId: string;
//     customerEmail: string;
//     customerName: string;
//     biddingAmount: number;
//     imageUrl: string;
//     timestamp: string;
// }

// const dataFilePath = path.join(process.cwd(), 'data.json');

// export async function POST(req: NextRequest) {
//     try {
//         const { _id, productName, clerkUserId, customerEmail, customerName, biddingAmount, imageUrl } = await req.json();

//         const newBid = {
//             id: _id,
//             productName,
//             clerkUserId,
//             customerEmail,
//             customerName,
//             biddingAmount,
//             imageUrl,
//             timestamp: new Date().toISOString()
//         };

//         let data = [];
//         if (fs.existsSync(dataFilePath)) {
//             const fileData = fs.readFileSync(dataFilePath, 'utf8');
//             if (fileData) {
//                 data = JSON.parse(fileData);
//             }
//         }

//         const isDuplicateAmount: boolean = data.some((bid: { [key: string]: Bid }) => {
//             const bidKey = Object.keys(bid)[0];
//             return bid[bidKey].biddingAmount === biddingAmount;
//         });
//         if (isDuplicateAmount) {
//             return NextResponse.json({ error: 'Duplicate bidding amount' }, { status: 400 });
//         }

//         data.push({ [_id]: newBid });
//         fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

//         return NextResponse.json({ message: 'Bid saved successfully' }, { status: 200 });
//     } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//         return NextResponse.json({ error: 'Failed to save bid', errorMessage }, { status: 500 });
//     }
// }

import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

interface Bid {
    _id: string;
    productName: string;
    clerkUserId: string;
    customerEmail: string;
    customerName: string;
    biddingAmount: number;
    imageUrl: string;
    timestamp: string;
}

const dataFilePath = path.join(process.cwd(), 'data.json');

export async function POST(req: NextRequest) {
    try {
        const { _id, productName, clerkUserId, customerEmail, customerName, biddingAmount, imageUrl } = await req.json();

        const newBid = {
            id: _id,
            productName,
            clerkUserId,
            customerEmail,
            customerName,
            biddingAmount,
            imageUrl,
            timestamp: new Date().toISOString()
        };

        let data = {};
        if (fs.existsSync(dataFilePath)) {
            const fileData = fs.readFileSync(dataFilePath, 'utf8');
            if (fileData) {
                data = JSON.parse(fileData);
            }
        }

        if (!data[_id]) {
            data[_id] = [];
        }

        const isDuplicateAmount = data[_id].some((bid: Bid) => bid.biddingAmount === biddingAmount);
        if (isDuplicateAmount) {
            return NextResponse.json({ error: 'Duplicate bidding amount' }, { status: 400 });
        }

        data[_id].push(newBid);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ message: 'Bid saved successfully' }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Failed to save bid', errorMessage }, { status: 500 });
    }
}

// export async function GET(req: NextRequest) {
//     try {
//         if (fs.existsSync(dataFilePath)) {
//             const fileData = fs.readFileSync(dataFilePath, 'utf8');
//             const data = JSON.parse(fileData);
//             return NextResponse.json(data, { status: 200 });
//         } else {
//             return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
//         }
//     } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//         return NextResponse.json({ error: 'Failed to read data', errorMessage }, { status: 500 });
//     }
// }

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const _id = searchParams.get('_id');

        if (!_id) {
            return NextResponse.json({ error: 'Missing _id in query parameters' }, { status: 400 });
        }

        if (fs.existsSync(dataFilePath)) {
            const fileData = fs.readFileSync(dataFilePath, 'utf8');
            const data = JSON.parse(fileData);

            if (data[_id]) {
                return NextResponse.json(data[_id], { status: 200 });
            } else {
                return NextResponse.json({ error: 'Data not found for the given _id' }, { status: 404 });
            }
        } else {
            return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Failed to read data', errorMessage }, { status: 500 });
    }
}