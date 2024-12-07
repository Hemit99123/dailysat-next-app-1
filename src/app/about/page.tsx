import Image from 'next/image';
import React from 'react';
import { redirect } from 'next/navigation'

const About = () => {
  // Array of team members so we can dynamicaly update it easily, instead of continually adding more jsx
  const team = [
    {
      name: 'Aarush Kute',
      role: 'Chief Executive Officer',
      imgSrc: './people/aarush.png',
      linkedIn: "https://www.linkedin.com/in/aarush-kute-1639a525b/"
    },
    {
      name: 'Hemit Patel',
      role: 'President & Chief Operating Officer',
      imgSrc: 'https://media.licdn.com/dms/image/v2/D5603AQFDJxp7vmgX0Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695640460890?e=1738195200&v=beta&t=sfsEBemwKB0_r70CJcFTqoBPOa2LgWU46Tq-CtjgJek',
      linkedIn: "https://www.linkedin.com/in/hemit-patel-383ab3271/"
    }, 
    {
      name: "William Chan",
      role: "Head of Marketing",
      imgSrc: "https://media.licdn.com/dms/image/v2/D5603AQFMtNWPnihUBg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718285605821?e=1738800000&v=beta&t=A2mf419HvUG8s4vdNi_10pq1VRPljzekz7BtfqWrImU",
      linkedIn: "https://www.linkedin.com/in/wilman-chan-03a468286/"
    },
      {
      name: "Lakshaya Jain",
      role: "Software Engineer",
      imgSrc: "./people/Lakshaya.png",
      linkedIn: "https://www.linkedin.com/in/lakshya-jain-9a66a22a5/"
    },
    {
      name: "Devesh Khilnani",
      role: "Business Lead",
      imgSrc: "https://media.licdn.com/dms/image/v2/D4D03AQHp9U6V0ER0bw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724947190257?e=1738800000&v=beta&t=HcqzWskjTN-TnRsu9sfjUdFe-aTl2S2ZrSUojpB4UJw",
      linkedIn: "https://www.linkedin.com/in/dkhilnani/"
    }
    
  ];

  const handleGoToHome = () => {
    redirect("/")
  }

  return (
    <div>
        <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                    <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                        <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">ACE the SAT.</h2>
                        <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">Our product will help you prep for the SAT through providing a question bank! You will have annotation and other tools available to aid you in your SAT journey to your dream school 🚀</p>
                    </div>
                </div>
                <Image 
                    className='lg:mx-0 mx-auto h-full rounded-3xl object-cover" src="https://pagedone.io/asset/uploads/1717751272.png'
                    src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="About Us image"
                    width={500}
                    height={300}
                />
            </div>
        </div>
    </section>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <Image
                  className="rounded-xl object-cover"
                  src="https://images.unsplash.com/photo-1604933834215-2a64950311bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={500}
                  height={300}
                  alt='Image of person'
                />
              </div>
              <Image
                className="sm:ml-0 ml-auto rounded-xl object-cover"
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="About Us image"
                width={500}
                height={300}
              />
            </div>
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Empowering students to succeed!
                  </h2>
                  <p className="text-gray-500 text-sm font-normal leading-relaxed lg:text-start lg:text-base text-center">
                    Welcome to DailySAT, your ultimate online resource for mastering the SAT! Our mission is to empower students to achieve their best scores by providing an interactive, personalized, and efficient study experience. Whether you&apos;re aiming for a perfect score or just trying to improve in specific areas, DailySAT is here to guide you every step of the way.
                  </p>
                </div>
                <div className="w-full lg:justify-start justify-center items-center sm:gap-10 space-x-10 inline-flex">
                  <div className="flex-col justify-start items-start inline-flex">
                    <h3 className="text-blue-400 text-4xl font-bold font-manrope leading-normal">70,000+</h3>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Users</h6>
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <h4 className="text-blue-400 text-4xl font-bold font-manrope leading-normal">1300+</h4>
                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">SAT Questions</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-blue-900">Our Team</h2>
            <p className="font-light text-gray-500 sm:text-xl">
                These are the people behind DailySAT!
            </p>
            </div>
            {/* Mapping over team array */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member, index) => (
                <div key={index} className="flex flex-col items-center justify-center">
                <img
                    className="w-36 h-36 rounded-3xl object-contain mb-4"
                    src={member.imgSrc}
                    alt={member.name}
                />
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">{member.name}</h3>
                    <p className="text-sm">{member.role}</p>
                    <ul className="flex justify-center mt-4 space-x-4">
                    <li>
                        <a href={member.linkedIn} className="text-[#0e76a8] hover:text-gray-900">
                        {/* LinkedIn icon */}
                        <svg fill="#0090b1" height="15px" width="15px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xmlSpace="preserve" stroke="#0090b1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_801_"> <path id="XMLID_802_" d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73 C77.16,101.969,74.922,99.73,72.16,99.73z"></path> <path id="XMLID_803_" d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4 c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"></path> <path id="XMLID_804_" d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599 c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319 c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995 C310,145.43,300.549,94.761,230.454,94.761z"></path> </g> </g></svg>
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            ))}
            </div>
        </div>
     </section>
    </div>
  );
};

export default About;
