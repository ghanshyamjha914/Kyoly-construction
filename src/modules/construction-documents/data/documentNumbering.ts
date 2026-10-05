/**
 * Automatic Construction Document Numbering System
 * Standard Prefix: KCY-[DOC_TYPE]-[YEAR]-[SEQUENCE]
 * Examples: KCY-AGR-2026-001, KCY-BOQ-2026-001, KCY-PMT-2026-001
 */

export type DocTypePrefix =
  | 'AGR' // House Construction Agreement
  | 'HCA'
  | 'LAB' // Labour Agreement
  | 'LA'
  | 'SUB' // Subcontract Agreement
  | 'SCA'
  | 'BOQ' // Bill of Quantities / Quotation
  | 'PMT' // Building Permit Application / Document
  | 'PERMIT'
  | 'PAY' // Payment Schedule
  | 'VAR' // Variation Order
  | 'VO'
  | 'CMP' // Completion Certificate
  | 'COMP'
  | 'HND' // Building Handover Record
  | 'HANDOVER';

export function generateDocNumber(
  prefix: DocTypePrefix,
  existingNumbers: string[],
  year: number = 2026
): string {
  const yearStr = year.toString();
  const pattern = new RegExp(`^KCY-${prefix}-${yearStr}-(\\d+)$`);

  let maxSeq = 0;
  for (const num of existingNumbers) {
    const match = num.match(pattern);
    if (match && match[1]) {
      const seq = parseInt(match[1], 10);
      if (seq > maxSeq) {
        maxSeq = seq;
      }
    }
  }

  const nextSeq = maxSeq + 1;
  const seqPadded = nextSeq.toString().padStart(3, '0');
  return `KCY-${prefix}-${yearStr}-${seqPadded}`;
}

export function generateProjectCode(existingCodes: string[], year: number = 2026): string {
  const yearStr = year.toString();
  const pattern = new RegExp(`^PRJ-${yearStr}-(\\d+)$`);

  let maxSeq = 0;
  for (const code of existingCodes) {
    const match = code.match(pattern);
    if (match && match[1]) {
      const seq = parseInt(match[1], 10);
      if (seq > maxSeq) {
        maxSeq = seq;
      }
    }
  }

  const nextSeq = maxSeq + 1;
  const seqPadded = nextSeq.toString().padStart(3, '0');
  return `PRJ-${yearStr}-${seqPadded}`;
}
