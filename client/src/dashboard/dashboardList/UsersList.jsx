import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

import './DashboardList.scss';
import ChangeRole from '../componentsDashboard/changeRole/ChangeRole';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/features/auth/authSlice';

import { shortenText } from '../../components/userName/UserName';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import Search from '../componentsDashboard/search/Search';
import {
  filter_users,
  selectUsers,
} from '../../redux/features/auth/filterSlice';
import ReactPaginate from 'react-paginate';

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const { isLoading, users } = useSelector((state) => state.auth);
  const filteredUsers = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const delUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete This User',
      message: 'Are you sure to do delete this user?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delUser(id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  const showProfile = (id) => {
    navigate(`/dashboard/users/profile-user/${id}`);
  };

  useEffect(() => {
    dispatch(filter_users({ users, search }));
  }, [dispatch, users, search]);

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* <div className='--flex-between'> */}
      <div className='user-summary   user-list '>
        {isLoading && <Loader />}
        <div className='table'>
          <div className='--flex-between'>
            <span>
              <h3>All Users</h3>
            </span>
            <span>
              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
          </div>
          <br />
          {!isLoading && users.length === 0 ? (
            <p>No user found ... </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => {
                  const { _id, firstName, lastName, email, role } = user;
                  const name = firstName + ' ' + lastName;
                  return (
                    <tr key={_id}>
                      <td>{itemOffset + index + 1}</td>
                      <td>{shortenText(name, 15)}</td>
                      <td>{email}</td>
                      <td>{role}</td>
                      <td>
                        <ChangeRole id={_id} email={email} />
                      </td>
                      <td>
                        <span className='--flex-around'>
                          <FaTrashAlt
                            size={20}
                            color='red'
                            onClick={() => confirmDelete(_id)}
                          />

                          <ImProfile
                            size={20}
                            color='steelblue'
                            onClick={() => showProfile(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel='<'
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='page-num'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeLinkClassName='activePage'
        />
      </div>
    </>
  );
};

export default UsersList;
