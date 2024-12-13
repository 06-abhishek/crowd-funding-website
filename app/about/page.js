import React from "react";

const About = () => {
  return (
    <div>
      <div className="my-12 flex flex-col items-center">
        <h1 className="font-bold text-6xl text-center mb-3">About Fundora</h1>
        <p className="text-center w-3/4">
          Fundora is a crowdfunding platform designed for creators to fund their
          projects with the support of their fans. It&apos;s a space where your
          fans can directly contribute to your creative endeavors by buying you
          a chai. Unlock the potential of your fan-base and bring your projects
          to life.
        </p>
      </div>

      <hr className="my-6 border-t-2 border-gray-300" />

      <div className="my-12">
        <h2 className="font-bold text-2xl text-center mb-7">How It Works</h2>
        <div className="flex justify-evenly">
          <div className="flex flex-col items-center">
            <img
              className="bg-gray-600 rounded-full p-2"
              width={88}
              src="/man.gif"
              alt="Support"
            />
            <p className="font-bold text-sm">Fans can help</p>
            <p className="text-sm">Your fans can support you</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="bg-gray-600 rounded-full p-2"
              width={88}
              src="/coin.gif"
              alt="Contribute"
            />
            <p className="font-bold text-sm">Support Your Project</p>
            <p className="text-sm">Your fans can contribute financially</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="bg-gray-600 rounded-full p-2"
              width={88}
              src="/group.gif"
              alt="Collaborate"
            />
            <p className="font-bold text-sm">Fans want to collaborate</p>
            <p className="text-sm">Your fans can collaborate with you</p>
          </div>
        </div>
      </div>

      <hr className="my-6 border-t-2 border-gray-300" />

      <div className="my-12 mx-7 flex flex-col items-center gap-9">
        <div>
          <h2 className="font-bold text-2xl text-center mb-2">
            Benefits for Creators
          </h2>
          <ul className="flex flex-col items-center gap-1">
            <li className="">Direct financial support from your fanbase</li>
            <li className="">Engage with your fans on a more personal level</li>
            <li className="">
              Access to a platform tailored for creative projects
            </li>
            {/* Add more benefits */}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-2xl text-center mb-2">
            Benefits for Fans
          </h2>
          <ul className="flex flex-col items-center gap-1">
            <li className="">
              Directly contribute to the success of your favorite creators
            </li>
            <li className="">
              Exclusive rewards and perks for supporting creators
            </li>
            <li className="">
              Be part of the creative process and connect with creators
            </li>
            {/* Add more benefits */}
          </ul>
        </div>

        <div>
          {/* Additional sections */}
          <h2 className="font-bold text-2xl text-center mb-2">
            Benefits of Collaboration
          </h2>
          <ul className="flex flex-col items-center gap-1">
            <li className="">
              Unlock new opportunities through collaboration with fellow
              creators
            </li>
            <li className="">Expand your network and reach a wider audience</li>
            <li className="">
              Combine skills and resources to create innovative projects
            </li>
            {/* Add more benefits */}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-2xl text-center mb-2">
            Community Engagement
          </h2>
          <ul className="flex flex-col items-center gap-1">
            <li className="">
              Interact with a supportive community of like-minded individuals
            </li>
            <li className="">
              Receive valuable feedback and encouragement from peers
            </li>
            <li className="">
              Participate in discussions and events centered around your
              interests
            </li>
            {/* Add more benefits */}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-2xl text-center mb-2">
            Access to Resources
          </h2>
          <ul className="flex flex-col items-center gap-1   ">
            <li className="">
              Gain access to resources such as tutorials, templates, and tools
            </li>
            <li className="">
              Receive guidance and mentorship from experienced creators
            </li>
            <li className="">
              Stay updated on industry trends and best practices
            </li>
            {/* Add more benefits */}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-2xl text-center mb-2">
            Recognition and Exposure
          </h2>
          <ul className="flex flex-col items-center gap-1   ">
            <li className="">
              Showcase your work to a global audience and gain recognition
            </li>
            <li className="">Feature in promotional materials and campaigns</li>
            <li className="">
              Build your portfolio and increase your credibility as a creator
            </li>
            {/* Add more benefits */}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-2xl text-center mb-2">
            Supportive Community
          </h2>
          <ul className="flex flex-col items-center gap-1   ">
            <li className="">
              Join a community that values creativity, diversity, and
              inclusivity
            </li>
            <li className="">
              Find encouragement and inspiration from fellow members
            </li>
            <li className="">
              Collaborate on projects and share resources for mutual growth
            </li>
            {/* Add more benefits */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
