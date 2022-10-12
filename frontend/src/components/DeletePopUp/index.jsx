const DeletePopUp = ({handleDeleteConfirmed, handleDeleteCanceled}) => {

    return ( 
      <div className="popup-box">
        <div className="popup-message">
          <p className="popup-alert">Supprimer le post ?</p>
          <div className="popup-choice">
            <button onClick={handleDeleteCanceled} className="popup-btn popup-cancel-btn">
                Annuler
                </button>
            <button onClick={handleDeleteConfirmed} className="popup-btn popup-confirm-btn">
              Confirmer
            </button>
          </div>
        </div>
      </div>
     );
}
 
export default DeletePopUp;