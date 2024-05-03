// types
import { itemTypes } from "@/types/itemTypes";
// types
type itemPropTypes = {
  item: itemTypes;
};

// react-share (SNS share buttons)
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LineShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LineIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = ({ item }: itemPropTypes) => {
  // URL to share
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${item._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This item:
      </h3>

      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          // quote={item.name }
          hashtag={`#${item.type.replace(/\s/g, "")}ForRent`} // space removed
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={item.name}
          hashtags={[`${item.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={item.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <LineShareButton url={shareUrl} title={item.name}>
          <LineIcon size={40} round={true} />
        </LineShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={item.name}
          body={`Check out this item listing: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};
export default ShareButtons;
