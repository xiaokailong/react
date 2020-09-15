import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "@/store/actions";
import { Select } from "antd";

const { Option } = Select;

class RoleSelect extends React.Component {
  componentDidMount() {
    this.props.dispatch((dispatch, getState) => {
      dispatch(actions.home.getRoleList());
    });
  }
  render() {
    const { placeholder } = this.props;
    return (
      <>
        <Select
          allowClear
          mode="multiple"
          showSearch
          optionFilterProp="children"
          placeholder={placeholder}
          style={{ width: 185 }}
          onChange={(val) => this.props.onChange(val)}
        >
          {this.props.state.home.roleList.map((item) => {
            return (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </>
    );
  }
}
// 类型检测
RoleSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
//默认值
RoleSelect.defaultProps = {
  placeholder: "请选择角色",
};

export default connect((state) => {
  return {
    state,
  };
})(RoleSelect);
