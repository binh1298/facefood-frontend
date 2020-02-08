import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

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
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>Follower</TableCell>
                <TableCell>Post</TableCell>
                <TableCell>Total Likes</TableCell>
                <TableCell>Total Comments</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getData()}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell><a href="#">{this.props.Name}</a></TableCell>
        <TableCell>{this.props.UserName}</TableCell>
        <TableCell>{this.props.Follower}</TableCell>
        <TableCell>{this.props.Post}</TableCell>
        <TableCell>{this.props.TotalLikes}</TableCell>
        <TableCell>{this.props.TotalComments}</TableCell>
        <TableCell>{this.props.Role}</TableCell>
        <TableCell>
          <Button variant="contained" color="secondary" disableElevation>
            BAN
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default function ListUser() {
  return (
    <div>
      <NavBar />
      <SearchBar />
      <UserTable />
    </div>
  );
}


function Data() {
  var user1 = { Name: "duc", UserName: "duc123", Follower: "20", Post: "1", TotalLikes: "1", TotalComments: "1", Role: "member" }
  var user2 = { Name: "binh", UserName: "binh6969", Follower: "50000", Post: "50", TotalLikes: "2000", TotalComments: "2501", Role: "member" }
  var user3 = { Name: "tuan anh", UserName: "tuananhphicong15", Follower: "4500", Post: "700", TotalLikes: "105", TotalComments: "900", Role: "member" }
  var user4 = { Name: "loc", UserName: "loku542", Follower: "50", Post: "600", TotalLikes: "90", TotalComments: "12", Role: "member" }
  let listUser = [user1, user2, user3, user4];
  return listUser;
}

function getData() {
  let userList = Data();


  const userComponents = userList.map((user) => <User Name={user.Name} UserName={user.UserName} Follower={user.Follower} Post={user.Post} TotalLikes={user.TotalLikes} TotalComments={user.TotalComments} Role={user.Role} />);
  return userComponents;
}
