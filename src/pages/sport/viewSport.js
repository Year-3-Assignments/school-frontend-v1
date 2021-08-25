/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAllSport, setSport
} from '../../actions/sportActions';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import CreateSport from './AddSports';
import DeleteSport from './DeleteSport';
import ShowSport from './ShowSport';

// import UpdateExam from '../update/update_exam';

const { SearchBar } = Search;

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
        allSports: nextProps.getallsports
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
      dataField: '_id',
      text: 'Sport ID'
    },
    { dataField: 'name', text: 'Sport Title' },
    { dataField: 'view', 
      text: 'View',
      formatter: (cell, row) => this.viewSportDetails(row),
    },
    { dataField: 'edit', 
      text: 'Edit',      
      formatter: (cell, row) => this.editSportDetails(row),
    },
    { dataField: 'delete', 
      text: 'Delete',      
      formatter: (cell, row) => this.deleteDetails(row),
    }
  ];

  viewSportDetails = (row) => {
      return (<a
        className="dropdown-item"
        href="#"
        data-mdb-toggle="modal"
        data-mdb-target="#one-sport"
        onClick={(e) => this.onViewSportDetail(e, row._id)} >
       <i className="far fa-eye" /> View
    </a>)
  }

  deleteDetails = (row) => {
    return (<a className="dropdown-item"       
      href="#"
      data-mdb-toggle="modal"
      data-mdb-target="#delete-sport"
      onClick={(e) => this.onSportDelete(e, row._id)} >
        <i className="far fa-trash-alt" /> Delete
      </a>)
  }

  editSportDetails = (row) => {
    return (<a
      className="dropdown-item"
      href="#"
      data-mdb-toggle="modal"
      data-mdb-target="#update-exam"
      onClick={(e) => this.onSelectSportToUpdate(e, row._id)}
    >
      <i className="far fa-edit" /> Edit
    </a>)
  }

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
      this.props.setExam(selectedSport);
      this.setState({ selectedSport: selectedSport });
    }
  };

  render() {
    const { allSports, selectedExam } = this.state;
    return (
      <div className="pt-5 pb-5">
        <div className="card p-4 exam-table">
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
          >
            {(props) => (
              <div>
                <SearchBar
                  {...props.searchProps}
                  placeholder="Search sport by name"
                  className="mb-3 search-bar"
                />
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
        {/* <UpdateExam selectedExam={selectedExam} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // examinations: state.examinationReducer.getexaminationsforteacher,
  // createExam: state.examinationReducer.createexamination,
  // updateExam: state.examinationReducer.updateexamination,
  // updateExamError: state.examinationReducer.updateexaminationerror,
  createSport: state.sportReducer.createsport,
  getallsports: state.sportReducer.getallsports,
  deleteSport: state.sportReducer.deletesport
});

const mapDispatchToProps = (dispatch) => ({
  setSport: (sportData) => {
    dispatch(setSport(sportData))
  },
  getAllSport: () => {
    dispatch(getAllSport());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SportPage);
