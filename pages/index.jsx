import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
//import { usersList } from '../mockData';
import { v4 as randomId } from 'uuid'

//import Hero from '../components/Hero';
//import Content from '../components/Content';

const usersList = [
  {
    id: 1,
    userName: "Pratik Valvi",
    userNumber: 1010
  },
]



export default function Index() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    userName: '',
    userNumber: 0
  })
  const [isUpdate, setIsUpdate] = useState(false);

  const renderUsers = (list) => {
    return list.map((user) => <User id={user.id} name={user.userName} number={user.userNumber} />)
  }

  // useEffect(() => {
  //   axios.get('/api/users')
  //     .then(res => {
  //       console.log("res: ",res)
  //       setUsers(res.data)
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  useEffect(() => {
    setUsers(usersList)
  }, [])

  const addUser = () => {
    let user = {
      id: randomId(),
      userName: userData.userName,
      userNumber: userData.userNumber,
    }
    let userList = [...users];
    userList.push(user);
    setUsers(userList);
    setUserData({
      userName: '',
      userNumber: 0
    });
  }

  const handleEdit = (id, name, number) => {
    setUserData({
      userName: name,
      userNumber: number
    });
  }

  const User = (props) => {
    const {id, name, number} = props
    return (
      <Card sx={{ display: 'flex', minWidth: 275, justifyContent: 'space-between', marginTop: '2px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {number}
          </Typography>
        </CardContent>
        <CardActions>
          <Button sx={{ marginLeft: '10px' }} variant="contained" onClick={handleEdit(id, name, number)}>Edit</Button>
          <Button sx={{ marginLeft: '10px' }} variant="contained" color="error">Delete</Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: 'fit-content',
          width: '100%'
        }}
        noValidate
        autoComplete="off"
      >
        <Input placeholder="Name" value={userData.userName} onChange={(event) => {
          setUserData({...userData, userName: event.target.value})
        }}/>
        <Input sx={{ marginLeft: '10px' }} placeholder="Number" value={userData.userNumber} onChange={(event) => {
          setUserData({...userData, userNumber: event.target.value})
        }}/>
        <Button sx={{ marginLeft: '10px' }} variant="contained" disabled={!isUpdate} onClick={addUser}>Add User</Button>
      </Box>
      <Container maxWidth="sm">
        {
          renderUsers(users)
        }
      </Container>
    </>
  );
}
