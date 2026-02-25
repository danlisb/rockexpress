import "../styles/AddAddress.css";

export default function AddAddress() {
  return (
    <div className="add-address-container">
      <h2>Adicionar Endereço</h2>
      <form className="add-address-form">
        <label>Rua</label>
        <input type="text" name="street" placeholder="Digite a rua" />

        <label>Número</label>
        <input type="text" name="number" placeholder="Número" />

        <label>Bairro</label>
        <input type="text" name="district" placeholder="Digite o bairro" />

        <label>Cidade</label>
        <input type="text" name="city" placeholder="Digite a cidade" />

        <label>Estado</label>
        <select name="state">
          <option value="">Selecione o estado</option>
          <option value="SP">SP</option>
          <option value="RJ">RJ</option>
          <option value="MG">MG</option>
          {/* outros estados */}
        </select>

        <button type="submit">Salvar Endereço</button>
      </form>
    </div>
  );
}
