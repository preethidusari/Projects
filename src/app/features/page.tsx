import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import LegalAdvisorCard from "@/components/service-cards/LegalAdvisor";
import PdfChatCard from "@/components/service-cards/PdfChat";

const FeaturesPage = () => {
  return (
    <main className=" mx-48 mt-20">
      <div className="flex flex-col justify-center items-end mb-12 px-16">
        <h1 className="max-w-4xl font-bold md:text-6xl lg:text-7xl">
          <span className="text-violet-600 text-5xl">Law Meets Ease:</span>
        </h1>
        <h1 className="text-2xl">
          Your Platform for Legal Solutions and Seamless Connects!
        </h1>
      </div>
      <div className="flex border rounded-md border-zinc-200 py-16 mt-16">
        <div className="w-1/2 flex justify-center">
          <PdfChatCard className=" shadow-md" />
        </div>
        <div className="w-1/2">
          <div className=" mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
            <p className="pointer-events-none select-none text-sm font-semibold text-gray-700">
              LawQue is now Public!
            </p>
          </div>
          <p className="text-center mx-auto max-w-sm">
            Our LawQue is an AI tool aiding users with legal queries and
            document discussions. It analyzes uploaded PDFs, engaging in
            real-time conversations based on their content. Through machine
            learning, it simplifies legal complexities, offering accurate
            guidance and aiding in dispute resolution. The bot serves as a
            reliable advisor, providing tailored advice and facilitating
            informed decisions in legal matters.
          </p>
        </div>
      </div>
      <div className="flex border rounded-md border-zinc-200 py-16 mt-16">
        <div className="w-1/2">
          <div className=" mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
            <p className="pointer-events-none select-none text-sm font-semibold text-gray-700">
              Coming Soon!
            </p>
          </div>
          <p className="text-center mx-auto max-w-sm">
            Our LawQue is an AI tool aiding users with legal queries and
            document discussions. It analyzes uploaded PDFs, engaging in
            real-time conversations based on their content. Through machine
            learning, it simplifies legal complexities, offering accurate
            guidance and aiding in dispute resolution. The bot serves as a
            reliable advisor, providing tailored advice and facilitating
            informed decisions in legal matters.
          </p>
        </div>
        <div className="w-1/2 flex justify-center">
          <LegalAdvisorCard className=" shadow-md" />
        </div>
      </div>
    </main>
  );
};

export default FeaturesPage;
