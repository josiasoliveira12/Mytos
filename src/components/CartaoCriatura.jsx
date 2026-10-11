function CartaoCriatura({ criatura, aoVerDetalhes, aoAlternarFavorita }) {
  const classesRaridade = {
    Lendária: 'lendaria',
    Épica: 'epica',
    Rara: 'rara',
    Comum: 'comum',
    Mítica: 'mitica',
  }

  const classeRaridade =
    classesRaridade[criatura.raridade] || 'comum'

  const imagensPadrao = {
    Dragão: '🐉',
    Fênix: '🔥',
    Grifo: '🦅',
    Kitsune: '🦊',
    Sereia: '🧜‍♀️',
    Medusa: '🐍',
    Minotauro: '🐂',
    Centauro: '🏹',
    Hidra: '🐉',
    Outra: '✨',
  }

  const imagemPadrao =
    imagensPadrao[criatura.especie] || '✨'

  const possuiImagemPersonalizada =
    criatura.imagem &&
    (
      criatura.imagem.startsWith('data:image/') ||
      criatura.imagem.startsWith('/') ||
      criatura.imagem.startsWith('http://') ||
      criatura.imagem.startsWith('https://')
    )

  return (
    <article className="cartao-criatura">
      <span className={`raridade ${classeRaridade}`}>
        {criatura.raridade || 'Comum'}
      </span>

      {possuiImagemPersonalizada ? (
        <img
          className="imagem-cartao-criatura"
          src={criatura.imagem}
          alt={criatura.nome}
          loading="lazy"
        />
      ) : (
        <span className="ilustracao" aria-hidden="true">
          {criatura.imagem || imagemPadrao}
        </span>
      )}

      <h3>{criatura.nome}</h3>

      <button
        type="button"
        className="botao-favorita-cartao"
        onClick={() => aoAlternarFavorita(criatura)}
        aria-label={
          criatura.favorita
            ? `Remover ${criatura.nome} dos favoritos`
            : `Adicionar ${criatura.nome} aos favoritos`
        }
        aria-pressed={Boolean(criatura.favorita)}
      >
        {criatura.favorita ? '★ Favorita' : '☆ Favoritar'}
      </button>

      <button
        type="button"
        className="botao-detalhes"
        onClick={() => aoVerDetalhes(criatura)}
      >
        Ver detalhes
      </button>
    </article>
  )
}

export default CartaoCriatura