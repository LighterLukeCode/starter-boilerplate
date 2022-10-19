import React, { Component } from "react";
import { Card, Table, Tag, Tooltip, message, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import UserView from "./UserView";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Loading from "components/shared-components/Loading";

export class UserList extends Component {
  state = {
    users: [],
    userProfileVisible: false,
    selectedUser: null,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then(response => response.json())
      .then(users => {
        this.setState({ users });
        this.setState({ isLoading: false });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser = userId => {
    this.setState({
      users: this.state.users.filter(item => item.id !== userId),
    });
    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  };

  showUserProfile = userInfo => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };

  render() {
    const { users, userProfileVisible, selectedUser } = this.state;

    const tableColumns = [
      {
        title: "User",
        dataIndex: "name",
        render: (_, record) => (
          <div className="d-flex">
            <Link to="edit-profile">
              <AvatarStatus src={record.img} name={record.name} subTitle={record.email} />
            </Link>
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = a.name[0].toLowerCase();
            b = b.name[0].toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Username",
        dataIndex: "username",
        sorter: {
          compare: (a, b) => {
            a = a.username.toLowerCase();
            b = b.username.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Website",
        dataIndex: "website",

        sorter: {
          compare: (a, b) => {
            a = a.website.toLowerCase();
            b = b.website.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "City",
        dataIndex: ["address", "city"],

        sorter: {
          compare: (a, b) => {
            a = a.address.city.toLowerCase();
            b = b.address.city.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => (
          <div className="text-right">
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteUser(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        ),
      },
    ];

    return this.state.isLoading ? (
      <Loading cover="content" />
    ) : (
      <Card bodyStyle={{ padding: "0px" }}>
        <Table columns={tableColumns} dataSource={users} rowKey="id" />
        <UserView
          data={selectedUser}
          visible={userProfileVisible}
          close={() => {
            this.closeUserProfile();
          }}
        />
      </Card>
    );
  }
}

export default UserList;
