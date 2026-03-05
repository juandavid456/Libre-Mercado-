import { Input, Space } from 'antd';
const { Search } = Input;
const Searcher = ({ onSearch }) => {
  return (
    <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'center' }}>
      <Search
        placeholder="¿Qué estás buscando hoy?"
        allowClear
        enterButton="Buscar"
        size="large"
        onChange={(e) => onSearch(e.target.value)} // Filtra mientras escribes
        onSearch={(value) => onSearch(value)}      // Filtra al dar click en la lupa
        style={{ maxWidth: 500 }}
      />
    </div>
  );
};
export default Searcher;