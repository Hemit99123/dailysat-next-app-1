import React from "react";

interface HeaderProps {
  name: string;
  question: string | undefined
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-3xl font-semibold">{name}</h1>
    </div>
  );
};

export default Header;
