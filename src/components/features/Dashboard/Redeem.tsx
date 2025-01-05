import axios from 'axios';
import React from 'react';

interface RedeemProps {
    header: string;
    desc: string;
    color: string;
    art?: string;
    isReferred: boolean | undefined;
}

const Redeem: React.FC<RedeemProps> = ({ art, header, desc, isReferred }) => {

    const redeemReferralBonus = async () => {
        const referralCode = prompt("Enter a referral code:")

        if (!referralCode) {
            await axios.post("/api/referral", {
                referralCode
            })
        }
    }

    return (
        <div className="shadow-lg w-full rounded-lg bg-white p-4">
            <div className="flex items-center flex-col mb-3">
                <p className="text-3xl font-bold ml-2 text-blue-500">{header}</p>
                <p className="text-lg font-semibold text-gray-600 ml-2">{desc}</p>
            </div>
            <img src={art} className="w-32 ml-auto mr-auto " />
            <div className='flex justify-center mt-10 items-center'>

            {isReferred == false &&
                <button 
                    className='bg-blue-500 px-6 py-3 text-white rounded-lg font-semibold hover:bg-transparent hover:text-blue-500 duration-500 border-2 border-blue-500'
                    onClick={redeemReferralBonus}
                >
                    Redeem reward
                </button>
            }
            </div>
        </div>
    );
}

export default Redeem;