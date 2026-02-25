import React, { useState } from 'react';
import '../styles/SellerAdd.css';

export default function SellerAddPage() {
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: '',
    tamanho: '',
    visivel: true,
    imagem: null, // apenas 1 imagem agora
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduto(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduto(prev => ({
        ...prev,
        imagem: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let base64Image = null;

      if (produto.imagem) {
        base64Image = await convertToBase64(produto.imagem);
      }

      const produtoPayload = {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: parseFloat(produto.preco),
        estoque: parseInt(produto.estoque),
        ativo: produto.visivel,
        imagemBase64: base64Image,
        // tamanho: produto.tamanho,
      };

      console.log('Enviando Payload Simplificado:', produtoPayload);

      // pega o vendedorId do localStorage
      const vendedorId = localStorage.getItem("vendedorId");

      const response = await fetch(`http://localhost:8080/produtos/vendedor/${vendedorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produtoPayload),
      });

      if (!response.ok) {
        // Para ter mais detalhes do erro, você pode tentar ler o corpo da resposta
        const errorData = await response.text();
        console.error("Detalhes do erro do servidor:", errorData);
        throw new Error("Erro ao cadastrar produto");
      }

      console.log("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro no cadastro:", error);
    }
  };

  // Função auxiliar para converter em base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="seller-page">
      <div className="images-column">
        {!produto.imagem && (
          <div className="add-photo">
            <span>+</span>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
          </div>
        )}
        {produto.imagem && (
          <img
            src={URL.createObjectURL(produto.imagem)}
            alt="Pré-visualização do produto"
          />
        )}
      </div>

      <div className="form-column">
        <input
          id='product-name'
          type="text"
          placeholder="Nome do produto"
          value={produto.nome}
          onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
        />

        <div className="price-section">
          <input
            type="number"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            placeholder="R$ 0,00"
          />
          <button type="button" onClick={handleSubmit}>Atualizar</button>
        </div>

        <textarea
          name="descricao"
          value={produto.descricao}
          onChange={handleChange}
          rows="4"
        />

        <div className="options-row">
          <input
            type="number"
            name="estoque"
            value={produto.estoque}
            onChange={handleChange}
            placeholder="Estoque"
          />
        </div>

        <div className="options-row">
          <select name="categoria" value={produto.categoria || ""} onChange={handleChange}>
            <option value="">Selecione a Categoria</option>
            <option value="Banda/Artista">Banda/Artista</option>
          </select>

          <label className="toggle-visible">
            Visível
            <input
              type="checkbox"
              name="visivel"
              checked={produto.visivel}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
        </div>

        <button onClick={handleSubmit} className="submit-button">
          Adicionar ao Catálogo
        </button>
      </div>
    </div>
  );
}
