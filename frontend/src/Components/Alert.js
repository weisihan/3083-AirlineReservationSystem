function Email(props) {
    return (<div className="modal">
        <p>Invalid email address, please try again</p>
        <button className="btn"  onClick ={props.onCancel}>Cancel</button>
        </div>);
}

export default Email