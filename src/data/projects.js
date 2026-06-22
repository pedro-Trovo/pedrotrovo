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
      'Infraestrutura completa com Docker Compose (API Flask + Frontend Nginx) para deploy simplificado',
    ],
    featureLabels: {
      pt: ['Analisador Morfossintático', 'Árvore de Dependências', 'Quiz Educativo', 'Desktop App', 'Estatísticas', 'Infraestrutura Docker'],
      en: ['Morphosyntactic Analyzer', 'Dependency Tree', 'Educational Quiz', 'Desktop App', 'Statistics', 'Docker Infrastructure'],
    },
    aboutLabels: {
      pt: ['Contexto', 'Funcionalidades', 'Escopo'],
      en: ['Context', 'Features', 'Scope'],
    },
    highlights: [
      { icon: '🎓', text: 'Iniciação Científica — FATEC Ipiranga' },
      { icon: '⏱️', text: '11 meses de desenvolvimento' },
      { icon: '📄', text: 'Publicado no Zenodo com DOI' },
      { icon: '🧠', text: 'NLP com spaCy' },
    ],
    about:
      'O MORSLUM é uma plataforma acadêmica desenvolvida como projeto de Iniciação Científica na FATEC Ipiranga, com o objetivo de tornar o aprendizado de análise morfossintática da língua portuguesa mais interativo e acessível. Utilizando processamento de linguagem natural (NLP) com o modelo pt_core_news_sm do spaCy, a plataforma é capaz de classificar gramaticalmente cada palavra de uma frase e gerar visualizações de árvores de dependência sintática, facilitando a compreensão das relações entre os termos da oração.  Além do analisador, o sistema conta com um quiz educativo que gera automaticamente questões a partir de um banco de 500 frases do português brasileiro, desafiando o usuário a identificar classes gramaticais em diferentes contextos. O projeto foi desenvolvido ao longo de 11 meses, abrangendo desde a revisão teórica de gramática e NLP até a implementação, testes e empacotamento desktop.',
    architecture:
      'A aplicação segue uma arquitetura de três camadas: o frontend em React com PrimeReact consome uma API REST desenvolvida em Flask, que por sua vez utiliza o spaCy para o pipeline de processamento linguístico. Toda a infraestrutura pode ser orquestrada com Docker Compose (Backend + Frontend servido por Nginx). Para distribuição desktop, o Electron empacota o frontend compilado juntamente com um runtime portátil do Python 3.12 que contém o Flask, spaCy e todas as dependências necessárias — eliminando a necessidade de instalação manual de Python ou pacotes pelo usuário final.',
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
      { category: 'Backend', items: ['Java', 'Spring Boot', 'SOAP Web Services', 'JPA', 'Swagger'] },
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
    featureLabels: {
      pt: ['Cadastro de Entregas', 'Rastreamento', 'Atualização de Status', 'Cancelamento', 'Filtros', 'Dashboard', 'Código de Rastreio'],
      en: ['Delivery Registration', 'Tracking', 'Status Update', 'Cancellation', 'Filters', 'Dashboard', 'Tracking Code'],
    },
    aboutLabels: {
      pt: ['Contexto', 'Integração', 'Funcionalidades'],
      en: ['Context', 'Integration', 'Features'],
    },
    highlights: [
      { icon: '🔗', text: 'Integração REST ↔ SOAP' },
      { icon: '☕', text: 'Java + Spring Boot' },
      { icon: '🐘', text: 'PostgreSQL' },
    ],
    about:
      'O TransLog é um painel interno (intranet) moderno conectado a um sistema legado via SOAP. Trata-se de um projeto de integração entre REST e SOAP, onde uma API REST intermediária em Express faz a ponte entre o frontend React e o backend SOAP legado de gestão de entregas. O sistema oferece desde o cadastro de entregas até o rastreamento detalhado com timeline de status, seguindo um fluxo de transições pré-definido que garante a integridade do processo logístico.',
    architecture:
      'O TransLog segue uma arquitetura de três camadas: o frontend React consome uma API REST intermediária desenvolvida em Express, que por sua vez se comunica com o backend legado via Web Services SOAP. O backend Spring Boot expõe operações SOAP (criação, rastreamento, atualização e cancelamento de entregas) seguindo contratos XSD. O banco PostgreSQL armazena os dados. O Express atua como tradutor entre o formato REST do frontend e o protocolo SOAP do sistema legado. Toda a aplicação é dockerizada com Docker Compose.',
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
      '/images/projects/pgpweblab/descriptografarmensagem.png',
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
    featureLabels: {
      pt: ['Gerar Par de Chaves', 'Criptografar Mensagem', 'Descriptografar Mensagem', 'Criptografar Arquivo', 'Descriptografar Arquivo'],
      en: ['Generate Key Pair', 'Encrypt Message', 'Decrypt Message', 'Encrypt File', 'Decrypt File'],
    },
    aboutLabels: {
      pt: ['Contexto', 'Tecnologia', 'Diferencial'],
      en: ['Context', 'Technology', 'Differentiator'],
    },
    highlights: [
      { icon: '🔒', text: '100% client-side' },
      { icon: '🅰️', text: 'Angular + TypeScript' },
      { icon: '🔐', text: 'OpenPGP.js' },
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
  {
    slug: 'startdoor',
    title: 'Startdoor',
    subtitle:
      'Plataforma web colaborativa dedicada à avaliação e ao compartilhamento de experiências de estágio.',
    description:
      'Repositório centralizado onde estudantes e estagiários registram relatos e notas sobre organizações, com recomendações personalizadas por IA.',
    image: '/images/projects/startdoor/startdoor.svg',
    images: ['/images/projects/startdoor/startdoor.svg'],
    tags: ['React', 'TypeScript', 'Java', 'Spring Boot', 'MySQL', 'Docker', 'TailwindCSS'],
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'MobX', 'React Hook Form', 'Zod', 'Axios', 'Chart.js'] },
      { category: 'Backend', items: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'Swagger'] },
      { category: 'AI', items: ['Google Gemini'] },
      { category: 'Database', items: ['MySQL'] },
      { category: 'DevOps', items: ['Docker', 'GitHub Actions'] },
    ],
    features: [
      'Acessar avaliações detalhadas com notas de 12 competências e relatos de outros estagiários',
      'Comparar oportunidades lado a lado com gráficos e estatísticas das avaliações',
      'Compartilhar feedback registrando sua própria experiência de estágio na plataforma',
      'Recomendações personalizadas de empresas com IA (Google Gemini) baseadas no perfil do estudante',
      'Gráfico Radar que compara visualmente as expectativas do estudante com as médias reais da empresa',
      'Match Automático que calcula se a empresa atende 80% ou mais das expectativas do estudante',
      'Sistema de comentários com moderação e opção de anonimato para o estudante',
      'Recuperação de senha via email com código numérico de verificação de 6 dígitos',
      'Favoritar empresas para salvar oportunidades de interesse e consultar depois',
    ],
    featureLabels: {
      pt: ['Acessar Avaliações', 'Comparar Oportunidades', 'Compartilhar Feedback', 'Recomendações com IA', 'Gráfico Radar', 'Match Automático', 'Comentários', 'Recuperar Senha', 'Favoritos'],
      en: ['Access Reviews', 'Compare Opportunities', 'Share Feedback', 'AI Recommendations', 'Radar Chart', 'Auto Match', 'Comments', 'Password Recovery', 'Favorites'],
    },
    aboutLabels: {
      pt: ['Contexto', 'Solução', 'Infraestrutura'],
      en: ['Context', 'Solution', 'Infrastructure'],
    },
    highlights: [
      { icon: '🎓', text: 'TCC — FATEC Ipiranga (2026)' },
      { icon: '👥', text: 'Equipe de 5 estudantes' },
      { icon: '🤖', text: 'Recomendações com IA Gemini' },
      { icon: '🐳', text: 'Docker + CI/CD' },
    ],
    about:
      'A busca por estágio é uma etapa decisiva na vida acadêmica, mas os estudantes enfrentam uma grande assimetria de informação — não há transparência sobre a cultura, o aprendizado e os benefícios reais de cada empresa. O Startdoor nasceu para resolver esse problema como um TCC na FATEC Ipiranga, desenvolvido por uma equipe de 5 estudantes. A plataforma centraliza relatos de estagiários, permitindo que avaliem empresas com notas de 1 a 5 em 12 competências (Ambiente, Aprendizado, Benefícios, Cultura, Efetivação, Entrevista, Feedback, Infraestrutura, Integração, Remuneração, Rotina e Liderança) e escrevam relatos textuais detalhados. O sistema utiliza inteligência artificial (Google Gemini) para gerar recomendações personalizadas de empresas, comparando as preferências do estudante com as médias reais das organizações. O projeto conta com autenticação JWT, CRUD completo de estudantes e empresas, e infraestrutura dockerizada com CI/CD via GitHub Actions.',
    architecture:
      'O Startdoor segue uma arquitetura de três camadas: o frontend em React com TypeScript e Vite consome uma API REST desenvolvida em Spring Boot 4 com Java 21. O backend utiliza Spring Security com autenticação JWT e Hibernate/JPA para persistência em MySQL. A integração com a API Google Gemini permite gerar recomendações personalizadas de empresas para cada estudante com base em 12 competências avaliadas. O frontend utiliza MobX para gerenciamento de estado, Tailwind CSS para estilização, e React Hook Form com Zod para validação de formulários. Toda a aplicação é containerizada com Docker Compose (MySQL + Backend + Frontend) e possui CI/CD automatizado via GitHub Actions que publica as imagens no Docker Hub.',
    limitations: [],
    links: {
      github: 'https://github.com/Balbinao/Startdoor',
      site: 'https://startdoor-landing-page.vercel.app/',
    },
    context: 'TCC — FATEC Ipiranga — ADS (2026)',
  },
]
