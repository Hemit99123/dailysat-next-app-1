import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'

interface HeaderProps {
  name: string;
  question: string | undefined
}

const Header: React.FC<HeaderProps> = ({ name, question }) => {
  const router = useRouter()

  const linkedInShare = `https://www.linkedin.com/feed/?shareActive=true&text=${question} https://dailysat.org %23DailySAT`
  const googleClassroomShare = `https://classroom.google.com/u/0/share?url=https://mywebsite.com&title=${question}&text=${question}resource%20on%20interserver%20communications!`
  const shareRedirect = (link: string) => {
    router.push(link)
  }

  return (
    <>
      <h1 className="text-3xl font-semibold">{name}</h1>
    </>
  );
};

export default Header;
