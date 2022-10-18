import React, { Component } from "react";
import { Card, Table, Tag, Tooltip, message, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

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
    console.log("render");
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
    console.log(this.state.isLoading);
    const tableColumns = [
      {
        title: "User",
        dataIndex: "name",
        render: (_, record) => (
          <div className="d-flex">
            <AvatarStatus src={record.img} name={record.name} subTitle={record.email} />
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
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
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
      <Loading />
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

// const ClientsList = () => {
//   const fetchUsers = () => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then(res => res.json())
//       .then(data => console.log(data));
//   };

//   React.useEffect(() => fetchUsers, []);

//   return <h1>Clients here</h1>;
// };

// export default ClientsList;
