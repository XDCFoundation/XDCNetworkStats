import React from "react";
import BaseComponent from "../baseComponent";
import DashboardComponent from "./dashboardComponent";
import "../../services/socket";

class Dashboard extends BaseComponent {
  constructor(props) {
      super(props);
      this.state = {
          nodes: 192,
          totalNodes: 196,
          countries: 60,
          bestBlock: 55963,
          avgTime: 0.1,
          lastBlock: 15,
          gasPrice: 0.002,
          avgRate: 98,
          upTime: 99

      };
     
  }

  componentDidMount() {}

  render() {
    return <DashboardComponent/>;
  }
}
export default Dashboard;