import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import style from "styled-components";
import { styled } from "@mui/material/styles";
import { withStyles } from "@material-ui/styles";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import _ from "lodash";
import ReactTooltip from "react-tooltip";
import { store, useGlobalState } from "state-pool";
import OutlinedInput from "@mui/material/OutlinedInput";

store.setState("selected", []);
store.setState("slider", true);
store.setState("tableRows", []);

const TableBox = style.div`
  width: 100%;
  overflow: scroll;
  display: block;
  overflow-y: auto;
  white-space: nowrap;
`;

const LiveLabel = style.div`
font-family: "Inter", Medium;
font-weight: 500;
font-size: 15px;
margin-top: 3px;
color: #393939;
@media (min-height: 300px) and (max-width: 767px){

font-size: 12px;
}
`;

const SpaceBetween = style.div`
display: flex;
justify-content: space-between;
margin-right: 40px;
white-space: nowrap;
align-items: center;
text-align: center;
margin-bottom: 10px;
`;

const Label = style.div`
  font-size: 12px;
  line-height: 15px;
  font-family: "Inter";
  color: #393939;
  font-weight: 600;
  cursor: pointer;
`;
const DisplayFlex = style.div`
  display: flex;
  align-items: center;
  text-align: center;
`;
const Img = style.img`
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: 50,
  },
}))(TableRow);

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundImage: 'url("/images/Selected.svg")',
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    content: '""',
  },
});

const StyledTableCell = withStyles((theme) => ({
  root: {
    fontWeight: "400",
    borderBottom: "0.3px solid #E8E8E8",
    padding: "6px",
  },
}))(TableCell);

const headCells = [

  {
    id: "nodeName",

    disablePadding: true,

    label: (
      <DisplayFlex>
        <Label>Node Name</Label>&nbsp;
        <ReactTooltip
          id="nodeName"
          className="extra"
          arrowColor="transparent"
          textColor="black"
          borderColor="white"
          border={true}
          delayHide={0}
          delayShow={0}
          clickable={true}
          place="bottom"
          effect="solid"
        >
          Name of the specified node
        </ReactTooltip>
        <Img
          data-tip="nodeName"
          data-for="nodeName"
          src="/images/Help.svg"
          alt=" "
        />
      </DisplayFlex>
    ),
  },
  {
    id: "type",

    disablePadding: false,
    label: (
      <DisplayFlex>
        <Label>Type</Label>&nbsp;
        <ReactTooltip
          id="type"
          className="extra"
          arrowColor="transparent"
          textColor="black"
          borderColor="white"
          border={true}
          delayHide={0}
          delayShow={0}
          clickable={true}
          place="bottom"
          effect="solid"
        >
          Type of node with the architecture and version details
        </ReactTooltip>
        <Img data-tip="type" data-for="type" src="/images/Help.svg" alt=" " />
      </DisplayFlex>
    ),
  },
  {
    id: "latency",
    numeric: true,
    disablePadding: false,
    label: (
      <DisplayFlex>
        <Label>Latency</Label>&nbsp;
        <ReactTooltip
          id="latency"
          className="extra"
          arrowColor="transparent"
          textColor="black"
          borderColor="white"
          border={true}
          delayHide={0}
          delayShow={0}
          clickable={true}
          place="bottom"
          effect="solid"
        >
          Delay in acceptance of a transaction
        </ReactTooltip>
        <Img
          data-tip="latency"
          data-for="latency"
          src="/images/Help.svg"
          alt=" "
        />
      </DisplayFlex>
    ),
  },
  {
    id: "peers",
    numeric: true,
    disablePadding: false,
    label: (
      <DisplayFlex>
        <Label>Peers</Label>&nbsp;
        <ReactTooltip
          id="peers"
          className="extra"
          arrowColor="transparent"
          textColor="black"
          borderColor="white"
          border={true}
          delayHide={0}
          delayShow={0}
          clickable={true}
          place="bottom"
          effect="solid"
        >
          Number of peers sharing the ledger
        </ReactTooltip>
        <Img data-tip="peers" data-for="peers" src="/images/Help.svg" alt=" " />
      </DisplayFlex>
    ),
  },
  {
    id: "pendingTxn",
    numeric: true,
    disablePadding: false,
    label: (
      <DisplayFlex>
        <Label>Pending Txn</Label>&nbsp;
        <ReactTooltip
          id="pending"
          className="extra"
          arrowColor="transparent"
          textColor="black"
          borderColor="white"
          border={true}
          delayHide={0}
          delayShow={0}
          clickable={true}
          place="bottom"
          effect="solid"
        >
          Number of incomplete transactions
        </ReactTooltip>
        <Img
          data-tip="pending"
          data-for="pending"
          src="/images/Help.svg"
          alt=" "
        />
      </DisplayFlex>
    ),
  },
  {
    id: "bestBlock",
    numeric: true,
    disablePadding: false,
    label: (
      <DisplayFlex>
        <Label>Best Block</Label>&nbsp;
        <ReactTooltip
          id="lastblock"
          className="extra"
          arrowColor="transparent"
          textColor="black"
          borderColor="white"
          border={true}
          delayHide={0}
          delayShow={0}
          clickable={true}
          place="bottom"
          effect="solid"
        >
          Latest block associated with the node
        </ReactTooltip>
        <Img
          data-tip="lastblock"
          data-for="lastblock"
          src="/images/Help.svg"
          alt=" "
        />
      </DisplayFlex>
    ),
  },
  {
    id: "graph",
    numeric: true,
    disablePadding: false,
  },
  {
    id: "upTime",
    numeric: true,
    disablePadding: false,
    label: (
      <DisplayFlex>
        <Label>Up Time</Label>&nbsp;
        <Img
          data-tip="uptime"
          data-for="uptime"
          src="/images/Help.svg"
          alt=" "
        />
        <ReactTooltip
          id="uptime"
          className="extra"
          arrowColor="transparent"
          textColor="black"
          borderColor="white"
          border={true}
          delayHide={0}
          delayShow={0}
          clickable={true}
          place="left"
          effect="solid"
        >
          Total available and working time of network
        </ReactTooltip>
      </DisplayFlex>
    ),
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell style={{
          paddingLeft: "30px",
          paddingRight: "0px"
        }}>
        <DisplayFlex>
        <Label>Pin</Label>&nbsp;
        <ReactTooltip
          id="pin"
          className="extra"
          arrowColor="transparent"
          textColor="black"
          borderColor="white"
          border={true}
          delayHide={0}
          delayShow={0}
          clickable={true}
          place="bottom"
          effect="solid"
        >
          Pin to keep the node on the top
        </ReactTooltip>
        <Img
          data-tip="pin"
          data-for="pin"
          src="/images/Help.svg"
          alt=" "
        />
      </DisplayFlex>
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <TableSortLabel
              active={false}
              hideSortIcon={true}
              style={{
                fontSize: "12px",
                lineHeight: "15px",
                fontFamily: "Inter",
              }}
            >
              {headCell.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

function EnhancedTable(props) {
  const [sliderCheck, setSliderCheck] = useGlobalState("slider");
  const [selected, setSelected] = useGlobalState("selected");
  
  function setClass(data){
    if(sliderCheck === true){
      return data;
    }
    else{
      return "";
    }
  }

  const handleSlider = () => {
    setSliderCheck(!sliderCheck);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  function stableSort(array) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    return stabilizedThis.map((el) => el[0]);
  }

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  const [rows, setRows] = useGlobalState("tableRows");
  useEffect(() => {
    if (sliderCheck === true) {
      if (!_.isEmpty(selected)) {
        let pin = selected;
        for (let i = 0; i < pin.length; i++) {
          let index = props.stats.nodesArr.findIndex(
            (a) => a.nodeName === pin[i]
          );
          arraymove(props.stats.nodesArr, index, 0);
          setRows(props.stats.nodesArr);
        }
      } else {
        setRows(props.stats.nodesArr);
      }
    }
    else{
      if (!_.isEmpty(selected)) {
        let pin = selected;
        for (let i = 0; i < pin.length; i++) {
          let index = rows.findIndex(
            (a) => a.nodeName === pin[i]
          );
          arraymove(rows, index, 0);
          setRows(rows);
        }
      }
    }
  },[props.stats.nodesArr]);

  const [query, setQuery] = useState("");
  const filteredRows = props.stats.nodesArr.filter((row) => {
    return row.nodeName.toLowerCase().includes(query.toLowerCase());
  });

  const getLatencyColor = (stats) => {
    if (!stats) {
      return "text-gray";
    }
    else if(stats.active === false) {
      return "text-danger";
    } else {
      if (stats.latency <= 100) {
        return "text-success";
      }
      if (stats.latency > 100 && stats.latency <= 1000) {
        return "text-warning";
      }
      if (stats.latency > 1000) {
        return "text-danger";
      }
    }
  };

  const getColumnsColor = (stats) => {
    if (!stats || !stats.active) return "text-gray";

    return stats.peers <= 1
      ? "text-danger"
      : stats.peers > 1 && stats.peers < 4
      ? "text-warning"
      : "text-success";
  };

  const getLastBlockColor = (stats, best) => {
    if (!stats || !stats.active) return "text-gray";

    return best - stats.block.number < 1
      ? "text-success"
      : best - stats.block.number === 1
      ? "text-warning"
      : best - stats.block.number > 1 && best - stats.block.number < 4
      ? "text-orange"
      : "text-danger";
  };

  const getUpTimeColor = (stats) => {
    if (!stats) {
      return "text-gray";
    } else {
      let uptime = stats.uptime;
      let active = stats.active;

      if (!active) return "text-gray";

      if (uptime >= 90) return "text-success";

      if (uptime >= 75) return "text-warning";

      return "text-danger";
    }
  };

  return (
    <>
      <div className="search-wrapper">
        <div>
          <OutlinedInput
            style={{ backgroundColor: "white" }}
            required
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by node name"
            startAdornment={
              <div style={{ marginRight: "10px" }}>
                <img src="images/Search.svg" alt="" />
              </div>
            }
            endAdornment={
              <div>
              {query!=="" ? <Img onClick={() => setQuery("")} src="images/Close.svg" alt="" /> : ""}
              </div>
            }
          />
        </div>
        <SpaceBetween>
          <DisplayFlex>
            <ReactTooltip
              id="live"
              className="extra"
              arrowColor="transparent"
              textColor="black"
              borderColor="white"
              border={true}
              delayHide={0}
              delayShow={0}
              clickable={true}
              place="bottom"
              effect="solid"
            >
              Enable/disable the live updates of nodes
            </ReactTooltip>
            <Img
              data-tip="live"
              data-for="live"
              src="/images/Help.svg"
              alt=" "
            />
          </DisplayFlex>
          &nbsp;
          <LiveLabel>Live Updates</LiveLabel>
          <div className="switch">
            <input
              id="checkbox1"
              className="look"
              type="checkbox"
              checked={sliderCheck}
              onChange={handleSlider}
            />
            <label for="checkbox1"></label>
          </div>
        </SpaceBetween>
      </div>
      <TableBox sx={{ width: "auto", backgroundColor: "#F8F8F8" }}>
        <Paper sx={{ width: "auto", minHeight: "50vh" }}>
          <TableContainer>
            <Table sx={{ minWidth: 70 }} aria-labelledby="tableTitle">
              {/* {Head} */}
              <EnhancedTableHead />
              {/* <Main/> */}
              {rows.length === 1 || rows.length === 0 ? (
                <div style={{ position: "absolute", left: "48vw" }}>
                  <div
                    className="table-dots"
                    style={{ top: "40px", marginTop: "200px" }}
                  >
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div
                    className="loadingText"
                    style={{
                      color: "#C0C0C0",
                      position: "relative",
                      fontSize: "0.7rem",
                      top: "20px",
                      right: "2.5vw",
                    }}
                  >
                    Loading Nodes Data
                  </div>
                </div>
              ) : (
                <>  {filteredRows.length === 0 ? (
                  <div style={{ position: "absolute", left: "48vw" }}>
                  <div
                    className="loadingText"
                    style={{
                      color: "#C0C0C0",
                      position: "relative",
                      fontSize: "1.2rem",
                      top: "20px",
                      right: "0.5vw",
                    }}
                  >
                    No node found
                  </div>
                </div>
                ) : (
                    <TableBody>
                      {stableSort(query !== "" ? filteredRows : rows).map(
                        (row, index) => {
                          const labelId = `enhanced-table-checkbox-${index}`;
                          const isItemSelected = isSelected(row.nodeName);
                          let block = row.lastBlock.toLocaleString();
                          const stats = setClass(row.stats);
                          return (
                            <StyledTableRow>
                              <StyledTableCell padding="radio">
                                <Radio
                                  className="radioButton"
                                  tabIndex={-1}
                                  key={row.nodeName}
                                  onClick={(event) => {
                                    handleClick(event, row.nodeName);
                                  }}
                                  style={{
                                    paddingRight: "0px",
                                    paddingLeft: "18px",
                                  }}
                                  sx={{
                                    ml: 1,
                                    "&.MuiRadio-root:hover": {
                                      bgcolor: "transparent",
                                    },
                                  }}
                                  color="default"
                                  checkedIcon={<BpCheckedIcon />}
                                  icon={<BpIcon />}
                                  checked={isItemSelected}
                                  disableRipple
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell
                                scope="row"
                                padding="none"
                                style={{
                                  fontSize: "12px",
                                  color: "#393939",
                                  fontFamily: "Inter",
                                  fontWeight: "400",
                                }}
                                className={getColumnsColor(stats)}
                              >
                                {row.nodeName}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  fontSize: "12px",
                                  color: "#393939",
                                  fontFamily: "Inter",
                                  fontWeight: "400",
                                  whiteSpace: "nowrap",
                                }}
                                className={getColumnsColor(stats)}
                              >
                                {row.type}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  fontSize: "12px",
                                  color: "#393939",
                                  fontFamily: "Inter",
                                  fontWeight: "400",
                                  columnWidth: "70px",
                                }}
                                className={getLatencyColor(stats)}
                              >
                                {row.latency}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  fontSize: "12px",
                                  color: "#393939",
                                  fontFamily: "Inter",
                                  fontWeight: "400",
                                  columnWidth: "70px",
                                }}
                                className={getColumnsColor(stats)}
                              >
                                {row.peers}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  fontSize: "12px",
                                  color: "#393939",
                                  fontFamily: "Inter",
                                  fontWeight: "400",
                                  columnWidth: "70px",
                                }}
                                className={getColumnsColor(stats)}
                              >
                                {row.pendingTxn}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  fontSize: "12px",
                                  color: "#393939",
                                  fontFamily: "Inter",
                                  fontWeight: "400",
                                  columnWidth: "70px",
                                }}
                                className={getLastBlockColor(
                                  stats,
                                  props.stats.bestBlock
                                )}
                              >
                                #{block}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  fontSize: "12px",
                                  color: "#393939",
                                  fontFamily: "Inter",
                                  fontWeight: "400",
                                }}
                              >
                                {row.graph}
                              </StyledTableCell>
                              <StyledTableCell
                                style={{
                                  fontSize: "12px",
                                  color: "#393939",
                                  fontFamily: "Inter",
                                  fontWeight: "400",
                                }}
                                className={getUpTimeColor(stats)}
                              >
                                {row.upTime}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        }
                      )}
                    </TableBody>
                )}
                </>
              )}
            </Table>
          </TableContainer>
        </Paper>
      </TableBox>
    </>
  );
}

const mapStateToProps = (state) => {
  return { stats: state.stats };
};

export default connect(mapStateToProps, { dispatchAction })(EnhancedTable);
