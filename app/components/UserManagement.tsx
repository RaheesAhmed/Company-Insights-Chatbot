import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { TrashIcon } from '@heroicons/react/solid';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const { users: { data } } = await response.json(); // Adjusted to match the API structure
            setUsers(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch('/api/users', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }

                fetchUsers(); // Refresh the user list after successful deletion
            } catch (err) {
                console.error('Error deleting user:', err);
                setError(err.message);
            }
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: row => `${row.firstName} ${row.lastName}`,
            },
            {
                Header: 'Email',
                accessor: row => row.emailAddresses[0]?.emailAddress || 'N/A',
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <button
                        onClick={() => handleDelete(row.original.id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: users });

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">Error: {error}</div>;

    if (!Array.isArray(users) || users.length === 0) {
        return <div>No users found.</div>;
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="container mx-auto p-10 ">

            <p className="mb-4 text-white">Total Users: {users.length}</p>
            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black text-white">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-black text-white divide-y divide-gray-200">
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-6 py-4 whitespace-nowrap"
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
