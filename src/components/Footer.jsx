import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-medium-grey py-20 2xl:px-[280px] xl:px-[200px] sm:px-[80px] px-6">
      <main className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center w-[120px]">
          <img className="w-10" src="src/assets/Logo.svg" alt="" />
          <h4 className="ml-4 font-bold tracking-wider text-[1em] text-dark-grey">
            tripzz
          </h4>
        </div>
        <div className="md:mt-0 mt-2 flex flex-col items-center text-center text-dark-grey">
          <h6 className="">Just a better way to plan your tripzz</h6>
          <p className="md:flex text-center hidden mt-1 text-[.875em]">
            Copyright @ 2023
          </p>
        </div>
        <div className="md:mt-0 md:w-[120px] mt-10 flex flex-col items-center text-dark-grey w-[148px]">
          <h6 className="text-center text-[14px]">Follow us:</h6>
          <div className="flex justify-between gap-5 mt-2">
            <FaInstagram className="text-[18px] cursor-pointer hover:text-black" />
            <FaFacebook className="text-[18px] cursor-pointer hover:text-black" />
            <FaTwitter className="text-[18px] cursor-pointer hover:text-black" />
          </div>
          <p className="md:hidden flex mt-8 text-[.875em]">Copyright @ 2023</p>
        </div>
      </main>
    </footer>
  );
};

export default Footer;
