function Greeting(props) {
    return (<div className="modal">
        <p>Hello, {props.text}</p>
        <button className="btn"  onClick ={props.onCancel}>Cancel</button>
        </div>);
}

export default Greeting