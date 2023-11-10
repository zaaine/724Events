/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>

      <div className="EventCard__month">{getMonth(date)}</div>
    </div>
  </div>
);

EventCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
  small: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  label: PropTypes.string,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
};

export default EventCard;