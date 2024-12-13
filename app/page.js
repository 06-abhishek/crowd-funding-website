import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-3 items-center my-12">
        <h1 className="font-bold text-6xl">Fundora...</h1>
        <div className="text-center">
          <p>A crowdfunding platform for creators to fund their projects.</p>
          <p>
            A place where your fans can buy you a chai. Unleash the power of
            your fans and get your projects funded.
          </p>
        </div>
        <div className="flex mt-2 gap-2">
          <Link
            href="/login"
            className="text-blue-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            Start Here
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <Link
            href="/about"
            className="text-blue-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            Read More
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </div>

      <hr className="my-6 border-t-2 border-gray-300" />

      <div className="flex flex-col gap-7 my-12">
        <div className="font-bold text-2xl text-center">
          Your fans can donate you something
        </div>
        <div className="flex justify-evenly">
          <div className="flex flex-col items-center">
            <img
              className="bg-gray-600 rounded-full p-2"
              width={88}
              src="/man.gif"
              alt="Support"
            />
            <p className="font-bold text-sm">Fans want to help</p>
            <p className="text-sm">Your fans are available to support you</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="bg-gray-600 rounded-full p-2"
              width={88}
              src="/coin.gif"
              alt="Contribute"
            />
            <p className="font-bold text-sm">Fans want to contribute</p>
            <p className="text-sm">
              Your fans are willing to contribute financially
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="bg-gray-600 rounded-full p-2"
              width={88}
              src="/group.gif"
              alt="Collaborate"
            />
            <p className="font-bold text-sm">Fans want to collaborate</p>
            <p className="text-sm">
              Your fans are ready to collaborate with you
            </p>
          </div>
        </div>
      </div>

      <hr className="my-6 border-t-2 border-gray-300" />

      <div className="flex flex-col items-center gap-7 my-12">
        <div className="font-bold text-2xl text-center">
          Learn more about us
        </div>
        <div className="h-56 w-96">
          <iframe
            className="w-full h-full"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Sklc_fQBmcs?si=3KleoKqrox_Z3l7z"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}