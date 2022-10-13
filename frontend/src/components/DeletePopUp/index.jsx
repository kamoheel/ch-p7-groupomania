import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const DeletePopUp = ({handleDeleteConfirmed, handleDeleteCanceled}) => {

    return ( 
      <div className="popup--box">
        <div className="popup--message">
          <div className="popup--header">
            <div className="popup--title popup--alert">Supprimer la publication ?</div>
            <span className='popup--close' onClick={handleDeleteCanceled}>
                      <FontAwesomeIcon icon={faXmark} className='x-icon'/>
            </span>
          </div>
          <div className="popup--choice">
            <button onClick={handleDeleteCanceled} className="popup--btn popup--cancel-btn">
                Annuler
                </button>
            <button onClick={handleDeleteConfirmed} className="popup--btn popup--confirm-btn">
              Confirmer
            </button>
          </div>
        </div>
      </div>
     );
}
 
export default DeletePopUp;