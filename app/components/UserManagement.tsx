import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { FaTrash, FaSpinner } from 'react-icons/fa';

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
            const { users: { data } } = await response.json();
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

                fetchUsers();
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
                        className="text-red-400 hover:text-red-600 transition-colors duration-200"
                        aria-label="Delete user"
                    >
                        <FaTrash className="h-5 w-5" />
                    </button>
                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: users });

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin h-8 w-8 text-purple-500" />
        </div>
    );

    if (error) return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
        </div>
    );

    if (!Array.isArray(users) || users.length === 0) {
        return <div className="text-center text-gray-500 mt-4">No users found.</div>;
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-xl">

            <p className="mb-4 text-gray-300">Total Users: {users.length}</p>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table {...getTableProps()} className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="py-3 px-6"
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="bg-gray-800">
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="border-b border-gray-700 hover:bg-gray-600 transition-colors duration-200">
                                    {row.cells.map(cell => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="py-4 px-6"
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
        </div>
    );
};

export default UserManagement;