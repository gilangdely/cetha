import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="max-w-3xl flex-col text-center">
          <h2 className="text-TextPrimary text-4xl font-semibold md:text-4xl">
            Mulai Tingkatkan Kariermu
          </h2>
          <p className="text-TextSecondary mt-8 text-lg">
            Review CV kamu atau tingkatkan profil LinkedIn-mu sekarang. Dapatkan
            insight yang membantu kamu stand out di mata recruiter!
          </p>
        </div>
        <div className="mt-10 flex gap-4">
          <Link
            href={"/improve-linkedIn"}
            className="border-primaryBlue text-primaryBlue flex items-center rounded-full border bg-white px-5 py-2.5"
          >
            Perbaiki LinkedIn
          </Link>
          <Link
            href={"/review-cv"}
            className=" text-white flex items-center rounded-full bg-primaryBlue px-5 py-2.5"
          >
            Mulai Sekarang
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
