"use client";

// react-share (SNS share buttons)
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LineShareButton,
  EmailShareButton,
  InstapaperShareButton,
  InstapaperIcon,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  LineIcon,
  EmailIcon,
} from "react-share";

const SNS = () => {
  // URL to share
  // const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${ticket._id}`;

  return (
    <>
      <h2 className="text-3xl text-center pt-2 pb-10 tracking-[0.2rem]">
        FOLLOW US
        <span className="block h-1 w-[60%] bg-gray-500 mx-auto mt-9"></span>
      </h2>

      <div className="flex gap-8 justify-center pb-1">
        <FacebookShareButton
          // url={shareUrl}
          url={``}
          // hashtag={`#${ticket.replace(/\s/g, '')}event`} // space removed
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton url={``} title={``} hashtags={[`ticket`, `event`]}>
          <XIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton url={``} title={``} separator=":: ">
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <LineShareButton url={``} title={``}>
          <LineIcon size={40} round={true} />
        </LineShareButton>

        <InstapaperShareButton
          url={``}
          title={``}
          description={`Check out this ticket`}
        >
          <InstapaperIcon size={40} round={true} />
        </InstapaperShareButton>

        <EmailShareButton url={``} subject={``} body={`Check out this ticket`}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
export default SNS;
