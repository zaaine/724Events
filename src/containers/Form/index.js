import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

// ajout d'une variable initialFormValue qui sera l'état initiale du state
const Form = ({ onSuccess, onError }) => {
  const initialFormValues = {
    nom: "",
    prenom: "",
    type: "Personel",
    email: "",
    message: "",
  };
  const [sending, setSending] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  

  const handleChange = (field) => (e) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormValues({ ...formValues, type: value });
  }; 


  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        // Scénario 6 : La fonction OnSuccess n'est pas appelé lors de la validation (ajout L20)
        onSuccess()
        // Scénario 7 : Réinitialiser le formulaire après une soumission réussie
        setFormValues(initialFormValues);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [formValues, onSuccess, onError]
  );

// Scénario 7 : Ajout de nouvelle props dans les fields pour controler les champs et les nettoyer
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" value={formValues.nom} onChange={handleChange("nom")} required />
          <Field placeholder="" label="Prénom" value={formValues.prenom} onChange={handleChange("prenom")} required />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={handleSelectChange}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" onChange={handleChange("email")} value={formValues.email} required />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            name="message"
            type={FIELD_TYPES.TEXTAREA}
            value={formValues.message}
            onChange={handleChange("message")}
            required
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
