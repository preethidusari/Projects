import Image from "next/image";
import Link from "next/link";

const Intro = () => {
  return (
    <div>
      <div className=" bg-white flex ">
        <div className="w-1/2 item">
          <div className=" text-center mt-32 ml-20 ">
            <div className=" space-y-3">
              <h3 className="font-bold text-purple-800 text-5xl">
                Where Legal Security{" "}
              </h3>
              <h3 className="font-bold text-purple-800 text-5xl">
                Meets Seamless{" "}
              </h3>
              <h3 className="font-bold text-purple-800 text-5xl">Access</h3>
            </div>

            <div className=" p-8 text-center ">
              <p className="text-black font-medium text-lg mt-6 px-10">
                We believe that legal assistance should be accessible to
                everyone. LawQue connects you with our network of professional
                lawyers, providing you with the guidance and support you need,
                whenever you need it. Whether you're seeking advice,
                consultations, or full legal representation, our platform
                ensures a seamless experience
              </p>
            </div>
            {/* <p className='text-black font-medium text-lg mt-6'>We believe that legal assistance should be accessible to everyone. LawQue connects you with our network of professional lawyers, providing you with the guidance and support you need, whenever you need it. Whether you're seeking advice, consultations, or full legal representation, our platform ensures a seamless experience</p> */}
            <Link
              href={"/"}
              className=" bg-purple-800 rounded-xl text-white px-8 py-3 font-bold shadow-md  hover:bg-purple-600"
            >
              Try Now
            </Link>
          </div>
        </div>
        <div className="w-1/2 px-40 py-8 ">
          <Image
            src="/init.png"
            alt="background-display"
            width={760}
            height={120}
            className="rounded-2xl shadow-2xl shadow-purple-800"
          />
        </div>
      </div>
    </div>
  );
};

export default Intro;
