import React from 'react';
import { Input } from 'antd';

const CustomSearch = ({ onSearch }) => {
  return (
    <div>
      <Input.Search
        placeholder="Nhập từ khóa tìm kiếm"
        onSearch={onSearch}
        enterButton
        style={{ width: 300, marginRight: '10px', marginTop: '15px'}}
      />
    </div>
  );
};

export default CustomSearch;
