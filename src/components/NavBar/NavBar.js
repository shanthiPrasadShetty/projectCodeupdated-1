import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import styles from "./NavBarStyles";
import { Link } from "react-router";
import "./NavBarStyles.scss";

export default class HeaderTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.initialValue || 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.selectedTab !== nextProps.initialValue &&
      this.props.initialValue !== nextProps.initialValue
    ) {
      this.setState({ selectedTab: nextProps.initialValue });
    }
  }

  handleChange = value => {
    // const { onChange } = this.props;
    this.setState({
      selectedTab: value
    });
    // onChange(value);
  };


  render() {
    return (
      <div className="headerTab">
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChange}
          tabItemContainerStyle={styles.Tabs.tabItemContainerStyle}
          inkBarStyle={styles.Tabs.inkBarStyle()}
        >
          <Tab
            buttonStyle={styles.Tabs.Tab.buttonStyle}
            className={
              "headerTabStyle" +
              (0 === this.state.selectedTab ? " activeTab" : "")
            }
            value={0}
            label={'Home'}
            containerElement={<Link to={"Home"} />}
          />

          <Tab
            buttonStyle={styles.Tabs.Tab.buttonStyle}
            className={
              "headerTabStyle" +
              (1 === this.state.selectedTab ? " activeTab" : "")
            }
            value={1}
            label={'Users'}
            containerElement={<Link to={"/Users"} />}
          />

          <Tab
            buttonStyle={styles.Tabs.Tab.buttonStyle}
            className={
              "headerTabStyle" +
              (2 === this.state.selectedTab ? " activeTab" : "")
            }
            value={2}
            label={'Projects'}
            containerElement={<Link to={"projects"} />}
          />

          <Tab
            buttonStyle={styles.Tabs.Tab.buttonStyle}
            className={
              "headerTabStyle" +
              (3 === this.state.selectedTab ? " activeTab" : "")
            }
            value={3}
            label = {'System Reports'}
            containerElement={<Link to={"Reports"} />}
          />

          <Tab
            buttonStyle={styles.Tabs.Tab.buttonStyle}
            className={
              "headerTabStyle" +
              (4 === this.state.selectedTab ? " activeTab" : "")
            }
            value={4}
            label = {'Setup'}
            containerElement={<Link to={"Setup"} />}
          />


          <Tab
            buttonStyle={styles.Tabs.Tab.buttonStyle}
            className={
              "headerTabStyle" +
              (5 === this.state.selectedTab ? " activeTab" : "")
            }
            value={5}
            label = {'Logout'}
            containerElement={<Link to={"Home"} />}
          />


        </Tabs>
      </div>
    );
  }
}

// HeaderTab.propTypes = {
//   onChange: React.PropTypes.func,
//   tabStyle: React.PropTypes.object,
//   tabList: React.PropTypes.array,
//   tabIcon: React.PropTypes.node,
//   initialValue: React.PropTypes.oneOfType([
//     React.PropTypes.string,
//     React.PropTypes.number
//   ])
// };
//
// HeaderTab.defaultProps = {
//   onChange: () => {},
//   tabList: [],
//   tabStyle: styles.Tabs.Tab.style
// };
