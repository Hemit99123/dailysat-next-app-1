import React from "react";
import { useRouter } from 'next/navigation'

interface HeaderProps {
  name: string;
  question: string | undefined
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <>
      <h1 className="text-3xl font-semibold">{name}</h1>
    </>
  );
};

export default Header;
