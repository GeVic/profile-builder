import { useAppMode } from "@/context/AppProviderContext";
import Image from "next/image";
import { useState } from "react";
import ImageUpload from "../ui/components/imageUpload";
import CommonLayout from "./layout";

interface AboutType {
  name: string;
  email: string;
  intro: string;
  bio: string;
}

const initialDetails: AboutType = {
  name: "",
  email: "",
  intro: "",
  bio: "",
};

const About = () => {
  const [image, setImage] = useState("/svg/default_profile.svg");
  const [details, setDetails] = useState<AboutType>(initialDetails);
  const { cards, site, setSite, isEditMode } = useAppMode();

  return (
    <>
      <CommonLayout>
        {/* left extreme */}
        <div className="flex outline-none w-full md:w-1/4 flex-col gap-y-8">
          {isEditMode && (
            <div className="flex flex-row gap-4">
              <ImageUpload
                image={site.image}
                width={31}
                setImage={(image) => setSite({ ...site, image: image })}
                defaultImage="/svg/default.svg"
                height={31}
                size={5}
              />
              <input
                type="text"
                placeholder="Enter site title"
                className="bg-transparent text-black outline-none"
                value={site.title}
                onChange={(e) => setSite({ ...site, title: e.target.value })}
              />
            </div>
          )}
          {isEditMode ? (
            <ImageUpload
              image={image}
              width={295}
              setImage={setImage}
              defaultImage="/svg/default_profile.svg"
              height={295}
              size={35}
            />
          ) : (
            <div
              style={{
                height: 295,
                position: "relative",
                width: "100%",
              }}
            >
              <Image
                src={image}
                alt="Picture of the user"
                layout="fill"
                objectFit="cover"
                className="rounded-3xl "
              />
            </div>
          )}
          {/* <div className="flex flex-row justify-between">
            {isEditMode ? (
              <div className="flex flex-col">
                <input
                  value={details.name}
                  placeholder="Your name here"
                  className="bg-transparent text-black font-semibold"
                  onChange={(e) =>
                    setDetails({ ...details, name: e.target.value })
                  }
                />
                <input
                  value={details.email}
                  placeholder="Enter email"
                  className="bg-transparent text-black "
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-black font-semibold">{details.name}</span>
                <span>{details.email}</span>
              </div>
            )}
          </div> */}
          {/* <div className="flex flex-col gap-2">
            {cards && cards.length > 0 && (
              <>
                <span className="text-gray-400">Currently</span>
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={cards[0].image}
                    alt="Linkedin icon"
                    width={36}
                    height={35}
                  />
                  <span className="text-black">
                    {cards[0].title}, {cards[0].role}
                  </span>
                </div>
              </>
            )}
          </div> */}
        </div>
        {/* right extreme */}
        <div className="w-full md:w-3/5 flex flex-col justify-between gap-6">
          {isEditMode ? (
            <div className="flex flex-col justify-start gap-6">
              <input
                value={details.intro}
                placeholder="Click to add title"
                className="bg-transparent text-black font-semibold text-7xl outline-none"
                onChange={(e) =>
                  setDetails({ ...details, intro: e.target.value })
                }
              />
              <input
                value={details.bio}
                placeholder="Click to add subtitle"
                className="bg-transparent text-black text-md outline-none"
                onChange={(e) =>
                  setDetails({ ...details, bio: e.target.value })
                }
              />
            </div>
          ) : (
            <div className="flex flex-col justify-start gap-6">
              <p className="text-7xl text-gray-400">{details.intro}</p>
              <p className="text-md">{details.bio}</p>
            </div>
          )}
        </div>
      </CommonLayout>
      <div className="flex flex-row justify-between">
        {isEditMode ? (
          <div className="flex flex-col">
            <input
              value={details.name}
              placeholder="Your name here"
              className="bg-transparent text-black font-semibold outline-none"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
            <input
              value={details.email}
              placeholder="Enter email"
              className="bg-transparent text-black outline-none"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-black font-semibold">{details.name}</span>
            <span>{details.email}</span>
          </div>
        )}
      </div>
      <div className="flex md:flex-row flex-col justify-between">
        <div className="flex flex-col gap-2">
          {cards && cards.length > 0 && (
            <>
              <span className="text-gray-400">Currently</span>
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={cards[0].image}
                  alt="Linkedin icon"
                  width={36}
                  height={35}
                />
                <span className="text-black">
                  {cards[0].title}, {cards[0].role}
                </span>
              </div>
            </>
          )}
        </div>
        {cards && cards.length > 0 && (
          <div className="flex flex-col md:items-end items-start">
            <span className="text-gray-400">Previously</span>
            <div className="flex flex-row gap-2">
              {cards.map((card, index) => (
                <Image
                  src={card.image}
                  alt={card.title}
                  width={36}
                  height={35}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
