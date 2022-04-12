function Register(props) {
    return (<div className="modal">
        <p>Welcome, {props.text}</p>
        <button className="btn"  onClick ={props.onCancel}>Cancel</button>
        </div>);
}

export default Register