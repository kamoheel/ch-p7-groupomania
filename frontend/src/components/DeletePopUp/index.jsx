const DeletePopUp = ({handleDeleteConfirmed, handleDeleteCanceled}) => {
    return ( 
      <div className="popup_box">
        <p>Supprimer le post?</p>
        <button onClick={handleDeleteCanceled} className="popup-cancel-btn">
            Annuler
            </button>
        <button onClick={handleDeleteConfirmed} className="popup-confirm-btn">
          Confirmer
        </button>
      </div>
     );
}
 
export default DeletePopUp;