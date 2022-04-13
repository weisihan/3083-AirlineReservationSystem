function Modal(props) {
    return (<div className="modal">
        <p>Incorrect username or password</p>
        <button className="btn"  onClick ={props.onCancel}>Cancel</button>
        </div>);
}

export default Modal