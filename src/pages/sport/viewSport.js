/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSport, setSport } from '../../actions/sportActions';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  CSVExport,
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import CreateSport from './AddSports';
import DeleteSport from './DeleteSport';
import ShowSport from './ShowSport';
import EditSport from './EditSport';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

class SportPage extends Component {
  constructor(props) {
    super(props);
    this.onSelectSportToUpdate = this.onSelectSportToUpdate.bind(this);
    this.state = {
      exams: [],
      allSports: [],
      selectedSport: [],
      selectedExam: '',
    };
  }

  componentDidMount() {
    this.props.getAllSport();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.getallsports !== nextProps.getallsports) {
      this.setState({
        allSports: nextProps.getallsports,
      });
    }

    if (this.props.createSport !== nextProps.createSport) {
      this.props.getAllSport();
    }

    if (this.props.deleteSport !== nextProps.deleteSport) {
      this.props.getAllSport();
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
      dataField: 'sportId',
      text: 'Sport ID',
    },
    { dataField: 'name', text: 'Sport Title' },
    {
      dataField: 'coach',
      text: 'Coach Name',
      formatter: (cell, row) => this.showCoach(row),
    },
  ];

  showCoach = (row) => {
    return row.coach.map((item, index) => (
      <p>
        <img src={item.imageurl} className="thumb-img" />&nbsp;&nbsp;{item.firstName} {item.lastName}
      </p>
    ));
  };

  onViewSportDetail = (event, sportId) => {
    const { allSports } = this.state;
    if (event && allSports && allSports.length > 0 && sportId) {
      const selectedSport = allSports.find((sport) => sport._id === sportId);
      this.props.setSport(selectedSport);
      this.setState({ selectedSport: selectedSport });
    }
  };

  onSportDelete = (event, sportId) => {
    const { allSports } = this.state;
    if (event && allSports && allSports.length > 0 && sportId) {
      const selectedSport = allSports.find((sport) => sport._id === sportId);
      this.props.setSport(selectedSport);
      this.setState({ selectedSport: selectedSport });
    }
  };

  onSelectSportToUpdate = (event, sportId) => {
    const { allSports } = this.state;
    if (event && allSports && allSports.length > 0 && sportId) {
      const selectedSport = allSports.find((sport) => sport._id === sportId);
      this.props.setSport(selectedSport);
      this.setState({ selectedSport: selectedSport });
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
    const { allSports, selectedExam } = this.state;
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
            data={allSports}
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
        <DeleteSport id={this.state.selectedSport} />
        <ShowSport id={this.state.selectedSport} />
        <EditSport selectedSport={this.state.selectedSport} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // updateExam: state.examinationReducer.updateexamination,
  createSport: state.sportReducer.createsport,
  getallsports: state.sportReducer.getallsports,
  deleteSport: state.sportReducer.deletesport,
});

const mapDispatchToProps = (dispatch) => ({
  setSport: (sportData) => {
    dispatch(setSport(sportData));
  },
  getAllSport: () => {
    dispatch(getAllSport());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SportPage);
