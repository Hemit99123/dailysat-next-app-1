import { redirect } from "next/navigation";

const Reading = () => {
  redirect('/reading')

  return null; // Render nothing as the user is being redirected
};

export default Reading;
