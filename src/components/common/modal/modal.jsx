import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Pagination from "../../common/pagination";
import _ from "lodash";

import "./modal.css";

class ModalMy extends Component {
  state = {
    currentPage: 1,
    itemsPerPage: 8
  };

  handlePaginate = number => {
    this.setState({
      currentPage: number
    });
  };

  render() {
    const { onShowModal, isOpen, onClose, user, workOrders } = this.props;
    const name = user.name;

    // console.log("before sort",workOrders);

    let woOrderedByTime = _.orderBy(workOrders, ["sendTime"], ["asc"]);

    const indexOfLast = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirst = indexOfLast - this.state.itemsPerPage;
    let itemsPaginated = woOrderedByTime.slice(indexOfFirst, indexOfLast);

    const formatDate = date => {
      let d = new Date(date).toLocaleString();
      return d;
    };

    return (
      <div>
        <div className="showWoBtn clearfix">
          <button
            onClick={onShowModal}
            className="mdc-button btn-sm btn"
          >
            Show all work orders
          </button>
        </div>
        <Modal show={isOpen} onHide={onClose}>
          <Modal.Header className="mHeader" closeButton>
            <Modal.Title>{name + " Workorders"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Workorder</th>
                      <th scope="col">Building number</th>
                      <th scope="col">Workorder send time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsPaginated.map(order => (
                      <tr key={order._id}>
                        <td>
                          {" "}
                          <Link to={`/admin/workorder/${order._id}`}>
                            Workorder
                          </Link>
                        </td>
                        <td> {order.buildingNumber}</td>
                        <td>{formatDate(order.sendTime)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            }
          </Modal.Body>
          <Modal.Footer>
            <button className="btn mdc-button" onClick={onClose}>
              Go back
            </button>
            <Pagination
              currentPage={this.state.currentPage}
              total={woOrderedByTime.length}
              somethingPerPage={this.state.itemsPerPage}
              paginate={this.handlePaginate}
            />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalMy;
