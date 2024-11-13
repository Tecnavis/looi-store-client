import PropTypes from "prop-types";
import clsx from "clsx";
// import SubscribeEmail from "./sub-components/SubscribeEmail";

const FooterNewsletter = ({
  spaceBottomClass,
  spaceLeftClass,
  sideMenu,
  colorClass,
  widgetColorClass
}) => {
  return (
    <div className={clsx("footer-widget", spaceBottomClass, sideMenu ? "ml-ntv5" : spaceLeftClass, widgetColorClass)}>
      <div className="footer-title">
        <h3>STORE NEAR ME</h3>
      </div>
      <div className={clsx("subscribe-style", colorClass)}>
        <p>MADARI TRADERS ANAKKAYAM MALAPPURAM KERALA 676509</p>
        <p>+91 8891022217</p>
        <p>+91 7902695107</p>
       
        {/* subscribe email */}
        {/* <SubscribeEmail mailchimpUrl="//devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef" /> */}
      </div>
      
    </div>
  );
};

FooterNewsletter.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  colorClass: PropTypes.string,
  widgetColorClass: PropTypes.string
};

export default FooterNewsletter;
