import { useEffect, useRef, useState } from 'react'
import './App.css'
import CartaoCriatura from './components/CartaoCriatura'
import FormularioCriatura from './components/FormularioCriatura'
import { criaturasIniciais } from './criaturas'

const CHAVE_LOCAL_STORAGE = 'mytos-criaturas'

const caracteristicasPadrao = {
  coragem: 50,
  inteligencia: 50,
  criatividade: 50,
  forca: 50,
  intuicao: 50,
}

const imagensPadrao = {
  Dragão: '🐉',
  Fênix: '🔥',
  Grifo: '🦅',
  Kitsune: '🦊',
  Sereia: '🧜‍♀️',
  Minotauro: '🐂',
  Outra: '✨',
}

const efeitosAntigos = {
  energia: 'arcano',
  energiaMagica: 'arcano',
  sombra: 'sombras',
}

const efeitosValidos = [
  'padrao',
  'fogo',
  'arcano',
  'impacto',
  'cura',
  'gelo',
  'raio',
  'natureza',
  'sombras',
]

function obterImagemPadrao(especie) {
  return imagensPadrao[especie] || '✨'
}

function normalizarEfeitoPoder(efeito) {
  const efeitoConvertido = efeitosAntigos[efeito] || efeito

  return efeitosValidos.includes(efeitoConvertido)
    ? efeitoConvertido
    : 'padrao'
}

function carregarCriaturas() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_LOCAL_STORAGE)

    if (!dadosSalvos) {
      return criaturasIniciais.map((criatura) => {
        const efeito = normalizarEfeitoPoder(
          criatura.efeitoPoder ||
            criatura.poderEfeito ||
            'padrao',
        )

        return {
          ...criatura,
          efeitoPoder: efeito,
          poderEfeito: efeito,
          status: criatura.status || 'Disponível',
        }
      })
    }

    const criaturasSalvas = JSON.parse(dadosSalvos)

    if (!Array.isArray(criaturasSalvas)) {
      return criaturasIniciais
    }

    return criaturasSalvas.map((criatura) => {
      const criaturaInicial = criaturasIniciais.find(
        (item) => item.id === criatura.id,
      )

      const efeito = normalizarEfeitoPoder(
        criatura.efeitoPoder ||
          criatura.poderEfeito ||
          criaturaInicial?.efeitoPoder ||
          criaturaInicial?.poderEfeito ||
          'padrao',
      )

      return {
        ...criatura,
        energia: criatura.energia ?? criaturaInicial?.energia ?? 50,

        raridade:
          criatura.raridade ||
          criaturaInicial?.raridade ||
          'Comum',

        poderNome:
          criatura.poderNome ||
          criatura.poder ||
          criaturaInicial?.poderNome ||
          'Poder Misterioso',

        poderDescricao:
          criatura.poderDescricao ||
          criatura.descricaoPoder ||
          criaturaInicial?.poderDescricao ||
          'Uma habilidade ainda desconhecida.',

        efeitoPoder: efeito,
        poderEfeito: efeito,

        caracteristicas: {
          ...caracteristicasPadrao,
          ...(criaturaInicial?.caracteristicas || {}),
          ...(criatura.caracteristicas || {}),
        },

        status: criatura.status || 'Disponível',
      }
    })
  } catch (erro) {
    console.error('Não foi possível carregar as criaturas:', erro)
    return criaturasIniciais
  }
}

function App() {
  const [criaturas, setCriaturas] = useState(carregarCriaturas)
  const [formularioAberto, setFormularioAberto] = useState(false)
  const [criaturaSelecionada, setCriaturaSelecionada] = useState(null)
  const [criaturaParaEditar, setCriaturaParaEditar] = useState(null)
  const [filtroCriaturas, setFiltroCriaturas] = useState('todas')
  const [busca, setBusca] = useState('')
  const [filtroEspecie, setFiltroEspecie] = useState('todas')
  const [filtroRaridade, setFiltroRaridade] = useState('todas')
  const [somenteFavoritas, setSomenteFavoritas] = useState(false)
  const [poderAtivo, setPoderAtivo] = useState(false)
  const [particulas, setParticulas] = useState([])

  const formularioRef = useRef(null)

  // Salva automaticamente as criaturas no navegador.
  useEffect(() => {
    try {
      localStorage.setItem(
        CHAVE_LOCAL_STORAGE,
        JSON.stringify(criaturas),
      )
    } catch (erro) {
      console.error('Não foi possível salvar as criaturas:', erro)

      if (erro.name === 'QuotaExceededError') {
        window.alert(
          'O armazenamento do navegador está cheio. Remova algumas imagens grandes e tente novamente.',
        )
      }
    }
  }, [criaturas])

  // Leva a página até o formulário quando ele é aberto.
  useEffect(() => {
    if (!formularioAberto) {
      return undefined
    }

    let quadro

    const temporizador = window.setTimeout(() => {
      quadro = window.requestAnimationFrame(() => {
        const formulario = formularioRef.current

        if (!formulario) {
          return
        }

        const posicao =
          formulario.getBoundingClientRect().top + window.scrollY

        window.scrollTo({
          top: Math.max(0, posicao - 20),
          behavior: 'smooth',
        })
      })
    }, 200)

    return () => {
      window.clearTimeout(temporizador)

      if (quadro !== undefined) {
        window.cancelAnimationFrame(quadro)
      }
    }
  }, [formularioAberto, criaturaParaEditar])

  // Controla a duração do efeito elemental.
  useEffect(() => {
    if (!poderAtivo) {
      return undefined
    }

    const temporizador = window.setTimeout(() => {
      setPoderAtivo(false)
      setParticulas([])
    }, 2500)

    return () => window.clearTimeout(temporizador)
  }, [poderAtivo])

  function abrirNovoCadastro() {
    setCriaturaParaEditar(null)
    setFormularioAberto(true)
  }

  function cancelarFormulario() {
    setFormularioAberto(false)
    setCriaturaParaEditar(null)
  }

  // Cadastra uma nova criatura.
  function cadastrarCriatura(novaCriatura) {
    const efeito = normalizarEfeitoPoder(
      novaCriatura.efeitoPoder ||
        novaCriatura.poderEfeito ||
        'padrao',
    )

    const criaturaCompleta = {
      ...novaCriatura,
      efeitoPoder: efeito,
      poderEfeito: efeito,

      poderNome:
        novaCriatura.poderNome ||
        novaCriatura.poder ||
        'Poder Misterioso',

      poderDescricao:
        novaCriatura.poderDescricao ||
        novaCriatura.descricaoPoder ||
        'Uma habilidade ainda desconhecida.',

      status: novaCriatura.status || 'Disponível',

      caracteristicas: {
        ...caracteristicasPadrao,
        ...(novaCriatura.caracteristicas || {}),
      },
    }

    setCriaturas((listaAtual) => [
      ...listaAtual,
      criaturaCompleta,
    ])

    setFormularioAberto(false)
    setCriaturaParaEditar(null)
    setFiltroCriaturas('todas')
  }

  // Atualiza os dados de uma criatura existente.
  function editarCriatura(criaturaAtualizada) {
    const efeito = normalizarEfeitoPoder(
      criaturaAtualizada.efeitoPoder ||
        criaturaAtualizada.poderEfeito ||
        'padrao',
    )

    const criaturaCompleta = {
      ...criaturaParaEditar,
      ...criaturaAtualizada,
      efeitoPoder: efeito,
      poderEfeito: efeito,

      poderNome:
        criaturaAtualizada.poderNome ||
        criaturaAtualizada.poder ||
        'Poder Misterioso',

      poderDescricao:
        criaturaAtualizada.poderDescricao ||
        criaturaAtualizada.descricaoPoder ||
        'Uma habilidade ainda desconhecida.',

      caracteristicas: {
        ...caracteristicasPadrao,
        ...(criaturaParaEditar?.caracteristicas || {}),
        ...(criaturaAtualizada.caracteristicas || {}),
      },
    }

    setCriaturas((listaAtual) =>
      listaAtual.map((criatura) =>
        criatura.id === criaturaCompleta.id
          ? criaturaCompleta
          : criatura,
      ),
    )

    setCriaturaSelecionada(criaturaCompleta)
    setFormularioAberto(false)
    setCriaturaParaEditar(null)
  }

  function salvarFormulario(criatura) {
    if (criaturaParaEditar) {
      editarCriatura(criatura)
    } else {
      cadastrarCriatura(criatura)
    }
  }

  // Abre os detalhes da criatura.
  function verDetalhes(criatura) {
    setCriaturaSelecionada(criatura)
    setPoderAtivo(false)
    setParticulas([])
  }

  // Abre o formulário de edição.
  function abrirEdicao(criatura) {
    setCriaturaParaEditar(criatura)
    setFormularioAberto(true)
    setCriaturaSelecionada(null)
    setPoderAtivo(false)
    setParticulas([])
  }

  function fecharDetalhes() {
    setCriaturaSelecionada(null)
    setCriaturaParaEditar(null)
    setPoderAtivo(false)
    setParticulas([])
  }

  // Cria partículas com posições, tamanhos e movimentos variados.
  function gerarParticulas() {
    const novasParticulas = Array.from(
      { length: 55 },
      (_, indice) => ({
        id: `${Date.now()}-${indice}`,
        posicaoX: Math.random() * 100,
        tamanho: Math.random() * 6 + 3,
        movimentoX: (Math.random() - 0.5) * 240,
        duracao: Math.random() * 1.5 + 1.5,
        atraso: Math.random() * 0.7,
        estrela: Math.random() > 0.65,
      }),
    )

    setParticulas(novasParticulas)
  }

  // Ativa o poder e gera as partículas na tela.
  function usarPoder() {
    if (!criaturaSelecionada || poderAtivo) {
      return
    }

    gerarParticulas()
    setPoderAtivo(true)
  }

  // Alterna o estado de favorita.
  function alternarFavorita(criatura) {
    setCriaturas((listaAtual) =>
      listaAtual.map((item) =>
        item.id === criatura.id
          ? { ...item, favorita: !item.favorita }
          : item,
      ),
    )

    if (criaturaSelecionada?.id === criatura.id) {
      setCriaturaSelecionada((atual) => ({
        ...atual,
        favorita: !atual.favorita,
      }))
    }
  }

  // Alimenta, brinca e faz a criatura descansar.
  function cuidarCriatura(acao) {
    if (!criaturaSelecionada) {
      return
    }

    const ajustes = {
      alimentar: 20,
      brincar: -10,
      descansar: 15,
    }

    if (!(acao in ajustes)) {
      return
    }

    const energiaAtual = Number(
      criaturaSelecionada.energia ?? 50,
    )

    const criaturaAtualizada = {
      ...criaturaSelecionada,
      energia: Math.max(
        0,
        Math.min(100, energiaAtual + ajustes[acao]),
      ),
    }

    setCriaturas((listaAtual) =>
      listaAtual.map((item) =>
        item.id === criaturaAtualizada.id
          ? criaturaAtualizada
          : item,
      ),
    )

    setCriaturaSelecionada(criaturaAtualizada)
  }

  // Exclui permanentemente uma criatura do sistema.
  function removerCriatura(criatura) {
    const confirmou = window.confirm(
      `Tem certeza de que deseja excluir ${criatura.nome} do sistema?`,
    )

    if (!confirmou) {
      return
    }

    setCriaturas((listaAtual) =>
      listaAtual.filter((item) => item.id !== criatura.id),
    )

    fecharDetalhes()
  }

  // Adiciona uma criatura à coleção.
  function adicionarAMinhaColecao(criatura) {
    if (criatura.status === 'Na minha coleção') {
      return
    }

    const criaturaAtualizada = {
      ...criatura,
      status: 'Na minha coleção',
    }

    setCriaturas((listaAtual) =>
      listaAtual.map((item) =>
        item.id === criatura.id
          ? criaturaAtualizada
          : item,
      ),
    )

    setCriaturaSelecionada(criaturaAtualizada)
  }

  // NOVA FUNÇÃO: remove a criatura da coleção sem excluí-la.
  function removerDaMinhaColecao(criatura) {
    if (criatura.status !== 'Na minha coleção') {
      return
    }

    const criaturaAtualizada = {
      ...criatura,
      status: 'Disponível',
    }

    setCriaturas((listaAtual) =>
      listaAtual.map((item) =>
        item.id === criatura.id
          ? criaturaAtualizada
          : item,
      ),
    )

    setCriaturaSelecionada(criaturaAtualizada)
  }

  // Calcula os totais da coleção.
  const totalCriaturas = criaturas.length

  const totalPessoais = criaturas.filter(
    (criatura) => criatura.status === 'Na minha coleção',
  ).length

  const totalDisponiveis = criaturas.filter(
    (criatura) => criatura.status === 'Disponível',
  ).length

  const totalFavoritas = criaturas.filter(
    (criatura) => criatura.favorita,
  ).length

  // Aplica os filtros e a pesquisa.
  const criaturasFiltradas = criaturas.filter((criatura) => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR')

    const correspondeBusca =
      !termo ||
      [
        criatura.nome,
        criatura.especie,
        criatura.descricao,
        criatura.personalidade,
        criatura.raridade,
      ].some((valor) =>
        String(valor || '')
          .toLocaleLowerCase('pt-BR')
          .includes(termo),
      )

    const correspondeStatus =
      filtroCriaturas === 'pessoal'
        ? criatura.status === 'Na minha coleção'
        : filtroCriaturas === 'disponiveis'
          ? criatura.status === 'Disponível'
          : true

    return (
      correspondeBusca &&
      correspondeStatus &&
      (filtroEspecie === 'todas' ||
        criatura.especie === filtroEspecie) &&
      (filtroRaridade === 'todas' ||
        criatura.raridade === filtroRaridade) &&
      (!somenteFavoritas || criatura.favorita)
    )
  })

  const atributos = [
    { chave: 'coragem', nome: 'Coragem' },
    { chave: 'inteligencia', nome: 'Inteligência' },
    { chave: 'criatividade', nome: 'Criatividade' },
    { chave: 'forca', nome: 'Força' },
    { chave: 'intuicao', nome: 'Intuição' },
  ]

  const imagemPersonalizada =
    Boolean(criaturaSelecionada?.imagem) &&
    (
      criaturaSelecionada.imagem.startsWith('data:image/') ||
      criaturaSelecionada.imagem.startsWith('/') ||
      criaturaSelecionada.imagem.startsWith('http://') ||
      criaturaSelecionada.imagem.startsWith('https://')
    )

  const efeitoPoder = normalizarEfeitoPoder(
    criaturaSelecionada?.efeitoPoder ||
      criaturaSelecionada?.poderEfeito ||
      'padrao',
  )

  return (
    <>
      {!criaturaSelecionada && (
        <header className="cabecalho">
          <a
            className="logo"
            href="#inicio"
            aria-label="Mytos - início"
          >
            <span className="simbolo" aria-hidden="true">
              ✧
            </span>
            <span>MYTOS</span>
          </a>

          <nav aria-label="Navegação principal">
            <a href="#inicio">Início</a>
            <a href="#colecao">Coleção</a>
          </nav>
        </header>
      )}

      <main>
        {!criaturaSelecionada && (
          <>
            <section className="apresentacao" id="inicio">
              <p className="etiqueta">
                UM UNIVERSO DE POSSIBILIDADES
              </p>

              <h1>
                Descubra o extraordinário.
                <br />
                <span>Colecione o lendário.</span>
              </h1>

              <p className="descricao">
                Explore um mundo de criaturas mitológicas, descubra seus
                poderes e construa uma coleção única.
              </p>

              <a className="botao-principal" href="#colecao">
                Explorar criaturas
              </a>
            </section>

            <section className="colecao" id="colecao">
              <header className="titulo-secao">
                <section>
                  <p className="etiqueta">SEU UNIVERSO MÍTICO</p>
                  <h2>Biblioteca de criaturas</h2>
                  <p>
                    Descubra criaturas, conheça suas habilidades e escolha
                    quais farão parte da sua coleção.
                  </p>
                </section>
              </header>

              <section
                className="filtros-avancados"
                aria-label="Pesquisa e filtros avançados"
              >
                <section className="campo-filtro">
                  <label htmlFor="buscarCriatura">Pesquisar criatura</label>
                  <input
                    id="buscarCriatura"
                    type="search"
                    value={busca}
                    onChange={(evento) => setBusca(evento.target.value)}
                    placeholder="Nome, espécie, personalidade..."
                  />
                </section>

                <section className="campo-filtro">
                  <label htmlFor="filtroEspecie">Espécie</label>
                  <select
                    id="filtroEspecie"
                    value={filtroEspecie}
                    onChange={(evento) =>
                      setFiltroEspecie(evento.target.value)
                    }
                  >
                  <option value="todas">Todas as espécies</option>

                  {[
                    ...new Set(
                      criaturas
                        .map((criatura) => criatura.especie)
                        .filter(Boolean),
                    ),
                  ]
                    .sort()
                    .map((especie) => (
                      <option key={especie} value={especie}>
                        {especie}
                      </option>
                    ))}
                  </select>
                </section>

                <section className="campo-filtro">
                  <label htmlFor="filtroRaridade">Raridade</label>
                  <select
                    id="filtroRaridade"
                    value={filtroRaridade}
                    onChange={(evento) =>
                      setFiltroRaridade(evento.target.value)
                    }
                  >
                  <option value="todas">Todas as raridades</option>

                  {['Comum', 'Rara', 'Épica', 'Lendária', 'Mítica'].map(
                    (raridade) => (
                      <option key={raridade} value={raridade}>
                        {raridade}
                      </option>
                    ),
                  )}
                  </select>
                </section>

                <button
                  type="button"
                  className={
                    somenteFavoritas
                      ? 'botao-filtro ativo'
                      : 'botao-filtro'
                  }
                  onClick={() =>
                    setSomenteFavoritas((valor) => !valor)
                  }
                  aria-pressed={somenteFavoritas}
                >
                  {somenteFavoritas
                    ? '★ Exibindo favoritas'
                    : '☆ Minhas favoritas'}
                </button>
              </section>

              <nav
                className="filtros-colecao"
                aria-label="Filtrar criaturas"
              >
                <section className="grupo-filtros">
                  <button
                    type="button"
                    className={
                      filtroCriaturas === 'todas'
                        ? 'botao-filtro ativo'
                        : 'botao-filtro'
                    }
                    onClick={() => setFiltroCriaturas('todas')}
                    aria-pressed={filtroCriaturas === 'todas'}
                  >
                    Todas{' '}
                    <span className="contador-filtro">
                      ({totalCriaturas})
                    </span>
                  </button>

                  <button
                    type="button"
                    className={
                      filtroCriaturas === 'pessoal'
                        ? 'botao-filtro ativo'
                        : 'botao-filtro'
                    }
                    onClick={() => setFiltroCriaturas('pessoal')}
                    aria-pressed={filtroCriaturas === 'pessoal'}
                  >
                    Minha coleção{' '}
                    <span className="contador-filtro">
                      ({totalPessoais})
                    </span>
                  </button>

                  <button
                    type="button"
                    className={
                      filtroCriaturas === 'disponiveis'
                        ? 'botao-filtro ativo'
                        : 'botao-filtro'
                    }
                    onClick={() => setFiltroCriaturas('disponiveis')}
                    aria-pressed={filtroCriaturas === 'disponiveis'}
                  >
                    Disponíveis{' '}
                    <span className="contador-filtro">
                      ({totalDisponiveis})
                    </span>
                  </button>
                </section>

                <button
                  type="button"
                  className="botao-principal botao-nova-criatura"
                  onClick={abrirNovoCadastro}
                >
                  + Nova criatura
                </button>
              </nav>

              {formularioAberto && (
                <section
                  ref={formularioRef}
                  className="area-formulario"
                  aria-label={
                    criaturaParaEditar
                      ? 'Formulário de edição de criatura'
                      : 'Formulário de cadastro de criatura'
                  }
                >
                  <FormularioCriatura
                    key={criaturaParaEditar?.id ?? 'nova-criatura'}
                    criaturaParaEditar={criaturaParaEditar}
                    aoCadastrar={salvarFormulario}
                    aoCancelar={cancelarFormulario}
                  />
                </section>
              )}

              {criaturasFiltradas.length > 0 ? (
                <section
                  className="grade-criaturas"
                  aria-label="Lista de criaturas"
                >
                  {criaturasFiltradas.map((criatura) => (
                    <CartaoCriatura
                      key={criatura.id}
                      criatura={criatura}
                      aoVerDetalhes={verDetalhes}
                      aoAlternarFavorita={alternarFavorita}
                    />
                  ))}
                </section>
              ) : (
                <p className="mensagem-colecao">
                  Nenhuma criatura encontrada neste filtro.
                </p>
              )}
            </section>
          </>
        )}

        {criaturaSelecionada && (
          <section
            className={`painel-detalhes-fundo ${
              poderAtivo
                ? `animacao-tela-cheia ativa ${efeitoPoder}`
                : ''
            }`}
            onClick={fecharDetalhes}
          >
            {poderAtivo && (
              <section
                className="particulas-magicas"
                aria-hidden="true"
              >
                {particulas.map((particula) => (
                  <span
                    key={particula.id}
                    className={`particula-magica ${
                      particula.estrela ? 'estrela' : ''
                    }`}
                    style={{
                      '--posicao-x': `${particula.posicaoX}%`,
                      '--tamanho': `${particula.tamanho}px`,
                      '--movimento-x': `${particula.movimentoX}px`,
                      '--duracao': `${particula.duracao}s`,
                      '--atraso': `${particula.atraso}s`,
                    }}
                  />
                ))}
              </section>
            )}

            <article
              className="painel-detalhes"
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-detalhes"
              onClick={(evento) => evento.stopPropagation()}
            >
              <header className="cabecalho-detalhes">
                <p className="etiqueta">ENCICLOPÉDIA MÍTICA</p>

                <button
                  type="button"
                  className="botao-cancelar"
                  onClick={fecharDetalhes}
                  aria-label="Fechar detalhes"
                >
                  Fechar ✕
                </button>
              </header>

              <section className="conteudo-detalhes">
                <section
                  className={`area-animacao-criatura ${
                    poderAtivo
                      ? `poder-visual-ativo ${efeitoPoder}`
                      : ''
                  }`}
                >
                  {imagemPersonalizada ? (
                    <img
                      className="imagem-detalhes-criatura"
                      src={criaturaSelecionada.imagem}
                      alt={criaturaSelecionada.nome}
                    />
                  ) : (
                    <span
                      className="ilustracao-detalhes"
                      aria-hidden="true"
                    >
                      {criaturaSelecionada.imagem ||
                        obterImagemPadrao(criaturaSelecionada.especie)}
                    </span>
                  )}

                  {poderAtivo && (
                    <span
                      className="onda-energia"
                      aria-hidden="true"
                    />
                  )}
                </section>

                <p className="etiqueta">
                  {criaturaSelecionada.raridade || 'Comum'}
                </p>

                <h2 id="titulo-detalhes">
                  {criaturaSelecionada.nome}
                </h2>

                <p>
                  {criaturaSelecionada.descricao ||
                    'Uma criatura misteriosa aguarda para ser descoberta.'}
                </p>

                <section
                  className="acoes-cuidado"
                  aria-label="Cuidados com a criatura"
                >
                  <h3>Hora de cuidar</h3>

                  <p>
                    Energia atual:{' '}
                    <strong>
                      {criaturaSelecionada.energia ?? 50}/100
                    </strong>
                  </p>

                  <section className="botoes-cuidado">
                    <button
                      type="button"
                      onClick={() => cuidarCriatura('alimentar')}
                      disabled={
                        Number(criaturaSelecionada.energia ?? 50) >= 100
                      }
                    >
                      🍎 Alimentar (+20)
                    </button>

                    <button
                      type="button"
                      onClick={() => cuidarCriatura('brincar')}
                      disabled={
                        Number(criaturaSelecionada.energia ?? 50) < 10
                      }
                    >
                      🎾 Brincar (-10)
                    </button>

                    <button
                      type="button"
                      onClick={() => cuidarCriatura('descansar')}
                      disabled={
                        Number(criaturaSelecionada.energia ?? 50) >= 100
                      }
                    >
                      🌙 Descansar (+15)
                    </button>
                  </section>
                </section>

                <section className="poder-criatura">
                  <p className="etiqueta">PODER ESPECIAL</p>

                  <h3>
                    {criaturaSelecionada.poderNome ||
                      criaturaSelecionada.poder ||
                      'Poder Misterioso'}
                  </h3>

                  <p>
                    {criaturaSelecionada.poderDescricao ||
                      criaturaSelecionada.descricaoPoder ||
                      'Uma habilidade ainda desconhecida.'}
                  </p>

                  <button
                    type="button"
                    className={`botao-poder ${
                      poderAtivo
                        ? `poder-ativo ${efeitoPoder}`
                        : ''
                    }`}
                    onClick={usarPoder}
                    disabled={poderAtivo}
                  >
                    {poderAtivo
                      ? '✦ Poder ativado!'
                      : '✦ Usar poder especial'}
                  </button>

                  {poderAtivo && (
                    <p className="mensagem-poder" role="status">
                      ✨{' '}
                      {criaturaSelecionada.poderNome ||
                        criaturaSelecionada.poder ||
                        'Poder Misterioso'}{' '}
                      ativado!
                    </p>
                  )}
                </section>

                <section className="informacoes-criatura">
                  <h3>Informações da criatura</h3>

                  <dl className="lista-detalhes">
                    <dt>Espécie</dt>
                    <dd>
                      {criaturaSelecionada.especie || 'Não informada'}
                    </dd>

                    <dt>Origem</dt>
                    <dd>
                      {criaturaSelecionada.origem || 'Desconhecida'}
                    </dd>

                    <dt>Personalidade</dt>
                    <dd>
                      {criaturaSelecionada.personalidade || 'Desconhecida'}
                    </dd>

                    <dt>Raridade</dt>
                    <dd>
                      {criaturaSelecionada.raridade || 'Comum'}
                    </dd>

                    <dt>Energia</dt>
                    <dd>
                      {criaturaSelecionada.energia ?? 50}/100
                    </dd>

                    <dt>Status</dt>
                    <dd>
                      {criaturaSelecionada.status || 'Disponível'}
                    </dd>
                  </dl>
                </section>

                <section className="detalhes-caracteristicas">
                  <h3>Atributos</h3>

                  <p>
                    Os atributos mostram as características e habilidades
                    desta criatura.
                  </p>

                  <section className="lista-atributos">
                    {atributos.map((atributo) => {
                      const valorBruto =
                        criaturaSelecionada.caracteristicas?.[
                          atributo.chave
                        ] ?? 50

                      const valor = Math.max(
                        0,
                        Math.min(100, Number(valorBruto) || 0),
                      )

                      return (
                        <section
                          className="item-atributo"
                          key={atributo.chave}
                        >
                          <header className="cabecalho-atributo">
                            <span>{atributo.nome}</span>
                            <strong>{valor}/100</strong>
                          </header>

                          <progress
                            className="barra-atributo"
                            max="100"
                            value={valor}
                            aria-label={`${atributo.nome}: ${valor} de 100`}
                          >
                            {valor}%
                          </progress>
                        </section>
                      )
                    })}
                  </section>
                </section>
              </section>

              <footer className="acoes-detalhes">
                <button
                  type="button"
                  className="botao-detalhes"
                  onClick={() =>
                    alternarFavorita(criaturaSelecionada)
                  }
                  aria-pressed={Boolean(
                    criaturaSelecionada.favorita,
                  )}
                >
                  {criaturaSelecionada.favorita
                    ? '★ Remover dos favoritos'
                    : '☆ Adicionar aos favoritos'}
                </button>

                {/* Botão de adicionar ou remover da coleção. */}
                {criaturaSelecionada.status === 'Na minha coleção' ? (
                  <button
                    type="button"
                    className="botao-remover"
                    onClick={() =>
                      removerDaMinhaColecao(criaturaSelecionada)
                    }
                  >
                    Remover da minha coleção
                  </button>
                ) : (
                  <button
                    type="button"
                    className="botao-principal"
                    onClick={() =>
                      adicionarAMinhaColecao(criaturaSelecionada)
                    }
                  >
                    Adicionar à minha coleção
                  </button>
                )}

                <button
                  type="button"
                  className="botao-detalhes"
                  onClick={() => abrirEdicao(criaturaSelecionada)}
                >
                  Editar criatura
                </button>

                <button
                  type="button"
                  className="botao-remover"
                  onClick={() => removerCriatura(criaturaSelecionada)}
                >
                  Excluir criatura
                </button>

                <button
                  type="button"
                  className="botao-cancelar"
                  onClick={fecharDetalhes}
                >
                  Voltar à coleção
                </button>
              </footer>
            </article>
          </section>
        )}
      </main>

      {!criaturaSelecionada && (
        <footer className="rodape">
          <p>MYTOS — Um universo de criaturas extraordinárias.</p>
        </footer>
      )}
    </>
  )
}

export default App