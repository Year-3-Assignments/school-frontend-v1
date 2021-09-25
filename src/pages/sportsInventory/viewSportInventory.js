/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllSportInventory, setSportInventory } from '../../actions/sportInventoryActions';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  CSVExport,
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import CreateSport from './AddSportInventory';
import DeleteSport from './DeleteSportInventory';
import ShowSport from './ShowSportInventory';
import EditSport from './EditSportInventory';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

class SportPageInventory extends Component {
  constructor(props) {
    super(props);
    this.onSelectSportToUpdate = this.onSelectSportToUpdate.bind(this);
    this.state = {
      allSportsInventory: [],
      selectedSportInventory: [],
    };
  }

  componentDidMount() {
    this.props.getAllSportInventory();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getsportinventory !== nextProps.getsportinventory) {
      this.setState({
        allSportsInventory: nextProps.getsportinventory,
      });
    }

    if (this.props.createsportinventory !== nextProps.createsportinventory) {
      this.props.getAllSportInventory();
    }

    if (this.props.deletesportinventory !== nextProps.deletesportinventory) {
      this.props.getAllSportInventory();
    }

    if (this.props.updatesportinventory !== nextProps.updatesportinventory) {
      this.props.getAllSportInventory();
    }

  };

  // react bootstrap table data & functions
  tableColumnData = [
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: (cell, row) => this.actionButtonFormatter(row),
      headerStyle: () => {
        return { width: '80px', fontSize: '9px' };
      },
      csvExport: false,
    },
    {
      dataField: 'name',
      text: 'Equipment Name',
    },
    { dataField: 'sportname', text: 'Sport Name', formatter: (cell, row) => this.showCoach(row), },
    { dataField: 'dateOfPurchase', text: 'Date Of Purchase' },
    { dataField: 'quantity', text: 'Quantity' },
  ];

  showCoach = (row) => {
    return row.sportname.map((item, index) => (
      <p>
        &nbsp;{item.name}
      </p>
    ));
  };

  onViewSportDetail = (event, sportId) => {
    const { allSportsInventory } = this.state;
    if (event && allSportsInventory && allSportsInventory.length > 0 && sportId) {
      const selectedSportInventory = allSportsInventory.find((sport) => sport._id === sportId);
      this.props.setSportInventory(selectedSportInventory);
      this.setState({ selectedSportInventory: selectedSportInventory });
    }
  };

  onSportDelete = (event, sportId) => {
    const { allSportsInventory } = this.state;
    if (event && allSportsInventory && allSportsInventory.length > 0 && sportId) {
      const selectedSportInventory = allSportsInventory.find((sport) => sport._id === sportId);
      this.props.setSportInventory(selectedSportInventory);
      this.setState({ selectedSportInventory: selectedSportInventory });
    }
  };

  onSelectSportToUpdate = (event, sportId) => {
    const { allSportsInventory } = this.state;
    if (event && allSportsInventory && allSportsInventory.length > 0 && sportId) {
      const selectedSportInventory = allSportsInventory.find((sport) => sport._id === sportId);
      this.props.setSportInventory(selectedSportInventory);
      this.setState({ selectedSportInventory: selectedSportInventory });
    }
  };

  actionButtonFormatter = (row) => {
    return (
      <span className="dropdown show">
        <span className="dropdown">
          <a
            href="#"
            className="btn btn-no-shadow m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill btn-sm btn-rounded"
            data-mdb-toggle="dropdown"
          >
            <i className="fas fa-ellipsis-h"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a
              className="dropdown-item"
              href="#"
              data-mdb-toggle="modal"
              data-mdb-target="#one-sport"
              onClick={(e) => this.onViewSportDetail(e, row._id)}
            >
              <i className="far fa-eye" /> View
            </a>
            <a
              className="dropdown-item"
              href="#"
              data-mdb-toggle="modal"
              data-mdb-target="#update-sport"
              onClick={(e) => this.onSelectSportToUpdate(e, row._id)}
            >
              <i className="far fa-edit" /> Edit
            </a>

            <a
              className="dropdown-item"
              href="#"
              data-mdb-toggle="modal"
              data-mdb-target="#delete-sport"
              onClick={(e) => this.onSportDelete(e, row._id)}
            >
              <i className="far fa-trash-alt" /> Delete
            </a>
          </div>
        </span>
      </span>
    );
  };

  render() {
    const { allSportsInventory } = this.state;
    return (
      <div className="pt-5 pb-5 admin-container-color">
        <div className="card p-4 exam-table container">
          <div className="d-flex">
            <h3>Sports Details</h3>
            <div className="align-right">
              <button
                className="btn btn-primary btn-rounded btn-no-shadow"
                data-mdb-toggle="modal"
                data-mdb-target="#create-sport"
              >
                Create new Sport
              </button>
            </div>
          </div>
          <ToolkitProvider
            keyField="_id"
            data={allSportsInventory}
            columns={this.tableColumnData}
            search
            exportCSV
          >
            {(props) => (
              <div>
              <div className="d-flex">
                <SearchBar
                  {...props.searchProps}
                  placeholder="Search sport by name"
                  className="mb-3 search-bar"
                />
                  <ExportCSVButton 
                  {...props.csvProps}
                  className="btn-secondary btn-rounded btn-no-shadow mx-3 mb-3">
                    Download Sport Details!!
                  </ExportCSVButton>
              </div>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  bordered={true}
                  striped={false}
                  headerClasses="header-class"
                  wrapperClasses="table-responsive"
                  rowClasses="custom-row-class"
                  hover
                />
              </div>
            )}
          </ToolkitProvider>
        </div>
        <CreateSport />
        <DeleteSport id={this.state.selectedSportInventory} />
        <ShowSport id={this.state.selectedSportInventory} />
        <EditSport selectedSportInventory={this.state.selectedSportInventory} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // updateExam: state.examinationReducer.updateexamination,
  createsportinventory: state.sportInventoryReducer.createsportinventory,
  getsportinventory: state.sportInventoryReducer.getsportinventory,
  deletesportinventory: state.sportInventoryReducer.deletesportinventory,
  updatesportinventory: state.sportInventoryReducer.updatesportinventory
});

const mapDispatchToProps = (dispatch) => ({
  setSportInventory: (sportData) => {
    dispatch(setSportInventory(sportData));
  },
  getAllSportInventory: () => {
    dispatch(getAllSportInventory());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(SportPageInventory);
