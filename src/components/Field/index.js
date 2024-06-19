import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

// Scénario 7 : Ajout de nouvelle props dans les fields pour controler les champs et les nettoyer

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder, value, onChange, required }) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={onChange}
          required={required}
          value={value}
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = <textarea name={name} data-testid="field-testid"   onChange={onChange} required={required}
      value={value}/>;
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          onChange={onChange}
          required={required}
          value={value}
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
 Field.defaultProps = {
   label: "",
   placeholder: "",
   type: FIELD_TYPES.INPUT_TEXT,
   name: "field-name",
   value: "",
   onChange: () => null,
   required: false,
 }

export default Field;
