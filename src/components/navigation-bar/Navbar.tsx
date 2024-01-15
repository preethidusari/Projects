import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LandingPageNavbar from "./LandingPageNavbar";
import UsersNavbar from "./UsersNavbar";

interface NavbarLinks {
  head: string;
  route: string;
}

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  var isLoggedIn = false;
  if (user.id && user.email) {
    isLoggedIn = true;
  }
  return (
    <>
      {isLoggedIn ? <LandingPageNavbar logged={isLoggedIn} /> : <UsersNavbar />}
    </>
  );
};

export default Navbar;
