import { useEffect, useState } from 'react'

function obterCaracteristicasPadrao(criatura) {
  if (criatura?.caracteristicas) {
    return criatura.caracteristicas
  }

  const caracteristicasPorEspecie = {
    Dragão: {
      coragem: 90,
      inteligencia: 80,
      criatividade: 70,
      forca: 100,
      intuicao: 60,
    },
    Fênix: {
      coragem: 85,
      inteligencia: 90,
      criatividade: 95,
      forca: 70,
      intuicao: 100,
    },
    Grifo: {
      coragem: 95,
      inteligencia: 75,
      criatividade: 65,
      forca: 90,
      intuicao: 80,
    },
    Kitsune: {
      coragem: 65,
      inteligencia: 100,
      criatividade: 95,
      forca: 50,
      intuicao: 90,
    },
    Sereia: {
      coragem: 70,
      inteligencia: 85,
      criatividade: 90,
      forca: 60,
      intuicao: 100,
    },
    Minotauro: {
      coragem: 90,
      inteligencia: 60,
      criatividade: 50,
      forca: 100,
      intuicao: 65,
    },
  }

  return (
    caracteristicasPorEspecie[criatura?.especie] ?? {
      coragem: 50,
      inteligencia: 50,
      criatividade: 50,
      forca: 50,
      intuicao: 50,
    }
  )
}

function obterImagemPadrao(especie) {
  const imagens = {
    Dragão: '🐉',
    Fênix: '🔥',
    Grifo: '🦅',
    Kitsune: '🦊',
    Sereia: '🧜‍♀️',
    Minotauro: '🐂',
    Outra: '✨',
  }

  return imagens[especie] ?? '✨'
}

const EFEITOS_PODER = [
  { valor: 'padrao', nome: 'Padrão' },
  { valor: 'fogo', nome: '🔥 Fogo' },
  { valor: 'arcano', nome: '✨ Energia mágica' },
  { valor: 'impacto', nome: '💥 Impacto' },
  { valor: 'cura', nome: '💚 Cura' },
  { valor: 'gelo', nome: '❄️ Gelo' },
  { valor: 'raio', nome: '⚡ Raio' },
  { valor: 'natureza', nome: '🌿 Natureza' },
  { valor: 'sombras', nome: '🌑 Sombras' },
]

function normalizarEfeitoPoder(efeito) {
  const efeitosAntigos = {
    energia: 'arcano',
    energiaMagica: 'arcano',
    sombra: 'sombras',
  }

  const efeitoNormalizado = efeitosAntigos[efeito] ?? efeito

  const efeitoExiste = EFEITOS_PODER.some(
    (opcao) => opcao.valor === efeitoNormalizado,
  )

  return efeitoExiste ? efeitoNormalizado : 'padrao'
}

function FormularioCriatura({
  aoCadastrar,
  aoCancelar,
  criaturaParaEditar = null,
}) {
  const modoEdicao = Boolean(criaturaParaEditar)

  const [nome, setNome] = useState('')
  const [especie, setEspecie] = useState('Dragão')
  const [outraEspecie, setOutraEspecie] = useState('')
  const [descricao, setDescricao] = useState('')
  const [origem, setOrigem] = useState('')
  const [energia, setEnergia] = useState(100)
  const [personalidade, setPersonalidade] = useState('')
  const [raridade, setRaridade] = useState('Comum')
  const [imagem, setImagem] = useState('')
  const [imagemPersonalizada, setImagemPersonalizada] = useState(false)
  const [poder, setPoder] = useState('')
  const [descricaoPoder, setDescricaoPoder] = useState('')
  const [efeitoPoder, setEfeitoPoder] = useState('padrao')

  const [caracteristicas, setCaracteristicas] = useState({
    coragem: 50,
    inteligencia: 50,
    criatividade: 50,
    forca: 50,
    intuicao: 50,
  })

  useEffect(() => {
    if (criaturaParaEditar) {
      const dados = criaturaParaEditar

      setNome(dados.nome ?? '')
      const especiesPredefinidas = ['Dragão', 'Fênix', 'Grifo', 'Kitsune', 'Sereia', 'Medusa', 'Minotauro', 'Centauro', 'Hidra', 'Outra']
      const especieSalva = dados.especie ?? 'Dragão'
      setEspecie(especiesPredefinidas.includes(especieSalva) ? especieSalva : 'Outra')
      setOutraEspecie(especiesPredefinidas.includes(especieSalva) ? '' : especieSalva)
      setDescricao(dados.descricao ?? '')
      setOrigem(dados.origem ?? '')
      setEnergia(dados.energia ?? 100)
      setPersonalidade(dados.personalidade ?? '')
      setRaridade(dados.raridade ?? 'Comum')
      setImagem(dados.imagem ?? '')

      setImagemPersonalizada(
        Boolean(dados.imagemPersonalizada) ||
          Boolean(dados.imagem?.startsWith('data:image/')),
      )

      setPoder(dados.poder ?? dados.poderNome ?? '')

      setDescricaoPoder(
        dados.descricaoPoder ?? dados.poderDescricao ?? '',
      )

      setEfeitoPoder(
        normalizarEfeitoPoder(
          dados.efeitoPoder ?? dados.poderEfeito ?? 'padrao',
        ),
      )

      setCaracteristicas(obterCaracteristicasPadrao(dados))
    } else {
      setNome('')
      setEspecie('Dragão')
      setOutraEspecie('')
      setDescricao('')
      setOrigem('')
      setEnergia(100)
      setPersonalidade('')
      setRaridade('Comum')
      setImagem('')
      setImagemPersonalizada(false)
      setPoder('')
      setDescricaoPoder('')
      setEfeitoPoder('padrao')

      setCaracteristicas({
        coragem: 50,
        inteligencia: 50,
        criatividade: 50,
        forca: 50,
        intuicao: 50,
      })
    }
  }, [criaturaParaEditar])

  function atualizarCaracteristica(evento) {
    const { name, value } = evento.target

    setCaracteristicas((estadoAtual) => ({
      ...estadoAtual,
      [name]: value,
    }))
  }

  function selecionarImagem(evento) {
    const arquivo = evento.target.files?.[0]

    if (!arquivo) {
      return
    }

    if (!arquivo.type.startsWith('image/')) {
      window.alert('Selecione um arquivo de imagem válido.')
      evento.target.value = ''
      return
    }

    const tamanhoMaximo = 2 * 1024 * 1024

    if (arquivo.size > tamanhoMaximo) {
      window.alert('A imagem deve ter no máximo 2 MB.')
      evento.target.value = ''
      return
    }

    const leitor = new FileReader()

    leitor.onload = () => {
      if (typeof leitor.result === 'string') {
        setImagem(leitor.result)
        setImagemPersonalizada(true)
      }
    }

    leitor.onerror = () => {
      window.alert('Não foi possível carregar essa imagem.')
    }

    leitor.readAsDataURL(arquivo)
  }

  function removerImagem() {
    setImagem('')
    setImagemPersonalizada(false)

    const campoImagem = document.getElementById('arquivoImagem')

    if (campoImagem) {
      campoImagem.value = ''
    }
  }

  function handleSubmit(evento) {
    evento.preventDefault()

    if (!nome.trim() || !descricao.trim()) {
      window.alert('Preencha o nome e a descrição da criatura.')
      return
    }

    if (especie === 'Outra' && !outraEspecie.trim()) {
      window.alert('Informe o nome da nova espécie.')
      return
    }

    const especieFinal = especie === 'Outra' ? outraEspecie.trim() : especie

    const dadosCriatura = {
      ...(criaturaParaEditar ?? {}),
      id: criaturaParaEditar?.id ?? crypto.randomUUID(),
      nome: nome.trim(),
      especie: especieFinal,
      descricao: descricao.trim(),
      origem: origem.trim(),
      energia: Number(energia),
      personalidade: personalidade.trim(),
      raridade,
      imagem: imagem || obterImagemPadrao(especieFinal),
      imagemPersonalizada: Boolean(imagem) && imagemPersonalizada,
      poder: poder.trim(),
      descricaoPoder: descricaoPoder.trim(),
      efeitoPoder: normalizarEfeitoPoder(efeitoPoder),
      caracteristicas: {
        coragem: Number(caracteristicas.coragem),
        inteligencia: Number(caracteristicas.inteligencia),
        criatividade: Number(caracteristicas.criatividade),
        forca: Number(caracteristicas.forca),
        intuicao: Number(caracteristicas.intuicao),
      },
      status: criaturaParaEditar?.status ?? 'Disponível',
    }

    aoCadastrar(dadosCriatura)
  }

  const imagemEhArquivo = imagem.startsWith('data:image/')

  return (
    <form className="formulario-criatura" onSubmit={handleSubmit}>
      <header>
        <h2>
          {modoEdicao ? 'Editar criatura' : 'Cadastrar nova criatura'}
        </h2>

        <p>
          {modoEdicao
            ? 'Altere as informações da sua criatura.'
            : 'Preencha as informações para adicionar uma nova criatura ao Mytos.'}
        </p>
      </header>

      <fieldset>
        <legend>Informações básicas</legend>

        <label htmlFor="nome">Nome da criatura</label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          placeholder="Ex.: Ignis"
          required
        />

        <label htmlFor="especie">Espécie</label>
        <select
          id="especie"
          name="especie"
          value={especie}
          onChange={(evento) => setEspecie(evento.target.value)}
          required
        >
          <option value="Dragão">Dragão</option>
          <option value="Fênix">Fênix</option>
          <option value="Grifo">Grifo</option>
          <option value="Kitsune">Kitsune</option>
          <option value="Sereia">Sereia</option>
          <option value="Medusa">Medusa</option>
          <option value="Minotauro">Minotauro</option>
          <option value="Centauro">Centauro</option>
          <option value="Hidra">Hidra</option>
          <option value="Outra">Outra (informar espécie)</option>
        </select>

        {especie === 'Outra' && (
          <>
            <label htmlFor="outraEspecie">Nome da espécie</label>
            <input
              id="outraEspecie"
              name="outraEspecie"
              type="text"
              value={outraEspecie}
              onChange={(evento) => setOutraEspecie(evento.target.value)}
              placeholder="Ex.: Grifo Sombrio"
              required
            />
          </>
        )}

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          placeholder="Conte um pouco sobre essa criatura..."
          rows="4"
          required
        />

        <label htmlFor="origem">Origem</label>
        <input
          id="origem"
          name="origem"
          type="text"
          value={origem}
          onChange={(evento) => setOrigem(evento.target.value)}
          placeholder="Ex.: Montanhas antigas"
        />

        <label htmlFor="energia">Energia</label>
        <input
          id="energia"
          name="energia"
          type="number"
          min="0"
          max="100"
          value={energia}
          onChange={(evento) => setEnergia(evento.target.value)}
          required
        />

        <label htmlFor="personalidade">Personalidade</label>
        <input
          id="personalidade"
          name="personalidade"
          type="text"
          value={personalidade}
          onChange={(evento) => setPersonalidade(evento.target.value)}
          placeholder="Ex.: Corajosa e protetora"
        />

        <label htmlFor="raridade">Raridade</label>
        <select
          id="raridade"
          name="raridade"
          value={raridade}
          onChange={(evento) => setRaridade(evento.target.value)}
          required
        >
          <option value="Comum">Comum</option>
          <option value="Rara">Rara</option>
          <option value="Épica">Épica</option>
          <option value="Lendária">Lendária</option>
          <option value="Mítica">Mítica</option>
        </select>

        <label htmlFor="arquivoImagem">Imagem da criatura (opcional)</label>

        <input
          id="arquivoImagem"
          name="arquivoImagem"
          type="file"
          accept="image/*"
          onChange={selecionarImagem}
        />

        <p>
          Escolha uma imagem do computador de até 2 MB. Se não escolher
          nenhuma, será utilizado o ícone padrão da espécie.
        </p>

        <section className="previa-imagem-criatura">
          <p>Pré-visualização</p>

          {imagemEhArquivo ? (
            <img
              src={imagem}
              alt={`Pré-visualização de ${nome || 'nova criatura'}`}
              className="imagem-personalizada-previa"
            />
          ) : (
            <span className="icone-criatura-previa" aria-hidden="true">
              {imagem && !imagemPersonalizada
                ? imagem
                : obterImagemPadrao(especie)}
            </span>
          )}
        </section>

        {imagem && imagemPersonalizada && (
          <button
            type="button"
            className="botao-cancelar"
            onClick={removerImagem}
          >
            Remover imagem e usar ícone padrão
          </button>
        )}
      </fieldset>

      <fieldset className="campos-poder">
        <legend>Poder especial</legend>

        <label htmlFor="poder">Nome do poder</label>
        <input
          id="poder"
          name="poder"
          type="text"
          value={poder}
          onChange={(evento) => setPoder(evento.target.value)}
          placeholder="Ex.: Chamas ancestrais"
        />

        <label htmlFor="descricaoPoder">Descrição do poder</label>
        <textarea
          id="descricaoPoder"
          name="descricaoPoder"
          value={descricaoPoder}
          onChange={(evento) => setDescricaoPoder(evento.target.value)}
          placeholder="Explique como o poder funciona..."
          rows="3"
        />

        <label htmlFor="efeitoPoder">Efeito do poder</label>
        <select
          id="efeitoPoder"
          name="efeitoPoder"
          value={efeitoPoder}
          onChange={(evento) => setEfeitoPoder(evento.target.value)}
        >
          {EFEITOS_PODER.map((efeito) => (
            <option key={efeito.valor} value={efeito.valor}>
              {efeito.nome}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="campos-caracteristicas">
        <legend>Características</legend>

        <label htmlFor="coragem">
          Coragem: {caracteristicas.coragem}
        </label>
        <input
          id="coragem"
          name="coragem"
          type="range"
          min="0"
          max="100"
          value={caracteristicas.coragem}
          onChange={atualizarCaracteristica}
        />

        <label htmlFor="inteligencia">
          Inteligência: {caracteristicas.inteligencia}
        </label>
        <input
          id="inteligencia"
          name="inteligencia"
          type="range"
          min="0"
          max="100"
          value={caracteristicas.inteligencia}
          onChange={atualizarCaracteristica}
        />

        <label htmlFor="criatividade">
          Criatividade: {caracteristicas.criatividade}
        </label>
        <input
          id="criatividade"
          name="criatividade"
          type="range"
          min="0"
          max="100"
          value={caracteristicas.criatividade}
          onChange={atualizarCaracteristica}
        />

        <label htmlFor="forca">
          Força: {caracteristicas.forca}
        </label>
        <input
          id="forca"
          name="forca"
          type="range"
          min="0"
          max="100"
          value={caracteristicas.forca}
          onChange={atualizarCaracteristica}
        />

        <label htmlFor="intuicao">
          Intuição: {caracteristicas.intuicao}
        </label>
        <input
          id="intuicao"
          name="intuicao"
          type="range"
          min="0"
          max="100"
          value={caracteristicas.intuicao}
          onChange={atualizarCaracteristica}
        />
      </fieldset>

      <footer className="acoes-formulario">
        <button type="submit" className="botao-principal">
          {modoEdicao ? 'Salvar alterações' : 'Cadastrar criatura'}
        </button>

        <button
          type="button"
          className="botao-cancelar"
          onClick={aoCancelar}
        >
          Cancelar
        </button>
      </footer>
    </form>
  )
}

export default FormularioCriatura