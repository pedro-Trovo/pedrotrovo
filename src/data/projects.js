export const projects = [
  {
    slug: 'morslum',
    title: 'MORSLUM',
    subtitle: 'MORphoSyntaxis LaboratoriUM',
    description:
      'Plataforma interativa de análise morfossintática da língua portuguesa utilizando NLP.',
    image: '/images/projects/morslum.png',
    images: [
      '/images/projects/morslum.png',
      '/images/projects/morslum-quiz.png',
      '/images/projects/morslum-quiz-acerto.png',
      '/images/projects/morslum-quiz-erro.png',
      '/images/projects/morslum-analise.png',
      '/images/projects/morslum-arvore.png',
      '/images/projects/morslum-estatisticas.png',
    ],
    tags: ['Python', 'Flask', 'React', 'spaCy', 'Docker', 'Electron'],
    techStack: [
      { category: 'Frontend', items: ['React', 'Vite', 'PrimeReact'] },
      { category: 'Backend', items: ['Python', 'Flask', 'spaCy'] },
      { category: 'DevOps', items: ['Docker', 'Docker Compose'] },
      { category: 'Desktop', items: ['Electron'] },
    ],
    features: [
      'Analisador morfossintático que classifica cada palavra da frase em sua classe gramatical (substantivo, verbo, adjetivo, advérbio, etc.)',
      'Geração de árvore de dependências sintáticas em SVG para visualizar as relações entre os termos da oração',
      'Quiz educativo com questões geradas automaticamente a partir de um banco de 500 frases do português brasileiro',
      'Aplicativo desktop com Electron que empacota o backend Python + frontend em um único instalador (NSIS)',
      'Estatísticas detalhadas da análise, incluindo contagem de classes gramaticais e métricas do texto',
      'Infraestrutura completa com Docker Compose (Redis + API Flask + Frontend Nginx) para deploy simplificado',
    ],
    about:
      'O MORSLUM é uma plataforma acadêmica desenvolvida como projeto de Iniciação Científica na FATEC Ipiranga, com o objetivo de tornar o aprendizado de análise morfossintática da língua portuguesa mais interativo e acessível. Utilizando processamento de linguagem natural (NLP) com o modelo pt_core_news_sm do spaCy, a plataforma é capaz de classificar gramaticalmente cada palavra de uma frase e gerar visualizações de árvores de dependência sintática, facilitando a compreensão das relações entre os termos da oração.  Além do analisador, o sistema conta com um quiz educativo que gera automaticamente questões a partir de um banco de 500 frases do português brasileiro, desafiando o usuário a identificar classes gramaticais em diferentes contextos. O projeto foi desenvolvido ao longo de 11 meses, abrangendo desde a revisão teórica de gramática e NLP até a implementação, testes e empacotamento desktop.',
    architecture:
      'A aplicação segue uma arquitetura de três camadas: o frontend em React com PrimeReact consome uma API REST desenvolvida em Flask, que por sua vez utiliza o spaCy para o pipeline de processamento linguístico. Um banco Redis é utilizado para cache de análises frequentes. Toda a infraestrutura pode ser orquestrada com Docker Compose (Redis + Backend + Frontend servido por Nginx). Para distribuição desktop, o Electron empacota o frontend compilado juntamente com um runtime portátil do Python 3.12 que contém o Flask, spaCy e todas as dependências necessárias — eliminando a necessidade de instalação manual de Python ou pacotes pelo usuário final.',
    limitations: [
      'O modelo pt_core_news_sm do spaCy não reconhece contrações como "da", "do" e "na" como combinações de preposição + artigo — tratando-as apenas como preposições simples',
      'O modelo pode confundir adjetivos com particípios passados em certos contextos (ex: "lindo" vs "encontrado")',
      'A acurácia é reduzida em comparação com modelos maiores (pt_core_news_lg ou transformer), porém o modelo pequeno foi escolhido intencionalmente para viabilizar o empacotamento desktop com Python embutido (~50MB vs ~500MB)',
      'A análise sintática depende da qualidade da segmentação de frases — textos mal pontuados podem gerar árvores incorretas',
    ],
    links: {
      github: 'https://github.com/pedro-Trovo/MORSLUM',
      site: 'https://morslum.vercel.app',
      doi: 'https://doi.org/10.5281/zenodo.18944100',
    },
    context: 'Projeto de Iniciação Científica — FATEC Ipiranga (2025-2026)',
  },
  {
    slug: 'translog',
    title: 'TransLog',
    subtitle: 'Sistema de Gerenciamento de Entregas',
    description:
      'Painel interno (intranet) moderno conectado a sistema legado via SOAP. O Express atua como API REST intermediária entre o frontend React e o backend SOAP legado.',
    image: '/images/projects/translog/1-inicio.png',
    images: [
      '/images/projects/translog/1-inicio.png',
      '/images/projects/translog/2-filtros por status.png',
      '/images/projects/translog/3-detalhes de um registro-aoclicaremumregistro.png',
      '/images/projects/translog/4-filtrar-por-data.png',
      '/images/projects/translog/5-formularioparacriarentrega.png',
      '/images/projects/translog/6-filtroporcodigo.png',
      '/images/projects/translog/7-atualizacaodepedidooucancelamento_forms.png',
    ],
    tags: ['Java', 'Spring Boot', 'SOAP', 'React', 'Express', 'PostgreSQL', 'REST', 'Docker'],
    techStack: [
      { category: 'Frontend', items: ['React', 'Vite', 'TailwindCSS', 'shadcn/ui', 'ECharts'] },
      { category: 'API REST', items: ['Express', 'Node.js'] },
      { category: 'Backend', items: ['Java', 'Spring Boot', 'SOAP Web Services', 'JPA'] },
      { category: 'Banco', items: ['PostgreSQL'] },
      { category: 'DevOps', items: ['Docker', 'Maven'] },
    ],
    features: [
      'Criação de entregas com dados de remetente, destinatário, endereço e peso',
      'Rastreamento por código de rastreio com timeline completa do histórico de status',
      'Atualização de status com transições válidas (Coletado → Em Trânsito → Saiu para Entrega → Entregue / Tentativa Falha)',
      'Cancelamento de entregas com registro de motivo e validação de regras de negócio',
      'Filtros por período, status e busca por código de rastreio',
      'Dashboard com gráfico de barras da distribuição de status utilizando ECharts',
      'Geração automática de código de rastreio no formato TL-YYYYMMDD-NNNN',
    ],
    about:
      'O TransLog é um painel interno (intranet) moderno conectado a um sistema legado via SOAP. Trata-se de um projeto de integração entre REST e SOAP, onde uma API REST intermediária em Express faz a ponte entre o frontend React e o backend SOAP legado de gestão de entregas. O sistema oferece desde o cadastro de entregas até o rastreamento detalhado com timeline de status, seguindo um fluxo de transições pré-definido que garante a integridade do processo logístico.',
    architecture:
      'O TransLog segue uma arquitetura de três camadas: o frontend React consome uma API REST intermediária desenvolvida em Express, que por sua vez se comunica com o backend legado via Web Services SOAP. O backend Spring Boot 3.2 expõe operações SOAP (criação, rastreamento, atualização e cancelamento de entregas) seguindo contratos XSD. O banco PostgreSQL armazena os dados. O Express atua como tradutor entre o formato REST do frontend e o protocolo SOAP do sistema legado. Toda a aplicação é dockerizada com Docker Compose.',
    limitations: [],
    links: {
      github: 'https://github.com/pedro-Trovo/translog',
    },
    context: 'Projeto Full-Stack — Desenvolvimento próprio',
  },
  {
    slug: 'pgpweblab',
    title: 'PGP Web Lab',
    subtitle: 'Criptografia OpenPGP no Navegador',
    description:
      'Gerador de chaves PGP, criptografia e descriptografia de mensagens e arquivos — 100% client-side.',
    image: '/images/projects/pgpweblab/home.png',
    images: [
      '/images/projects/pgpweblab/home.png',
      '/images/projects/pgpweblab/gerarchaves.png',
      '/images/projects/pgpweblab/criptografar-mensagem.png',
      '/images/projects/pgpweblab/decriptografarmensagem.png',
      '/images/projects/pgpweblab/criptografar-arquivo.png',
      '/images/projects/pgpweblab/descriptografar-arquivo.png',
    ],
    tags: ['Angular', 'TypeScript', 'Bootstrap', 'OpenPGP.js', 'SPA'],
    techStack: [
      { category: 'Frontend', items: ['Angular', 'TypeScript', 'Bootstrap', 'Bootstrap Icons', 'OpenPGP.js'] },
      { category: 'DevOps', items: ['Vercel'] },
    ],
    features: [
      'Geração de pares de chaves PGP (RSA 2048/4096 bits) com suporte opcional a frase secreta',
      'Criptografia de mensagens de texto utilizando a chave pública do destinatário',
      'Descriptografia de mensagens utilizando a chave privada do destinatário',
      'Criptografia de arquivos utilizando a chave pública do destinatário (saída .pgp)',
      'Descriptografia de arquivos utilizando a chave privada com suporte a frase secreta',
    ],
    about:
      'O PGP Web Lab é uma ferramenta de criptografia OpenPGP completa que opera inteiramente no navegador, sem necessidade de envio de dados a servidores externos. Desenvolvido como uma Single Page Application (SPA) em Angular, o projeto utiliza a biblioteca OpenPGP.js para realizar todas as operações criptográficas localmente — geração de chaves, criptografia e descriptografia de mensagens e arquivos. Todo o processamento é 100% client-side, garantindo que chaves privadas nunca saiam do computador do usuário. O projeto foi desenvolvido para oferecer uma interface amigável e acessível para usuários que desejam experimentar criptografia PGP sem instalar software nativo como o GnuPG.',
    architecture:
      'O PGP Web Lab é uma aplicação de página única (SPA) construída com Angular, executando todo o processamento no navegador do cliente. A interface utiliza Bootstrap 5 e Bootstrap Icons para uma experiência responsiva e moderna. A biblioteca OpenPGP.js realiza todas as operações criptográficas — desde a geração de pares de chaves RSA até a criptografia e descriptografia de mensagens e arquivos. O suporte a i18n (inglês/português) é implementado nativamente com Angular i18n. A aplicação é compilada em arquivos estáticos e implantada na Vercel, sem qualquer backend ou servidor intermediário.',
    limitations: [],
    links: {
      github: 'https://github.com/pedro-Trovo/pgpweblab',
      site: 'https://pgpweblab.vercel.app',
    },
    context: 'Projeto Full-Stack — Desenvolvimento próprio',
  },
]
