import { Briefcase, Building2, MapPin, Monitor, Phone, Users, Star, Target, TrendingUp, Layers, Headphones } from 'lucide-react';

export const NAVIGATION_LINKS = [
  { label: 'Início', href: '#home' },
  { 
    label: 'Soluções', 
    href: '#solutions',
    dropdown: [
      { label: 'Escritório Virtual', href: '#virtual' },
      { label: 'Salas & Espaços', href: '#rooms' },
      { label: 'Secretárias', href: '#desks' },
    ]
  },
  { label: 'Sobre', href: '#about' },
  { label: 'Contactos', href: '#contact' },
];

export const OFFERINGS = [
  {
    title: 'Networking de Alto Nível',
    description: 'Conecte-se com uma comunidade de profissionais e empreendedores focados em crescimento, gerando novas oportunidades de negócio num ambiente colaborativo.',
    icon: Users,
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    title: 'Credibilidade e Prestígio',
    description: 'Utilize um endereço comercial de referência na Centralidade do Kilamba para elevar a percepção da sua marca perante clientes e parceiros.',
    icon: Star,
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    title: 'Foco Total na Produtividade',
    description: 'Ambientes projetados para minimizar distrações, com climatização e infraestrutura completa para que se preocupe apenas com o seu trabalho.',
    icon: Target,
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    title: 'Redução de Custos Fixos',
    description: 'Elimine gastos com rendas elevadas, eletricidade, limpeza e manutenção, aproveitando uma estrutura partilhada de luxo com investimento inteligente.',
    icon: TrendingUp,
    image: 'https://picsum.photos/400/300?random=4'
  },
  {
    title: 'Flexibilidade Total',
    description: 'Escolha a solução que melhor se adapta ao momento atual da sua empresa, com liberdade para escalar ou ajustar os seus serviços conforme a sua necessidade.',
    icon: Layers,
    image: 'https://picsum.photos/400/300?random=5'
  },
  {
    title: 'Suporte Administrativo',
    description: 'Conte com uma equipa de receção e atendimento pronta para cuidar da sua correspondência e clientes com o máximo profissionalismo.',
    icon: Headphones,
    image: 'https://picsum.photos/400/300?random=6'
  }
];

export const SOLUTIONS_DETAILS = [
  {
    id: 'virtual',
    title: 'Escritório Virtual',
    price: 'A partir de 3.000 Kz/mês',
    features: ['Endereço Comercial', 'Gestão de Correspondência', 'Recepcionista partilhada', 'Atendimento Telefónico'],
    image: 'https://picsum.photos/800/600?random=10'
  },
  {
    id: 'rooms',
    title: 'Salas & Espaços',
    price: 'Consulte Planos',
    features: ['Lotação até 8 pessoas', 'Smart TV & HDMI', 'Quadro Branco', 'Coffee Break disponível'],
    image: 'https://picsum.photos/800/600?random=11'
  },
  {
    id: 'desks',
    title: 'Secretárias',
    price: 'Planos Flexíveis',
    features: ['Internet de Alta Velocidade', 'Cadeira Ergonómica', 'Acesso a Copa', 'Luz Natural'],
    image: 'https://picsum.photos/800/600?random=12'
  }
];
