export enum DiaSemana {
  Domingo = 'Domingo',
  Segunda = 'Segunda-feira',
  Terca = 'Terça-feira',
  Quarta = 'Quarta-feira',
  Quinta = 'Quinta-feira',
  Sexta = 'Sexta-feira',
  Sabado = 'Sábado'
}

export enum Transporte {
  Aviao = 'Avião',
  Onibus = 'Ônibus',
  AviaoOnibus = 'Avião/Ônibus',
  Outro = 'Outro'
}

export enum TipoGasto {
  Alimentacao = 'Alimentação',
  Transporte = 'Transporte',
  Outro = 'Outro'
}

export interface Planejamento {
  data: string | null;
  diaSemana: DiaSemana | null;
  atividade: string | null;
  local: string | null;
  transporte: Transporte | null;
  observacoes: string | null;
  tipoGasto: TipoGasto | null;
  valorRS: number | null;
  valorMXN: number | null;
  fonteEstimativa: string | null;
}