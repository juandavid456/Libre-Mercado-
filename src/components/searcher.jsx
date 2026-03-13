import { Input, Space } from 'antd';
const { Search } = Input;
const Searcher = ({ onSearch }) => {
  return (
    <Search
      placeholder="¿Qué estás buscando hoy?"
      allowClear
      enterButton="Buscar"
      size="middle"
      onChange={(e) => onSearch(e.target.value)} // Filtra mientras escribes
      onSearch={(value) => onSearch(value)}      // Filtra al dar click en la lupa
      style={{ maxWidth: 400, width: '100%' }}
    />
  );
};
export default Searcher;