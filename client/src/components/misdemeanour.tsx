import { Misdemeanour } from "../types/misdemeanours.types";
import { Punishment } from "../types/punishment.types";

interface IMisdemeanourItem {
  misdemeanour: Misdemeanour;
  punishment: Punishment;
}

export const MisdemeanourItem: React.FC<IMisdemeanourItem> = ({
  misdemeanour,
  punishment,
}: IMisdemeanourItem) => {
  return (
    <div
      className={`misdemeanour ${
        misdemeanour.citizenId === "YOU!" ? "misdemeanour--yours" : ""
      }`}
    >
      <h3 className="misdemeanour__item-heading">Citizen ID</h3>
      <p className="misdemeanour__id">{misdemeanour.citizenId}</p>
      <h3 className="misdemeanour__item-heading">Date</h3>
      <p className="misdemeanour__date">{misdemeanour.date}</p>
      <h3 className="misdemeanour__item-heading">Misdemeanour</h3>
      <p className="misdemeanour__misdemeanour">{misdemeanour.misdemeanour}</p>
      <h3 className="misdemeanour__item-heading">Punishment Idea</h3>
      <div className="misdemeanour__punishment">
        {punishment ? (
          <img
            src={`https://picsum.photos/id/${punishment.id}/100`}
            alt="punishment idea"
          />
        ) : (
          <p>?</p>
        )}
      </div>
    </div>
  );
};
