import React, { Component } from "react";

class Table extends Component {
  render() {
    var heading = this.props.heading;
    var body = this.props.body;
    return (
      <table style={{ width: 500 }}>
        <thead>
          <tr>
            {heading.map((head) => (
              <th>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row) => (
            <TableRow row={row} />
          ))}
        </tbody>
      </table>
    );
  }
}

class TableRow extends Component {
  render() {
    var row = this.props.row;
    return (
      <tr>
        {row.map((val) => (
          <td>{val}</td>
        ))}
      </tr>
    );
  }
}

export default Table;
