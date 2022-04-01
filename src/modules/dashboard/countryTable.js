import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import styled from "styled-components";
import { withStyles } from "@material-ui/styles";
import _ from "lodash";
import {dispatchAction} from "../../utility";
import {connect} from "react-redux";
import {countries} from 'country-data';

const TableBox = styled.div`
  width: 100%;
  height: 100%;
  max-width: 550px;
  @media (min-width: 300px) and (max-width: 1024px) {
  max-width: 1500px
  }
  @media (min-width: 300px) and (max-width: 767px) {
  max-width: 767px
  }
`;
const Flex = styled.div`
display: flex;
align-items: center;
text-align: center;
`;

const Up = styled.div`
color: #3AF219;
`;

const Down = styled.div`
color: #E62806;
`;
const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 50,
    tableBottomBorder: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    padding: "0px 40px",
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  root: {
    height: "5px",
    padding: "10px",
    width: "17px",
    whiteSpace: "nowrap",
  },
}))(TableCell);

const StyledTableHeadCell = withStyles((theme) => ({
  root: {
    height: 4,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    width: 17,
    whiteSpace: "nowrap",
  },
}))(TableCell);

const Div = styled.div`
margin-bottom: 10px;
width: 100%;
`;

function EnhancedTable(props) {
  let rows = [];
    if (!_.isEmpty(props.stats.expandedCountry) && !_.isUndefined(props.stats.expandedCountry)) {
      for (let i = 0; i < props.stats.expandedCountry.length; i++) {
        if(parseFloat(props.stats.expandedCountry[i].last24diff)>0 && parseFloat(props.stats.expandedCountry[i].last7diff)>0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Up arrow.svg" alt=""/>&nbsp;<Up>{props.stats.expandedCountry[i].last24diff+"%"}</Up></Flex>,
          last7: <Flex><img src="/images/Up arrow.svg" alt=""/>&nbsp;<Up>{props.stats.expandedCountry[i].last7diff+"%"}</Up></Flex>,
        });
      }
      else if(parseFloat(props.stats.expandedCountry[i].last24diff)>0 && parseFloat(props.stats.expandedCountry[i].last7diff)<0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Up arrow.svg" alt=""/>&nbsp;<Up>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Up></Flex>,
          last7: <Flex><img src="/images/Down arrow.svg" alt=""/>&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last7diff).toFixed(2)+"%"}</Down></Flex>
        });
      }else if(parseFloat(props.stats.expandedCountry[i].last24diff)>0 && parseFloat(props.stats.expandedCountry[i].last7diff)===0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Up arrow.svg" alt=""/>&nbsp;<Up>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Up></Flex>,
          last7: props.stats.expandedCountry[i].last7diff+"%"
        });
      }
      else if(parseFloat(props.stats.expandedCountry[i].last24diff)<0 && parseFloat(props.stats.expandedCountry[i].last7diff)>0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Down arrow.svg" alt=""/>&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Down></Flex>,
          last7: <Flex><img src="/images/Up arrow.svg" alt=""/>&nbsp;<Up>{props.stats.expandedCountry[i].last7diff+"%"}</Up></Flex>,
        });
      }
      else if(parseFloat(props.stats.expandedCountry[i].last24diff)<0 && parseFloat(props.stats.expandedCountry[i].last7diff)<0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Down arrow.svg" alt=""/>&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Down></Flex>,
          last7: <Flex><img src="/images/Down arrow.svg" alt=""/>&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last7diff).toFixed(2)+"%"}</Down></Flex>
        });
      }else if(parseFloat(props.stats.expandedCountry[i].last24diff)<0 && parseFloat(props.stats.expandedCountry[i].last7diff)===0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: <Flex><img src="/images/Down arrow.svg" alt=""/>&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last24diff).toFixed(2)+"%"}</Down></Flex>,
          last7: props.stats.expandedCountry[i].last7diff+"%"
        });
      }

      else if(parseFloat(props.stats.expandedCountry[i].last24diff)===0 && parseFloat(props.stats.expandedCountry[i].last7diff)>0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: props.stats.expandedCountry[i].last24diff+"%",
          last7: <Flex><img src="/images/Up arrow.svg" alt=""/>&nbsp;<Up>{props.stats.expandedCountry[i].last7diff+"%"}</Up></Flex>,
        });
      }
      else if(parseFloat(props.stats.expandedCountry[i].last24diff)===0 && parseFloat(props.stats.expandedCountry[i].last7diff)<0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: props.stats.expandedCountry[i].last24diff+"%",
          last7: <Flex><img src="/images/Down arrow.svg" alt=""/>&nbsp;<Down>{Math.abs(props.stats.expandedCountry[i].last7diff).toFixed(2)+"%"}</Down></Flex>
        });
      }else if(parseFloat(props.stats.expandedCountry[i].last24diff)===0 && parseFloat(props.stats.expandedCountry[i].last7diff)===0){
        rows.push({
          id: 1 + i,
          countries: countries[props.stats.expandedCountry[i].country].name,
          last24h: props.stats.expandedCountry[i].count,
          last24: props.stats.expandedCountry[i].last24diff+"%",
          last7: props.stats.expandedCountry[i].last7diff+"%"
        });
      }
      }}

  function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: "id",
      disablePadding: true,
      label: "#",
    },
    {
      id: "countries",
      disablePadding: true,
      label: "Countries",
    },
    {
      id: "last24h",
      numeric: true,
      disablePadding: true,
      label: "Last 24 Hrs",
    },
    {
      id: "last24",
      numeric: true,
      disablePadding: true,
      label: "Last 24 Hrs",
    },
    {
      id: "last7",
      numeric: true,
      disablePadding: true,
      label: "Last 7 Days",
    },
  ];

  function EnhancedTableHead() {

    return (
      <TableHead
       className=""
       >
        <StyledTableRow
        style={{
        height: "40px"
        }}
        >
          {headCells.map((headCell) => (
            <StyledTableHeadCell
              key={headCell.id}
              style={{
                color: "white",
                whiteSpace: "nowrap",
                alignContent: "start",
                borderColor: "#4E6AB5",
              }}
            >
              <TableSortLabel
                active={false}
                hideSortIcon={true}
                style={{
                color: "white"
                }}
              >
                {headCell.label}
              </TableSortLabel>
            </StyledTableHeadCell>
          ))}
        </StyledTableRow>
      </TableHead>
    );
  }

  return (
    
    <TableBox sx={{ width: "auto" }}>
      <TableContainer>
      <Div>
        <Table sx={{ minWidth: 100 }}
         className='time-table-row-select'
         rowsPerPage={10}
        >
          <EnhancedTableHead
          />
          <TableBody>
            {stableSort(rows.slice(0,10)).map(
              (row, index) => {
                return (
                  <StyledTableRow>
                    <StyledTableCell
                      style={{
                        color: "white",
                        borderColor: "#4E6AB5",
                      }}
                    >
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        color: "white",
                        borderColor: "#4E6AB5",
                      }}
                    >
                      {row.countries}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        color: "white",
                        borderColor: "#4E6AB5",
                      }}
                    >
                      {row.last24h}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        borderColor: "#4E6AB5",
                        color: "white",
                      }}
                    >
                      {row.last24}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{
                        borderColor: "#4E6AB5",
                        color: "white",
                      }}
                    >
                      {row.last7}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            )}
          </TableBody>
        </Table>
        </Div>
      </TableContainer>
    </TableBox>
  );
}


const mapStateToProps = (state) => {
  return {stats: state.stats}
};

export default connect(mapStateToProps, {dispatchAction})(EnhancedTable);