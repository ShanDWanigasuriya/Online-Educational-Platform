import React from "react";

type Props = {
    receiptUrl: any;
};

const Success = ({ receiptUrl }: Props) => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
                <h2 className="text-2xl font-bold text-center mb-4 text-green-600">Order Successful!</h2>
                <p className="text-gray-700 font-bold text-center mb-8">Thank you for your order. <br></br>Check Your email. <br></br> You will receive a confirmation shortly.</p>
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => { window.location.href = '/profile'; }}
                    >
                        Start Learning
                    </button>
                    {/* <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => { window.open(receiptUrl, '_blank'); }}
                    >
                        View Payment Receipt
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default Success;
