import React from 'react';

class NavBar extends React.Component {

  render() {
    return (
      <div id="navbar">
        <h1>NAV BAR</h1>
      </div>

    );
  }

}

class SearchBar extends React.Component {
  render() {
    return (
      <div id="searchbar">
        <h1>SEARCH BAR</h1>
      </div>
    );
  }
}

class UserTable extends React.Component {
  render() {
    return (
      <div id="listUser">
        <table>
          <tr>
            <th>Name</th>
            <th>UserName</th>
            <th>Follower</th>
            <th>Post</th>
            <th>Total Likes</th>
            <th>Total Comments</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {this.getData()}
        </table>
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.Name}</td>
        <td>{this.props.UserName}</td>
        <td>{this.props.Follower}</td>
        <td>{this.props.Post}</td>
        <td>{this.props.TotalLikes}</td>
        <td>{this.props.TotalComments}</td>
        <td>{this.props.Role}</td>
        <td>BAN</td>
      </tr>
    );
  }
}

export default function ListUser() {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <UserTable/>
    </div>
  );
}


function Data() {
  var user1 = { Name: "duc", UserName: "duc123", Follower: "20", Post: "1", TotalLikes: "1", TotalComments: "1", Role: "member" }
  var user2 = { Name: "binh", UserName: "binh6969", Follower: "50000", Post: "50", TotalLikes: "2000", TotalComments: "2501", Role: "member" }
  var user3 = { Name: "tuan anh", UserName: "tuananhphicong15", Follower: "4500", Post: "700", TotalLikes: "105", TotalComments: "", Role: "member" }
  var user4 = { Name: "loc", UserName: "loku542", Follower: "", Post: "600", TotalLikes: "90", TotalComments: "12", Role: "member" }
  let listUser = [user1, user2, user3, user4];
  return listUser;
}

function getData() {
  let userList = Data();


  const userComponents = userList.map((user) => <User Name={user.Name} UserName={user.UserName} Follower={user.Follower} Post={user.Post} TotalLikes={user.TotalLikes} TotalComments={user.TotalComments} Role={user.Role} />);
  return userComponents;
}
