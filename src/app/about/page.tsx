import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <div>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <Image
                  className="rounded-xl object-cover"
                  src="https://images.unsplash.com/photo-1604933834215-2a64950311bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="About Us image"
                  width={500}
                  height={300}
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
                    Welcome to DailySAT, your ultimate online resource for mastering the SAT! Our mission is to empower students to achieve their best scores by providing an interactive, personalized, and efficient study experience. Whether you&apos;re aiming for a perfect score or just trying to improve in specific areas, StudySmart SAT is here to guide you every step of the way.
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
    </div>
  );
};

export default About;
