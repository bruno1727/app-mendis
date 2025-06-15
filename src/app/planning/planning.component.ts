import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { DiaSemana, Planejamento, TipoGasto, Transporte } from './models/planning.model';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.css'
})
export class PlanningComponent {

  fileBytes: Uint8Array | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        this.fileBytes = new Uint8Array(arrayBuffer);
        this._extrairDados(this.fileBytes);
      };
      reader.readAsArrayBuffer(file);
    }
  }

  private _extrairDados(fileBytes: Uint8Array): void {
    var json = this._extrairJSON(fileBytes);

    // Encontrar o índice do cabeçalho
    const headerIndex = json.findIndex((row: any[]) => row[0] === 'Data');
    if (headerIndex === -1) return;

    const dataRows = json.slice(headerIndex + 1);

    const planejamentos: Planejamento[] = dataRows.map((row: any[]) => {
      // Ajuste para lidar com linhas incompletas
      return {
        data: row[0] ?? null,
        diaSemana: this._parseDiaSemana(row[1]),
        atividade: row[3] ?? null,
        local: row[4] ?? null,
        transporte: this._parseTransporte(row[5]),
        observacoes: row[6] ?? null,
        tipoGasto: this._parseTipoGasto(row[7]),
        valorRS: typeof row[9] === 'number' ? row[9] : null,
        valorMXN: typeof row[10] === 'number' ? row[10] : null,
        fonteEstimativa: row[11] ?? null
      };
    });

    console.log(planejamentos);

  }

  private _extrairJSON(fileBytes: Uint8Array): any {
    var workbook = XLSX.read(fileBytes, { type: 'array' });
    var first_sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(first_sheet, { header: 1 });
    console.log(json);
    return json;
  }

  private _parseDiaSemana(value: string): DiaSemana | null {
    if (!value) return null;
    switch (value.trim()) {
      case 'Domingo': return DiaSemana.Domingo;
      case 'Segunda-feira': return DiaSemana.Segunda;
      case 'Terça-feira': return DiaSemana.Terca;
      case 'Quarta-feira': return DiaSemana.Quarta;
      case 'Quinta-feira': return DiaSemana.Quinta;
      case 'Sexta-feira': return DiaSemana.Sexta;
      case 'Sábado': return DiaSemana.Sabado;
      default: return null;
    }
  }

  private _parseTransporte(value: string): Transporte | null {
    if (!value) return null;
    if (value.includes('Avião') && value.includes('Ônibus')) return Transporte.AviaoOnibus;
    if (value.includes('Avião')) return Transporte.Aviao;
    if (value.includes('Ônibus')) return Transporte.Onibus;
    return Transporte.Outro;
  }

  private _parseTipoGasto(value: string): TipoGasto | null {
    if (!value) return null;
    if (value.includes('Alimentação')) return TipoGasto.Alimentacao;
    if (value.includes('Transporte')) return TipoGasto.Transporte;
    return TipoGasto.Outro;
  }
}
