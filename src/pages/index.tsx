import React from 'react';

type UserItem = {
  email: string;
  name: string;
  address: string;
  phone: string;
  createAt: number;
};

const listUser: UserItem[] = [
  { address: 'abcd', createAt: 123454, email: 'te4st@gmail.coom', name: 'Nguyen Van A', phone: '034846292' },
  { address: 'abcd', createAt: 123454, email: 'te4st@gmail.coom', name: 'Nguyen Van A', phone: '034846292' },
  { address: 'abcd', createAt: 123454, email: 'te4st@gmail.coom', name: 'Nguyen Van A', phone: '034846292' },
  { address: 'abcd', createAt: 123454, email: 'te4st@gmail.coom', name: 'Nguyen Van A', phone: '034846292' },
  { address: 'abcd', createAt: 123454, email: 'te4st@gmail.coom', name: 'Nguyen Van A', phone: '034846292' },
  { address: 'abcd', createAt: 123454, email: 'te4st@gmail.coom', name: 'Nguyen Van A', phone: '034846292' },
  { address: 'abcd', createAt: 123454, email: 'te4st@gmail.coom', name: 'Nguyen Van A', phone: '034846292' },
];

type Column<T> = {
  title: string;
  key: keyof T;
  cell?: (data: T) => React.ReactNode;
};

function Table<T>({ columns, items }: { columns: Column<T>[]; items: T[] }) {
  const renderHeader = () => {
    return columns.map((column, index) => {
      return (
        <th key={index} className="w-20">
          {column.title}
        </th>
      );
    });
  };

  const renderCell = (item: T) => {
    return columns.map((column, index) => {
      if (column.cell) {
        return (
          <td key={index} className="w-20">
            {column.cell(item)}
          </td>
        );
      }

      return (
        <td key={index} className="w-20">
          {item[column.key] as React.ReactNode}
        </td>
      );
    });
  };

  const renderBody = () => {
    return items.map((item, index) => {
      return <tr key={index}> {renderCell(item)}</tr>;
    });
  };

  return (
    <table className="w-[700px]">
      <thead>
        <tr>{renderHeader()}</tr>
      </thead>
      <tbody>{renderBody()}</tbody>
    </table>
  );
}

export default function HomePage() {
  return (
    <Table
      items={listUser}
      columns={[
        { title: 'Name', key: 'name', cell: (data) => <a href="#">{data.name}</a> },
        { title: 'Email', key: 'email' },
        { title: 'Phone', key: 'phone' },
        { title: 'Address', key: 'address' },
      ]}
    />
  );
}
